/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUser } from "@/lib/getUser";
import prisma from "@/lib/prisma";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AttendanceManager } from "@/components/faculty/AttendanceManager";
import Link from "next/link";

// Mock data - replace with actual database queries
const getFacultySubjectsWithStudents = async (id: string) => {
  return [
    {
      id: "sub1",
      name: "Data Structures",
      code: "CS201",
      semester: 3,
      course: {
        name: "BTech CSE",
        department: "Computer Science & Engineering"
      },
      students: [
        { id: "s1", name: "Aarav Sharma", rollNumber: "CS2001", attended: 28, total: 42 },
        { id: "s2", name: "Priya Patel", rollNumber: "CS2002", attended: 35, total: 42 },
        { id: "s3", name: "Rohan Kumar", rollNumber: "CS2003", attended: 32, total: 42 },
        { id: "s4", name: "Neha Gupta", rollNumber: "CS2004", attended: 40, total: 42 },
        { id: "s5", name: "Siddharth Singh", rollNumber: "CS2005", attended: 25, total: 42 },
      ]
    },
    {
      id: "sub2",
      name: "Algorithms",
      code: "CS301",
      semester: 5,
      course: {
        name: "BTech CSE",
        department: "Computer Science & Engineering"
      },
      students: [
        { id: "s6", name: "Ananya Reddy", rollNumber: "CS1901", attended: 30, total: 38 },
        { id: "s7", name: "Vikram Joshi", rollNumber: "CS1902", attended: 35, total: 38 },
        { id: "s8", name: "Meera Desai", rollNumber: "CS1903", attended: 28, total: 38 },
        { id: "s9", name: "Karan Malhotra", rollNumber: "CS1904", attended: 32, total: 38 },
      ]
    }
  ];
};

const getTodaysClasses = () => [
  {
    id: "class1",
    subject: "Data Structures",
    time: "10:00 AM - 11:00 AM",
    room: "Lab-201",
    year: "2nd Year",
    totalStudents: 45
  },
  {
    id: "class2",
    subject: "Algorithms",
    time: "02:00 PM - 03:30 PM",
    room: "Room-305",
    year: "3rd Year",
    totalStudents: 38
  }
];

export default async function AttendancePage() {
  const user = await getUser();

  if (!user || !user.faculty) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8 font-sans">
        <Card className="w-full max-w-md text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Unauthorized Access</h1>
            <p className="text-gray-600">
              You must be logged in as a faculty member to view this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const faculty = await prisma.faculty.findUnique({
    where: { id: user.faculty.id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      subjects: {
        select: {
          id: true,
          name: true,
          code: true,
          semester: true,
          course: {
            select: {
              name: true,
              department: true,
            }
          }
        },
      },
    },
  });

  if (!faculty) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8 font-sans">
        <Card className="w-full max-w-md text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-gray-600 text-lg">Faculty data not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const subjectsWithStudents = await getFacultySubjectsWithStudents(faculty.id);
  const todaysClasses = getTodaysClasses();

  // Calculate overall statistics
  const totalStudents = subjectsWithStudents.reduce((acc, subject) => acc + subject.students.length, 0);
  const averageAttendance = subjectsWithStudents.reduce((acc, subject) => {
    const subjectAttendance = subject.students.reduce((stuAcc, student) => 
      stuAcc + (student.attended / student.total), 0
    ) / subject.students.length;
    return acc + subjectAttendance;
  }, 0) / subjectsWithStudents.length * 100;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 p-6 font-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
              Attendance Management
            </h1>
            <p className="text-gray-600 text-lg">
              Mark and track student attendance across all subjects
            </p>
          </div>
          <Link href="/dashboard/faculty/attendance/reports">
            <Button variant="outline" className="border-gray-300 hover:border-blue-500 transition-all duration-200">
              📊 Generate Reports
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Stats and Today's Classes (1/4 width) */}
        <div className="space-y-6 lg:col-span-1">
          {/* 📊 Quick Stats */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800">Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{subjectsWithStudents.length}</div>
                <div className="text-sm text-gray-600">Subjects</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{totalStudents}</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(averageAttendance)}%
                </div>
                <div className="text-sm text-gray-600">Avg Attendance</div>
              </div>
            </CardContent>
          </Card>

          {/* 📅 Today's Classes */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800">Today&apos;s Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaysClasses.map((classItem) => (
                  <div key={classItem.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">{classItem.subject}</h3>
                        <p className="text-sm text-gray-600">{classItem.year}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {classItem.room}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{classItem.time}</span>
                      <span>{classItem.totalStudents} students</span>
                    </div>
                    <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-sm">
                      Mark Attendance
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 🎯 Quick Actions */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/faculty/classes" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-blue-500 transition-all duration-200">
                  📚 View Classes
                </Button>
              </Link>
              <Link href="/dashboard/faculty/attendance/bulk" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-blue-500 transition-all duration-200">
                  📋 Bulk Update
                </Button>
              </Link>
              <Link href="/dashboard/faculty/attendance/analytics" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-blue-500 transition-all duration-200">
                  📈 View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Attendance Manager (3/4 width) */}
        <div className="lg:col-span-3">
          <AttendanceManager 
            subjects={subjectsWithStudents} 
            facultyName={faculty.user?.name || 'Faculty'}
          />
        </div>
      </div>
    </div>
  );
}
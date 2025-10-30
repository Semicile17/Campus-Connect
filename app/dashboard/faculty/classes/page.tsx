import { getUser } from "@/lib/getUser";
import prisma from "@/lib/prisma";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClassesCalendar } from "@/components/faculty/ClassCalendar";
import Link from "next/link";

// Mock data for classes - replace with actual database queries
const getFacultyClasses = async (facultyId: string) => {
  // This would be your actual Prisma query
  return [
    {
      id: "1",
      date: new Date("2024-01-15"),
      subject: "Data Structures",
      course: "BTech CSE",
      year: "2nd Year",
      department: "Computer Science & Engineering",
      duration: "1 hour",
      attendance: 45,
      totalStudents: 50,
      topics: ["Linked Lists", "Trees"],
      status: "completed" as const,
    },
    {
      id: "2",
      date: new Date("2024-01-16"),
      subject: "Algorithms",
      course: "BTech CSE",
      year: "3rd Year",
      department: "Computer Science & Engineering",
      duration: "1.5 hours",
      attendance: 38,
      totalStudents: 42,
      topics: ["Sorting Algorithms", "Complexity Analysis"],
      status: "completed" as const,
    },
    {
      id: "3",
      date: new Date("2024-01-17"),
      subject: "Database Systems",
      course: "BTech CSE",
      year: "2nd Year",
      department: "Computer Science & Engineering",
      duration: "2 hours",
      attendance: 0,
      totalStudents: 48,
      topics: ["Normalization", "SQL Queries"],
      status: "scheduled" as const,
    },
    {
      id: "4",
      date: new Date("2024-01-18"),
      subject: "Computer Networks",
      course: "BTech CSE",
      year: "4th Year",
      department: "Computer Science & Engineering",
      duration: "1 hour",
      attendance: 0,
      totalStudents: 35,
      topics: ["TCP/IP Protocol", "Network Layers"],
      status: "scheduled" as const,
    },
  ];
};

const getUpcomingClasses = () => [
  {
    id: "3",
    date: "2024-01-17",
    time: "10:00 AM",
    subject: "Database Systems",
    year: "2nd Year",
    room: "Lab-201",
  },
  {
    id: "4",
    date: "2024-01-18",
    time: "02:00 PM",
    subject: "Computer Networks",
    year: "4th Year",
    room: "Room-305",
  },
  {
    id: "5",
    date: "2024-01-19",
    time: "11:30 AM",
    subject: "Operating Systems",
    year: "3rd Year",
    room: "Lab-102",
  },
];

export default async function ClassesPage() {
  const user = await getUser();

  if (!user || !user.faculty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8 font-sans">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8 font-sans">
        <Card className="w-full max-w-md text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-gray-600 text-lg">Faculty data not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const classesData = await getFacultyClasses(faculty.id);
  const upcomingClasses = getUpcomingClasses();

  // Calculate statistics
  const totalClasses = classesData.length;
  const completedClasses = classesData.filter(cls => cls.status === 'completed').length;
  const upcomingClassesCount = classesData.filter(cls => cls.status === 'scheduled').length;
  const totalAttendance = classesData
    .filter(cls => cls.status === 'completed')
    .reduce((acc, cls) => acc + (cls.attendance / cls.totalStudents) * 100, 0) / completedClasses || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 font-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
              Class Management
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your classes and track attendance
            </p>
          </div>
          <Link href="/dashboard/faculty/classes/schedule">
            <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-200">
              📅 Schedule New Class
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Stats and Upcoming Classes */}
        <div className="space-y-6">
          {/* 📊 Quick Stats */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800">Class Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{totalClasses}</div>
                  <div className="text-sm text-gray-600">Total Classes</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{completedClasses}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{upcomingClassesCount}</div>
                  <div className="text-sm text-gray-600">Upcoming</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(totalAttendance)}%
                  </div>
                  <div className="text-sm text-gray-600">Avg Attendance</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 📅 Upcoming Classes */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800">Upcoming Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((cls) => (
                  <div key={cls.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">{cls.subject}</h3>
                        <p className="text-sm text-gray-600">{cls.year}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {cls.room}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{cls.date}</span>
                      <span>{cls.time}</span>
                    </div>
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
              <Link href="/dashboard/faculty/attendance" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-blue-500 transition-all duration-200">
                  📝 Mark Attendance
                </Button>
              </Link>
              <Link href="/dashboard/faculty/materials" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-blue-500 transition-all duration-200">
                  📚 Upload Materials
                </Button>
              </Link>
              <Link href="/dashboard/faculty/assignments" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-blue-500 transition-all duration-200">
                  📋 Create Assignment
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Calendar (2/3 width on large screens) */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800">Class Calendar</CardTitle>
              <p className="text-gray-600 text-sm">
                Click on any date to view class details and manage sessions
              </p>
            </CardHeader>
            <CardContent>
              <ClassesCalendar classesData={classesData} facultySubjects={faculty.subjects} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
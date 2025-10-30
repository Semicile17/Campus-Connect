/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUser } from "@/lib/getUser";
import prisma from "@/lib/prisma";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnnouncementManager } from "@/components/faculty/AnnouncementManager";
import Link from "next/link";

// Mock data - replace with actual database queries later
const getFacultyAnnouncements = async (facultyId: string) => {
  return [
    {
      id: "ann1",
      title: "Data Structures Assignment - Linked Lists",
      content: "Complete the implementation of singly and doubly linked lists. Submit by Friday.",
      type: "assignment" as const,
      course: "BTech CSE",
      year: 2,
      semester: 3,
      department: "Computer Science & Engineering",
      createdAt: new Date("2024-01-10"),
      dueDate: new Date("2024-01-15"),
      targetStudents: 45,
      isPublished: true
    },
    {
      id: "ann2",
      title: "Class Test - Algorithms",
      content: "There will be a class test on sorting algorithms next week. Prepare chapters 4-6.",
      type: "class_test" as const,
      course: "BTech CSE",
      year: 3,
      semester: 5,
      department: "Computer Science & Engineering",
      createdAt: new Date("2024-01-08"),
      targetStudents: 38,
      isPublished: true
    },
    {
      id: "ann3",
      title: "DBMS Notes Uploaded",
      content: "I've uploaded the notes for normalization and SQL queries. Please review before next class.",
      type: "notes" as const,
      course: "BTech CSE",
      year: 2,
      semester: 3,
      department: "Computer Science & Engineering",
      createdAt: new Date("2024-01-05"),
      targetStudents: 45,
      isPublished: true
    }
  ];
};

const getFacultyCourses = async (facultyId: string) => {
  return [
    {
      id: "course1",
      name: "BTech CSE",
      code: "CSE",
      department: "Computer Science & Engineering",
      years: 4,
      totalSemesters: 8
    },
    {
      id: "course2",
      name: "BTech IT",
      code: "IT",
      department: "Information Technology",
      years: 4,
      totalSemesters: 8
    }
  ];
};

const getRecentActivity = () => [
  {
    id: "act1",
    action: "Assignment Created",
    subject: "Data Structures",
    time: "2 hours ago",
    students: 45
  },
  {
    id: "act2",
    action: "Notes Shared",
    subject: "Algorithms",
    time: "1 day ago",
    students: 38
  },
  {
    id: "act3",
    action: "Class Test Announced",
    subject: "Database Systems",
    time: "2 days ago",
    students: 42
  }
];

export default async function AnnouncementsPage() {
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

  const announcements = await getFacultyAnnouncements(faculty.id);
  const courses = await getFacultyCourses(faculty.id);
  const recentActivity = getRecentActivity();

  // Calculate statistics
  const totalAnnouncements = announcements.length;
  const publishedAnnouncements = announcements.filter(a => a.isPublished).length;
  const assignmentsCount = announcements.filter(a => a.type === 'assignment').length;
  const totalStudentsReached = announcements.reduce((acc, ann) => acc + ann.targetStudents, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 p-6 font-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
              Announcements Management
            </h1>
            <p className="text-gray-600 text-lg">
              Create and manage announcements for your students
            </p>
          </div>
          <Link href="/dashboard/faculty/announcements/create">
            <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-200">
              📢 Create Announcement
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Stats and Recent Activity (1/4 width) */}
        <div className="space-y-6 lg:col-span-1">
          {/* 📊 Quick Stats */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800">Announcements Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{totalAnnouncements}</div>
                <div className="text-sm text-gray-600">Total Announcements</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{publishedAnnouncements}</div>
                <div className="text-sm text-gray-600">Published</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{assignmentsCount}</div>
                <div className="text-sm text-gray-600">Assignments</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{totalStudentsReached}</div>
                <div className="text-sm text-gray-600">Students Reached</div>
              </div>
            </CardContent>
          </Card>

          {/* 📅 Recent Activity */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{activity.action}</h3>
                        <p className="text-xs text-gray-600">{activity.subject}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {activity.students} students
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {activity.time}
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
              <Link href="/dashboard/faculty/classes" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-blue-500 transition-all duration-200">
                  📚 View Classes
                </Button>
              </Link>
              <Link href="/dashboard/faculty/attendance" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-blue-500 transition-all duration-200">
                  📝 Mark Attendance
                </Button>
              </Link>
              <Link href="/dashboard/faculty/materials" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-blue-500 transition-all duration-200">
                  📁 Upload Materials
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Announcement Manager (3/4 width) */}
        <div className="lg:col-span-3">
          <AnnouncementManager 
            announcements={announcements}
            courses={courses}
            facultyName={faculty.user?.name || 'Faculty'}
            facultyDepartment={faculty.department}
          />
        </div>
      </div>
    </div>
  );
}
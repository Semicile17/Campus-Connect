import Image from "next/image";
import Link from "next/link";
import { getUser } from "@/lib/getUser";
import prisma from "@/lib/prisma";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FacultyCharts } from "@/components/faculty/FacultyCharts";

// Mock data functions (keep these in server component)
const getClassAttendanceData = (subjectId: string) => {
  const mockData = {
    "sub1": { taken: 28, total: 42, pending: 14 },
    "sub2": { taken: 35, total: 42, pending: 7 },
    "sub3": { taken: 18, total: 42, pending: 24 },
  };
  return mockData[subjectId as keyof typeof mockData] || { taken: 0, total: 42, pending: 42 };
};

const getMonthlyClassData = () => [
  { month: 'Jan', classes: 12 },
  { month: 'Feb', classes: 18 },
  { month: 'Mar', classes: 15 },
  { month: 'Apr', classes: 8 },
];

export default async function FacultyDashboard() {
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

  // Prepare data for charts (server-side)
  const subjectChartData = faculty.subjects.map(subject => {
    const attendance = getClassAttendanceData(subject.id);
    return {
      subjectId: subject.id,
      subjectName: subject.name,
      ...attendance,
    };
  });

  const monthlyData = getMonthlyClassData();
  
  const totalClassesTaken = subjectChartData.reduce((acc, curr) => acc + curr.taken, 0);
  const overallProgress = faculty.subjects.length > 0 
    ? Math.round(subjectChartData.reduce((acc, curr) => acc + (curr.taken / curr.total), 0) / faculty.subjects.length * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
          Faculty Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome back, {faculty.user?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* 🧑‍🏫 Profile Section */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800">Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <Image
                src={"/avatar.png"}
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">{faculty.user?.name}</h2>
              <p className="text-gray-500 text-sm">{faculty.user?.email}</p>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                {faculty.designation}
              </div>
              <p className="text-gray-600 font-medium">{faculty.department}</p>
            </div>
          </CardContent>
        </Card>

        {/* Charts - Client Component */}
        <FacultyCharts subjectChartData={subjectChartData} monthlyData={monthlyData} />

        {/* 📅 Quick Actions */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/dashboard/faculty/classes" className="block">
              <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 transition-all duration-200">
                📚 Manage Classes
              </Button>
            </Link>
            <Link href="/dashboard/faculty/students" className="block">
              <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-blue-500 transition-all duration-200">
                👥 View Students
              </Button>
            </Link>
            <Link href="/dashboard/faculty/attendance" className="block">
              <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-blue-500 transition-all duration-200">
                📝 Mark Attendance
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* 📊 Overall Statistics */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800">Teaching Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{faculty.subjects.length}</div>
                <div className="text-sm text-gray-600">Subjects</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{totalClassesTaken}</div>
                <div className="text-sm text-gray-600">Classes Taken</div>
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{overallProgress}%</div>
              <div className="text-sm text-gray-600">Overall Progress</div>
            </div>
          </CardContent>
        </Card>

        {/* 📚 Subjects List */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800">My Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {faculty.subjects.length > 0 ? (
                faculty.subjects.map((subject) => (
                  <div key={subject.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="font-medium text-gray-800">{subject.name}</div>
                    <div className="text-sm text-gray-600">
                      {subject.code} • Sem {subject.semester}
                    </div>
                    {subject.course && (
                      <div className="text-xs text-gray-500 mt-1">
                        {subject.course.name} - {subject.course.department}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No subjects assigned yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
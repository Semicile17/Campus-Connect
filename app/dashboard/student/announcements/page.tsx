/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUser } from "@/lib/getUser";
import prisma from "@/lib/prisma";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StudentAnnouncements } from "@/components/student/StudentAnnouncement";
import Link from "next/link";

// Mock data - replace with actual database queries later
const getStudentAnnouncements = async (studentId: string) => {

    type PriorityLevel = 'high' | 'medium' | 'low';

  return [
    {
      id: "ann1",
      title: "Data Structures Assignment - Linked Lists",
      content: "Complete the implementation of singly and doubly linked lists. Submit your code on the portal by Friday, 5:00 PM. Make sure to include proper documentation and test cases.",
      type: "assignment" as const,
      course: "BTech CSE",
      subject: "Data Structures",
      year: 2,
      semester: 3,
      facultyName: "Dr. Priya Sharma",
      department: "Computer Science & Engineering",
      createdAt: new Date("2024-01-10"),
      dueDate: new Date("2024-01-15"),
      attachments: ["assignment_1.pdf", "guidelines.docx"],
      isRead: true,
      priority: "high" as PriorityLevel
    },
    {
      id: "ann2",
      title: "Class Test - Sorting Algorithms",
      content: "There will be a class test on sorting algorithms (Bubble Sort, Quick Sort, Merge Sort) next Monday during lab hours. Syllabus: Chapters 4-6 from the textbook.",
      type: "class_test" as const,
      course: "BTech CSE",
      subject: "Algorithms",
      year: 2,
      semester: 3,
      facultyName: "Dr. Rajesh Kumar",
      department: "Computer Science & Engineering",
      createdAt: new Date("2024-01-12"),
      dueDate: new Date("2024-01-17"),
      attachments: ["syllabus.pdf"],
      isRead: false,
      priority: "medium" as PriorityLevel
    },
    {
      id: "ann3",
      title: "DBMS Notes - Normalization",
      content: "I've uploaded comprehensive notes on database normalization (1NF, 2NF, 3NF, BCNF) with examples. Please review these before our next class as we'll be having a discussion on this topic.",
      type: "notes" as const,
      course: "BTech CSE",
      subject: "Database Management Systems",
      year: 2,
      semester: 3,
      facultyName: "Dr. Anjali Singh",
      department: "Computer Science & Engineering",
      createdAt: new Date("2024-01-11"),
      attachments: ["normalization_notes.pdf", "examples.zip"],
      isRead: true,
      priority: "low" as PriorityLevel
    },
    {
      id: "ann4",
      title: "URGENT: Lab Schedule Change",
      content: "Due to maintenance work, the Data Structures lab scheduled for tomorrow has been moved to Lab 205. Please make a note of this change and inform your classmates.",
      type: "urgent" as const,
      course: "BTech CSE",
      subject: "Data Structures",
      year: 2,
      semester: 3,
      facultyName: "Dr. Priya Sharma",
      department: "Computer Science & Engineering",
      createdAt: new Date("2024-01-13"),
      attachments: [],
      isRead: false,
      priority: "medium" as PriorityLevel
    },
    {
      id: "ann5",
      title: "Project Submission Guidelines",
      content: "Final year project submissions must follow the format specified in the attached guideline document. All projects must be submitted by January 30th, 2024.",
      type: "general" as const,
      course: "BTech CSE",
      subject: "Project Work",
      year: 4,
      semester: 7,
      facultyName: "Dr. S. Patel",
      department: "Computer Science & Engineering",
      createdAt: new Date("2024-01-09"),
      dueDate: new Date("2024-01-30"),
      attachments: ["project_guidelines.pdf", "submission_format.docx"],
      isRead: true,
      priority: "high" as PriorityLevel
    }
  ];
};

const getUpcomingDeadlines = () => [
  {
    id: "deadline1",
    title: "Data Structures Assignment",
    dueDate: new Date("2024-01-15"),
    subject: "Data Structures",
    type: "assignment"
  },
  {
    id: "deadline2",
    title: "Algorithms Class Test",
    dueDate: new Date("2024-01-17"),
    subject: "Algorithms",
    type: "class_test"
  },
  {
    id: "deadline3",
    title: "DBMS Project Proposal",
    dueDate: new Date("2024-01-20"),
    subject: "Database Systems",
    type: "assignment"
  }
];

const getAnnouncementStats = (announcements: any[]) => {
  const total = announcements.length;
  const unread = announcements.filter(a => !a.isRead).length;
  const assignments = announcements.filter(a => a.type === 'assignment').length;
  const urgent = announcements.filter(a => a.priority === 'high').length;
  
  return { total, unread, assignments, urgent };
};

export default async function StudentAnnouncementsPage() {
  const user = await getUser();

  if (!user || !user.student) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8 font-sans">
        <Card className="w-full max-w-md text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Unauthorized Access</h1>
            <p className="text-gray-600">
              You must be logged in as a student to view this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const student = await prisma.student.findUnique({
    where: { id: user.student.id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!student) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8 font-sans">
        <Card className="w-full max-w-md text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-gray-600 text-lg">Student data not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const announcements = await getStudentAnnouncements(student.id);
  const upcomingDeadlines = getUpcomingDeadlines();
  const stats = getAnnouncementStats(announcements);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 p-6 font-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
              Announcements
            </h1>
            <p className="text-gray-600 text-lg">
              Stay updated with important notices from your faculty
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-gray-300 hover:border-blue-500 transition-all duration-200">
              📋 Mark All as Read
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-200">
              🔔 Notification Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Stats and Upcoming Deadlines (1/4 width) */}
        <div className="space-y-6 lg:col-span-1">
          {/* 📊 Quick Stats */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800">Announcements Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{stats.unread}</div>
                <div className="text-sm text-gray-600">Unread</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.assignments}</div>
                <div className="text-sm text-gray-600">Assignments</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{stats.urgent}</div>
                <div className="text-sm text-gray-600">Urgent</div>
              </div>
            </CardContent>
          </Card>

          {/* 📅 Upcoming Deadlines */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800">Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{deadline.title}</h3>
                        <p className="text-xs text-gray-600">{deadline.subject}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        deadline.type === 'assignment' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {deadline.type === 'assignment' ? 'Assignment' : 'Test'}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Due: {deadline.dueDate.toLocaleDateString()}</span>
                      <span className="font-medium">
                        {Math.ceil((deadline.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                      </span>
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
              <Link href="/dashboard/student/assignments" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-blue-500 transition-all duration-200">
                  📝 My Assignments
                </Button>
              </Link>
              <Link href="/dashboard/student/timetable" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-blue-500 transition-all duration-200">
                  📅 Class Timetable
                </Button>
              </Link>
              <Link href="/dashboard/student/materials" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-blue-500 transition-all duration-200">
                  📚 Study Materials
                </Button>
              </Link>
              <Link href="/dashboard/student/grades" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-300 hover:border-blue-500 transition-all duration-200">
                  📊 View Grades
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Announcements List (3/4 width) */}
        <div className="lg:col-span-3">
          <StudentAnnouncements 
            announcements={announcements}
            studentName={student.user?.name || 'Student'}
            studentCourse={'BTech CSE'}
            studentYear={student.year || 2}
          />
        </div>
      </div>
    </div>
  )
}
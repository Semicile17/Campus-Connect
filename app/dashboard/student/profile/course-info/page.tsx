"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Calendar, GraduationCap, FileText, BarChart3, Download } from "lucide-react";

export default function CourseInfoPage() {
  const router = useRouter();

  const timetable = {
    Monday: [
      { subject: "Data Structures & Algorithms", time: "9:00 - 10:00", type: "Theory", room: "LT-101", faculty: "Dr. Meera Sharma" },
      { subject: "Database Management Systems", time: "10:00 - 11:00", type: "Theory", room: "LT-102", faculty: "Prof. Arjun Rao" },
      { subject: "Operating Systems", time: "11:15 - 12:15", type: "Theory", room: "LT-103", faculty: "Dr. Priya Nair" },
      { subject: "Free Period", time: "12:15 - 1:15", type: "Break", room: "-", faculty: "-" },
      { subject: "AI Lab", time: "2:00 - 4:00", type: "Practical", room: "Lab-201", faculty: "Dr. Neeraj Bansal" }
    ],
    Tuesday: [
      { subject: "Mathematics IV", time: "9:00 - 10:00", type: "Theory", room: "LT-104", faculty: "Dr. Nitin Verma" },
      { subject: "DBMS Lab", time: "10:00 - 12:00", type: "Practical", room: "Lab-202", faculty: "Prof. Arjun Rao" },
      { subject: "DBMS Lab", time: "12:00 - 1:00", type: "Practical", room: "Lab-202", faculty: "Prof. Arjun Rao" },
      { subject: "Lunch Break", time: "1:00 - 2:00", type: "Break", room: "-", faculty: "-" },
      { subject: "OOPs in Java", time: "2:00 - 3:00", type: "Theory", room: "LT-105", faculty: "Prof. Kiran Das" }
    ],
    Wednesday: [
      { subject: "OOPs in Java", time: "9:00 - 10:00", type: "Theory", room: "LT-105", faculty: "Prof. Kiran Das" },
      { subject: "Mathematics IV", time: "10:00 - 11:00", type: "Theory", room: "LT-104", faculty: "Dr. Nitin Verma" },
      { subject: "Artificial Intelligence", time: "11:15 - 12:15", type: "Theory", room: "LT-106", faculty: "Dr. Neeraj Bansal" },
      { subject: "Free Period", time: "12:15 - 1:15", type: "Break", room: "-", faculty: "-" },
      { subject: "Database Management Systems", time: "2:00 - 3:00", type: "Theory", room: "LT-102", faculty: "Prof. Arjun Rao" }
    ],
    Thursday: [
      { subject: "Operating Systems", time: "9:00 - 10:00", type: "Theory", room: "LT-103", faculty: "Dr. Priya Nair" },
      { subject: "Database Management Systems", time: "10:00 - 11:00", type: "Theory", room: "LT-102", faculty: "Prof. Arjun Rao" },
      { subject: "Artificial Intelligence", time: "11:15 - 12:15", type: "Theory", room: "LT-106", faculty: "Dr. Neeraj Bansal" },
      { subject: "OOPs in Java", time: "12:15 - 1:15", type: "Theory", room: "LT-105", faculty: "Prof. Kiran Das" },
      { subject: "Library Session", time: "2:00 - 3:00", type: "Tutorial", room: "Library", faculty: "Library Staff" }
    ],
    Friday: [
      { subject: "OOPs Lab", time: "9:00 - 11:00", type: "Practical", room: "Lab-203", faculty: "Prof. Kiran Das" },
      { subject: "OOPs Lab", time: "11:00 - 1:00", type: "Practical", room: "Lab-203", faculty: "Prof. Kiran Das" },
      { subject: "Artificial Intelligence", time: "2:00 - 3:00", type: "Theory", room: "LT-106", faculty: "Dr. Neeraj Bansal" },
      { subject: "Lunch Break", time: "1:00 - 2:00", type: "Break", room: "-", faculty: "-" },
      { subject: "Mathematics IV", time: "3:00 - 4:00", type: "Theory", room: "LT-104", faculty: "Dr. Nitin Verma" }
    ],
    Saturday: [
      { subject: "Technical Seminar", time: "9:00 - 10:00", type: "Seminar", room: "Auditorium", faculty: "Various" },
      { subject: "Self Study", time: "10:00 - 11:00", type: "Study", room: "Library", faculty: "-" },
      { subject: "Project Work", time: "11:00 - 12:00", type: "Project", room: "Lab-201", faculty: "Guide" },
      { subject: "Free Period", time: "12:00 - 1:00", type: "Break", room: "-", faculty: "-" },
      { subject: "Free Period", time: "2:00 - 3:00", type: "Break", room: "-", faculty: "-" }
    ]
  };

  const subjects = [
    { 
      name: "Data Structures & Algorithms", 
      code: "CS301", 
      faculty: "Dr. Meera Sharma", 
      credits: 4, 
      type: "Core",
      description: "Advanced data structures, algorithms analysis, and complexity theory",
      syllabus: "Trees, Graphs, Sorting, Searching, Dynamic Programming"
    },
    { 
      name: "Database Management Systems", 
      code: "CS302", 
      faculty: "Prof. Arjun Rao", 
      credits: 4, 
      type: "Core",
      description: "Database design, SQL, normalization, and transaction management",
      syllabus: "ER Model, SQL, Normalization, Transactions, NoSQL"
    },
    { 
      name: "Operating Systems", 
      code: "CS303", 
      faculty: "Dr. Priya Nair", 
      credits: 4, 
      type: "Core",
      description: "OS concepts, process management, memory management, and file systems",
      syllabus: "Processes, Threads, Memory Management, File Systems, Security"
    },
    { 
      name: "Artificial Intelligence", 
      code: "CS304", 
      faculty: "Dr. Neeraj Bansal", 
      credits: 3, 
      type: "Elective",
      description: "AI fundamentals, machine learning, and intelligent systems",
      syllabus: "Search Algorithms, Machine Learning, Neural Networks, NLP"
    },
    { 
      name: "OOPs in Java", 
      code: "CS305", 
      faculty: "Prof. Kiran Das", 
      credits: 4, 
      type: "Core",
      description: "Object-oriented programming concepts using Java",
      syllabus: "Classes, Inheritance, Polymorphism, Exception Handling, JDBC"
    },
    { 
      name: "Mathematics IV", 
      code: "MA306", 
      faculty: "Dr. Nitin Verma", 
      credits: 3, 
      type: "Theory",
      description: "Advanced mathematics for computer science applications",
      syllabus: "Probability, Statistics, Linear Algebra, Numerical Methods"
    }
  ];

  const examSchedule = [
    { subject: "Database Management Systems", date: "15 Nov 2025", time: "10:00 AM - 1:00 PM", type: "Theory", venue: "Exam Hall A" },
    { subject: "Operating Systems", date: "17 Nov 2025", time: "2:00 PM - 5:00 PM", type: "Theory", venue: "Exam Hall B" },
    { subject: "Artificial Intelligence", date: "19 Nov 2025", time: "10:00 AM - 1:00 PM", type: "Theory", venue: "Exam Hall A" },
    { subject: "Data Structures & Algorithms", date: "22 Nov 2025", time: "10:00 AM - 1:00 PM", type: "Theory", venue: "Exam Hall C" },
    { subject: "OOPs in Java", date: "24 Nov 2025", time: "2:00 PM - 5:00 PM", type: "Theory", venue: "Exam Hall B" },
    { subject: "Mathematics IV", date: "26 Nov 2025", time: "10:00 AM - 1:00 PM", type: "Theory", venue: "Exam Hall A" }
  ];

  const courseStats = {
    totalCredits: 22,
    coreSubjects: 4,
    electiveSubjects: 1,
    theorySubjects: 1,
    practicalSubjects: 3,
    totalSubjects: 6
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Theory": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Practical": return "bg-green-100 text-green-800 border-green-200";
      case "Break": return "bg-gray-100 text-gray-600 border-gray-200";
      case "Seminar": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Tutorial": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Project": return "bg-red-100 text-red-800 border-red-200";
      case "Study": return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/student/profile")}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              ← Back to Profile
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Course Information</h1>
              <p className="text-gray-600 mt-1">Semester 5 - Computer Science & Engineering</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Download className="w-4 h-4 mr-2" />
              Download Timetable
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Add to Calendar
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{courseStats.totalCredits}</div>
              <div className="text-sm font-medium text-gray-600">Total Credits</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{courseStats.totalSubjects}</div>
              <div className="text-sm font-medium text-gray-600">Subjects</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{courseStats.coreSubjects}</div>
              <div className="text-sm font-medium text-gray-600">Core Subjects</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">{courseStats.electiveSubjects}</div>
              <div className="text-sm font-medium text-gray-600">Electives</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">{courseStats.practicalSubjects}</div>
              <div className="text-sm font-medium text-gray-600">Labs</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-1">A</div>
              <div className="text-sm font-medium text-gray-600">Current GPA</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Detailed Timetable */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-blue-700 text-xl font-bold">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  Weekly Timetable - Semester 5
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b-2 border-gray-200">
                        <th className="p-3 text-left font-semibold text-gray-700 min-w-24">Day</th>
                        <th className="p-3 text-left font-semibold text-gray-700 min-w-48">Subject</th>
                        <th className="p-3 text-left font-semibold text-gray-700 min-w-20">Time</th>
                        <th className="p-3 text-left font-semibold text-gray-700 min-w-20">Room</th>
                        <th className="p-3 text-left font-semibold text-gray-700 min-w-24">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(timetable).map(([day, periods]) => (
                        <React.Fragment key={day}>
                          {periods.map((period, i) => (
                            <tr key={`${day}-${i}`} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              {i === 0 && (
                                <td 
                                  rowSpan={periods.length} 
                                  className="p-3 font-semibold bg-gray-50 text-gray-900 align-top border-r"
                                >
                                  {day}
                                </td>
                              )}
                              <td className="p-3">
                                <div className="font-medium text-gray-900">{period.subject}</div>
                                {period.faculty !== "-" && (
                                  <div className="text-xs text-gray-500 mt-1">{period.faculty}</div>
                                )}
                              </td>
                              <td className="p-3 text-gray-700">{period.time}</td>
                              <td className="p-3 text-gray-700">{period.room}</td>
                              <td className="p-3">
                                <Badge variant="outline" className={getTypeColor(period.type)}>
                                  {period.type}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Subjects & Detailed Information */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-green-700 text-xl font-bold">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                  Subjects & Course Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-green-300 hover:bg-green-50/30 transition-all duration-200">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{subject.name}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-600">Code: {subject.code}</span>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              {subject.credits} Credits
                            </Badge>
                            <Badge variant="outline" className={
                              subject.type === "Core" 
                                ? "bg-red-100 text-red-800 border-red-200"
                                : subject.type === "Elective"
                                ? "bg-purple-100 text-purple-800 border-purple-200"
                                : "bg-gray-100 text-gray-800 border-gray-200"
                            }>
                              {subject.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-700 mb-2">{subject.description}</p>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span className="font-medium">Faculty:</span>
                            <span>{subject.faculty}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-start gap-2">
                            <FileText className="w-4 h-4 mt-0.5 text-gray-500" />
                            <div>
                              <span className="font-medium text-gray-700">Syllabus:</span>
                              <p className="text-gray-600 text-sm mt-1">{subject.syllabus}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Exam Schedule */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-red-700 text-xl font-bold">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Clock className="h-5 w-5 text-red-600" />
                  </div>
                  Examination Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {examSchedule.map((exam, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-red-200 hover:bg-red-50/30 transition-all duration-200">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900">{exam.subject}</h4>
                        <Badge variant="outline" className="bg-gray-100 text-gray-800">
                          {exam.type}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{exam.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium">{exam.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Venue:</span>
                          <span className="font-medium">{exam.venue}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Overview */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-purple-700 text-xl font-bold">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                  </div>
                  Course Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    The <strong>5th Semester</strong> of B.Tech in <strong>Computer Science & Engineering</strong> 
                    focuses on advanced core concepts and practical implementations. This semester builds upon 
                    fundamental programming knowledge and introduces specialized topics in database systems, 
                    operating systems, and artificial intelligence.
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Key Focus Areas:</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• Advanced Data Structures and Algorithm Analysis</li>
                      <li>• Database Design and Management Systems</li>
                      <li>• Operating System Concepts and Implementation</li>
                      <li>• Artificial Intelligence and Machine Learning Basics</li>
                      <li>• Object-Oriented Programming with Java</li>
                      <li>• Applied Mathematics for Computer Science</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Assessment Pattern:</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• Internal Assessments: 30%</li>
                      <li>• Practical/Lab Work: 20%</li>
                      <li>• End Semester Exams: 50%</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Dates */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-orange-700 text-xl font-bold">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-orange-600" />
                  </div>
                  Academic Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-blue-800">Mid-Term Exams</span>
                    <span className="text-sm text-blue-600">Oct 15-30, 2025</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-green-800">Project Submission</span>
                    <span className="text-sm text-green-600">Nov 10, 2025</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium text-red-800">End Semester Exams</span>
                    <span className="text-sm text-red-600">Nov 15-30, 2025</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-purple-800">Winter Break</span>
                    <span className="text-sm text-purple-600">Dec 15 - Jan 5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  User,
  Calendar,
  BookOpen,
  GraduationCap,
  Bell,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Award,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";

export default function ProfileClient({ user }: { user: any }) {
  const router = useRouter();

  const cgpaData = [
    { semester: "Sem 1", cgpa: 7.8, grade: "B+" },
    { semester: "Sem 2", cgpa: 8.1, grade: "A-" },
    { semester: "Sem 3", cgpa: 8.4, grade: "A" },
    { semester: "Sem 4", cgpa: 8.6, grade: "A" },
    { semester: "Sem 5", cgpa: 8.7, grade: "A" },
    { semester: "Sem 6", cgpa: 8.9, grade: "A+" },
  ];

  const announcements = [
    { 
      title: "Mid-Term Examination Schedule Released", 
      date: "Oct 15, 2025",
      type: "academic",
      priority: "high"
    },
    { 
      title: "Diwali Holiday - Campus Closed", 
      date: "Nov 1, 2025",
      type: "holiday",
      priority: "medium"
    },
    { 
      title: "Project Submission Deadline Extended", 
      date: "Oct 28, 2025",
      type: "academic",
      priority: "high"
    },
    { 
      title: "Sports Week Registration Open", 
      date: "Nov 5, 2025",
      type: "event",
      priority: "low"
    },
  ];

  const quickStats = [
    { label: "Attendance", value: "92%", trend: "+2%", color: "text-green-600" },
    { label: "Courses", value: "6", trend: "Current", color: "text-blue-600" },
    { label: "Assignments", value: "4", trend: "Pending", color: "text-orange-600" },
    { label: "Credits", value: "148", trend: "Earned", color: "text-purple-600" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-orange-100 text-orange-800 border-orange-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "academic": return <BookOpen className="h-4 w-4" />;
      case "holiday": return <Calendar className="h-4 w-4" />;
      case "event": return <Award className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage
                src={user.student?.profileImage || "/default-avatar.png"}
                className="object-cover"
              />
              <AvatarFallback className="bg-linear-to-br from-blue-600 to-purple-600 text-white text-2xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <p className="text-gray-600 text-lg mb-1">{user.email}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                  {user.student?.course || "Computer Science"}
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  Semester {user.student?.semester || "6"}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 font-medium"
            >
              Edit Profile
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg">
              Download ID Card
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {stat.trend}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* 🧍 Basic Information */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-blue-700 text-xl font-bold">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">{user.student?.phone || "+91 9876543210"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Joined Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(user.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium text-gray-900">{user.student?.address || "Pauri Garhwal, Uttarakhand"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => router.push("/dashboard/student/profile/basic-info")}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 font-medium"
                  >
                    View Complete Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 📊 SGPA Progress Chart */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-purple-700 text-xl font-bold">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  Academic Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cgpaData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="semester" 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis 
                        domain={[7, 9.5]} 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="cgpa" 
                        stroke="transparent" 
                        fill="url(#colorCgpa)" 
                        fillOpacity={0.3}
                      />
                      <Line
                        type="monotone"
                        dataKey="cgpa"
                        stroke="#7e22ce"
                        strokeWidth={3}
                        dot={{ r: 6, fill: "#7e22ce", strokeWidth: 2, stroke: "#fff" }}
                        activeDot={{ r: 8, fill: "#7e22ce", stroke: "#fff", strokeWidth: 2 }}
                      />
                      <defs>
                        <linearGradient id="colorCgpa" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7e22ce" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#7e22ce" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Current CGPA: 8.9</span>
                  </div>
                  <Button variant="outline" size="sm" className="border-purple-600 text-purple-600 hover:bg-purple-50 font-medium">
                    Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* 🎓 Course Information */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-green-700 text-xl font-bold">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-green-600" />
                  </div>
                  Academic Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Enrollment No</span>
                    <span className="font-semibold text-gray-900">{user.student?.enrollmentNo || "GBPIET2023001"}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Batch</span>
                    <span className="font-semibold text-gray-900">2023-2027</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Department</span>
                    <span className="font-semibold text-gray-900">Computer Science & Engineering</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Advisor</span>
                    <span className="font-semibold text-gray-900">Dr. Rajesh Kumar</span>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => router.push("/dashboard/student/profile/course-info")}
                    className="border-green-600 text-green-600 hover:bg-green-50 font-medium"
                  >
                    Course Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 📢 Announcements */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-orange-700 text-xl font-bold">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Bell className="h-5 w-5 text-orange-600" />
                  </div>
                  Recent Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {announcements.map((announcement, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-xl hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-200 group cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                        {getTypeIcon(announcement.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={`text-xs border ${getPriorityColor(announcement.priority)}`}>
                            {announcement.priority}
                          </Badge>
                          <span className="text-xs text-gray-500 font-medium">{announcement.date}</span>
                        </div>
                        <p className="font-medium text-gray-900 line-clamp-2 group-hover:text-orange-700 transition-colors">
                          {announcement.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end pt-2">
                  <Button variant="outline" size="sm" className="border-orange-600 text-orange-600 hover:bg-orange-50 font-medium">
                    View All Announcements
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
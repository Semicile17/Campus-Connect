/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, Users, GraduationCap, User, Shield, 
  BookOpen, BarChart3, TrendingUp, Calendar,
  Mail, Phone, MapPin, Clock
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

export default function AdminDashboard() {

  interface StudentYearData {
  year: string;
  students: number;
  color: string;
}

type AdminProfile = {
  role:string;
  name:string;
  email: string;
  phone: string;
  department: string;
  joinDate: string | Date;
  lastLogin: string 
};

  interface FacultyDeptData {
  department: string;
  faculty: number;
 
}

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalFaculty: 0,
    totalAdmins: 0,
  });
  const [adminProfile, setAdminProfile] = useState<AdminProfile>({
    name:"",
    role:"",
    email: "",
    phone: "",
    department: "",
    joinDate: new Date(),
    lastLogin: ""
  });
  const [studentYearData, setStudentYearData] = useState<StudentYearData[]>([]);
  const [facultyDeptData, setFacultyDeptData] = useState<FacultyDeptData[]>([
          { department: "CSE", faculty: 25 },
          { department: "ECE", faculty: 18 },
          { department: "ME", faculty: 15 },
          { department: "CE", faculty: 12 },
          { department: "Others", faculty: 10 }
        ]);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch user stats
        const res = await fetch("/api/admin/get-users");
        if (!res.ok) throw new Error("Failed to fetch user stats");
        const users = await res.json();

        const totalUsers = users.length;
        const totalStudents = users.filter((u: any) => u.role === "student").length;
        const totalFaculty = users.filter((u: any) => u.role === "faculty").length;
        const totalAdmins = users.filter((u: any) => u.role === "admin").length;

        setStats({ totalUsers, totalStudents, totalFaculty, totalAdmins });

        // Mock admin profile data
        setAdminProfile({
          name: "Dr. Rajesh Kumar",
          email: "rajesh.kumar@gbpiet.ac.in",
          role: "Administrator",
          department: "Computer Science & Engineering",
          phone: "+91 9876543210",
          joinDate: "2022-08-15",
          lastLogin: "2024-01-15 14:30"
        });

        // Mock student year distribution
        setStudentYearData([
          { year: "1st Year", students: 150, color: "#3b82f6" },
          { year: "2nd Year", students: 140, color: "#10b981" },
          { year: "3rd Year", students: 130, color: "#f59e0b" },
          { year: "4th Year", students: 120, color: "#ef4444" }
        ]);



      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage campus operations and user accounts</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Calendar className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading dashboard data...</span>
          </div>
        ) : (
          <>
            {/* Top Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 mt-1">
                        +12 this month
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <GraduationCap className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Students</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 mt-1">
                        Active
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <User className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Faculty</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalFaculty}</p>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 mt-1">
                        5 Departments
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl">
                      <Shield className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Admins</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalAdmins}</p>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700 mt-1">
                        System
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Left Column - Admin Profile & Management */}
              <div className="space-y-6">
                
                {/* Admin Profile Card */}
                <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <Shield className="h-5 w-5" />
                      Admin Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {adminProfile && (
                      <>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {adminProfile.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">{adminProfile.name}</h3>
                            <p className="text-gray-600 text-sm">{adminProfile.role}</p>
                            <Badge variant="secondary" className="bg-green-100 text-green-800 mt-1">
                              Online
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">{adminProfile.email}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">{adminProfile.phone}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <BookOpen className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">{adminProfile.department}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">Joined {new Date(adminProfile.joinDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">Last login: {adminProfile.lastLogin}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <TrendingUp className="h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/dashboard/admin/add-user" className="block">
                      <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                        <User className="w-4 h-4 mr-2" />
                        Add New User
                      </Button>
                    </Link>
                    <Link href="/dashboard/admin/add-subject" className="block">
                      <Button variant="outline" className="w-full justify-start border-green-600 text-green-600 hover:bg-green-50">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Manage Subjects
                      </Button>
                    </Link>
                    <Link href="/dashboard/admin/add-course" className="block">
                      <Button variant="outline" className="w-full justify-start border-purple-600 text-purple-600 hover:bg-purple-50">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Course Management
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Middle Column - Charts */}
              <div className="xl:col-span-2 space-y-6">
                
                {/* Student Distribution by Year */}
                <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-purple-700">
                      <BarChart3 className="h-5 w-5" />
                      Student Distribution by Year
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={studentYearData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis 
                            dataKey="year" 
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            axisLine={{ stroke: '#e5e7eb' }}
                          />
                          <YAxis 
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
                          <Bar 
                            dataKey="students" 
                            radius={[6, 6, 0, 0]}
                          >
                            {studentYearData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {studentYearData.map((year, index) => (
                        <div key={year.year} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: year.color }} />
                            <span className="text-sm font-medium text-gray-700">{year.year}</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{year.students}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Faculty Distribution by Department */}
                <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-orange-700">
                      <Users className="h-5 w-5" />
                      Faculty Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={facultyDeptData as any}
                            nameKey="department"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="faculty"
                            label={({ department, faculty }) => `${department}: ${faculty}`}
                          >
                            {facultyDeptData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {facultyDeptData.map((dept, index) => (
                        <Badge 
                          key={dept.department} 
                          variant="outline"
                          className="bg-white border-gray-200"
                        >
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                            {dept.department}: {dept.faculty}
                          </div>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
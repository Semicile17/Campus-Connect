"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area } from "recharts";
import { Calendar, TrendingUp, AlertTriangle, Award, Clock, BookOpen, Target, Download } from "lucide-react";

// Example subjects
const subjects = [
  { id: "math101", name: "Mathematics", code: "MATH101", instructor: "Dr. Sharma" },
  { id: "phy102", name: "Physics", code: "PHY102", instructor: "Prof. Verma" },
  { id: "cs103", name: "Computer Science", code: "CS103", instructor: "Dr. Gupta" },
  { id: "eng104", name: "English", code: "ENG104", instructor: "Ms. Patel" },
];

// Enhanced attendance data
const attendanceData: Record<string, Record<number, "present" | "absent" | "holiday">> = {
  math101: { 
    1: "present", 2: "absent", 3: "holiday", 4: "present", 5: "present", 
    6: "absent", 7: "present", 8: "holiday", 9: "present", 10: "absent",
    11: "present", 12: "present", 13: "present", 14: "holiday", 15: "present",
    16: "absent", 17: "present", 18: "present", 19: "present", 20: "holiday"
  },
  phy102: { 
    1: "present", 2: "absent", 3: "holiday", 4: "present", 5: "present",
    11: "present", 12: "present", 13: "absent", 14: "holiday", 15: "present"
  },
  cs103: { 
    1: "present", 2: "present", 3: "absent", 4: "absent", 5: "present",
    11: "present", 12: "holiday", 13: "present", 14: "present", 15: "present"
  },
  eng104: { 
    1: "holiday", 2: "present", 3: "present", 4: "absent", 5: "absent",
    11: "present", 12: "present", 13: "present", 14: "holiday", 15: "present"
  },
};

// Enhanced monthly chart data
const monthlyAttendance = [
  { month: "Jan", percentage: 90, trend: "up", classes: 25 },
  { month: "Feb", percentage: 86, trend: "down", classes: 22 },
  { month: "Mar", percentage: 92, trend: "up", classes: 28 },
  { month: "Apr", percentage: 78, trend: "down", classes: 24 },
  { month: "May", percentage: 88, trend: "up", classes: 26 },
  { month: "Jun", percentage: 94, trend: "up", classes: 30 },
];

// Weekly trend data
const weeklyTrend = [
  { day: "Mon", percentage: 92 },
  { day: "Tue", percentage: 85 },
  { day: "Wed", percentage: 88 },
  { day: "Thu", percentage: 90 },
  { day: "Fri", percentage: 87 },
  { day: "Sat", percentage: 95 },
];

export default function AttendancePage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("math101");
  const daysInMonth = 30;
  const data = attendanceData[selectedSubject] || {};

  const totalDays = Object.keys(data).length;
  const presentDays = Object.values(data).filter((s) => s === "present").length;
  const absentDays = Object.values(data).filter((s) => s === "absent").length;
  const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  const selectedSubjectInfo = subjects.find(sub => sub.id === selectedSubject);

  const getStatusColor = (status: "present" | "absent" | "holiday" | undefined) => {
    switch (status) {
      case "present": return "bg-green-500 hover:bg-green-600 shadow-green-200";
      case "absent": return "bg-red-500 hover:bg-red-600 shadow-red-200";
      case "holiday": return "bg-yellow-400 hover:bg-yellow-500 shadow-yellow-200";
      default: return "bg-gray-200 hover:bg-gray-300 shadow-gray-100";
    }
  };

  const getStatusIcon = (status: "present" | "absent" | "holiday" | undefined) => {
    switch (status) {
      case "present": return "✓";
      case "absent": return "✗";
      case "holiday": return "☀";
      default: return "";
    }
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-blue-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getPerformanceBadge = (percentage: number) => {
    if (percentage >= 90) return "Excellent";
    if (percentage >= 75) return "Good";
    if (percentage >= 60) return "Average";
    return "Needs Improvement";
  };

  const getBadgeVariant = (percentage: number) => {
    if (percentage >= 90) return "default";
    if (percentage >= 75) return "secondary";
    if (percentage >= 60) return "outline";
    return "destructive";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Dashboard</h1>
            <p className="text-gray-600 text-lg">Track and analyze your class attendance patterns</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-medium">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg">
              <Calendar className="w-4 h-4 mr-2" />
              Attendance Calendar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Overall Attendance Summary */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-blue-700 text-xl font-bold">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  Overall Attendance Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="text-2xl font-bold text-green-600 mb-1">{presentDays}</div>
                    <div className="text-sm font-medium text-green-700">Present</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                    <div className="text-2xl font-bold text-red-600 mb-1">{absentDays}</div>
                    <div className="text-sm font-medium text-red-700">Absent</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{totalDays}</div>
                    <div className="text-sm font-medium text-blue-700">Total Classes</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <div className={`text-2xl font-bold ${getPerformanceColor(percentage)} mb-1`}>
                      {percentage}%
                    </div>
                    <div className="text-sm font-medium text-purple-700">Attendance</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant={getBadgeVariant(percentage)} className="text-sm">
                    {getPerformanceBadge(percentage)}
                  </Badge>
                  <Button 
                    variant="outline" 
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 font-medium"
                  >
                    Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Subject-Wise Attendance Grid */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-green-700 text-xl font-bold">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                  Subject-Wise Attendance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-700">Select Subject:</span>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="w-64 bg-white border-gray-300">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{s.name}</span>
                              <span className="text-gray-500 text-sm">({s.code})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedSubjectInfo && (
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span><strong>Instructor:</strong> {selectedSubjectInfo.instructor}</span>
                      <span><strong>Code:</strong> {selectedSubjectInfo.code}</span>
                    </div>
                  )}
                </div>

                {/* Calendar Grid */}
                <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-200">
                  <div className="grid grid-cols-10 gap-2">
                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const day = i + 1;
                      const status = data[day];
                      return (
                        <div
                          key={day}
                          className={`aspect-square rounded-lg flex items-center justify-center text-white font-semibold text-sm transition-all duration-200 cursor-pointer hover:scale-110 shadow-sm ${getStatusColor(status)}`}
                          title={`Day ${day}: ${status || 'No data'}`}
                        >
                          {getStatusIcon(status)}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-6 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-green-500 shadow-sm" />
                    <span className="text-sm font-medium text-gray-700">Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-red-500 shadow-sm" />
                    <span className="text-sm font-medium text-gray-700">Absent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-yellow-400 shadow-sm" />
                    <span className="text-sm font-medium text-gray-700">Holiday</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-gray-200 shadow-sm" />
                    <span className="text-sm font-medium text-gray-700">No Data</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Attendance Insights */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-orange-700 text-xl font-bold">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Target className="h-5 w-5 text-orange-600" />
                  </div>
                  Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
                    <Award className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">Best Subject</p>
                      <p className="text-sm text-green-600">Computer Science (95%)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-blue-800">Most Consistent</p>
                      <p className="text-sm text-blue-600">Wednesday (92% avg)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-200">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-semibold text-red-800">Needs Attention</p>
                      <p className="text-sm text-red-600">April (78% attendance)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-semibold text-purple-800">Improvement</p>
                      <p className="text-sm text-purple-600">+12% since last month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Trend Chart */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-purple-700 text-xl font-bold">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  Weekly Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis 
                        domain={[80, 100]} 
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
                        dataKey="percentage" 
                        stroke="transparent" 
                        fill="url(#weeklyTrend)" 
                        fillOpacity={0.3}
                      />
                      <Line
                        type="monotone"
                        dataKey="percentage"
                        stroke="#7e22ce"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#7e22ce", strokeWidth: 2, stroke: "#fff" }}
                      />
                      <defs>
                        <linearGradient id="weeklyTrend" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7e22ce" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#7e22ce" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Attendance Chart */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-indigo-700 text-xl font-bold">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                  </div>
                  Monthly Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyAttendance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis 
                        domain={[70, 100]} 
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
                        dataKey="percentage" 
                        fill="#4f46e5" 
                        radius={[6, 6, 0, 0]}
                        className="hover:fill-#3730a3"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
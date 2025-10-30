/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
} from "recharts";
import { Award, TrendingUp, BookOpen, Users, Target, Download, FileText, Calendar } from "lucide-react";

const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe", "#eff6ff"];

export default function ResultsPage() {
  const [semester, setSemester] = useState("5");
  const [subject, setSubject] = useState("DBMS");

  // Enhanced realistic data
  const semesterData = {
    "1": { sgpa: 7.8, credits: 22, subjects: 6 },
    "2": { sgpa: 8.1, credits: 24, subjects: 6 },
    "3": { sgpa: 8.3, credits: 26, subjects: 6 },
    "4": { sgpa: 8.5, credits: 24, subjects: 6 },
    "5": { sgpa: 8.7, credits: 26, subjects: 6 },
    "6": { sgpa: 8.9, credits: 24, subjects: 6 },
  };

  const currentSemester = semesterData[semester as keyof typeof semesterData];
  const sgpa = currentSemester.sgpa;

  const cgpaData = [
    { name: "Sem 1", sgpa: 7.8, cgpa: 7.8, credits: 22 },
    { name: "Sem 2", sgpa: 8.1, cgpa: 7.95, credits: 24 },
    { name: "Sem 3", sgpa: 8.3, cgpa: 8.07, credits: 26 },
    { name: "Sem 4", sgpa: 8.5, cgpa: 8.18, credits: 24 },
    { name: "Sem 5", sgpa: 8.7, cgpa: 8.28, credits: 26 },
    { name: "Sem 6", sgpa: 8.9, cgpa: 8.38, credits: 24 },
  ];

  const subjectMarks = {
    "5": {
      DBMS: { internal: 24, external: 56, total: 80, grade: "A", credits: 4 },
      OS: { internal: 20, external: 52, total: 72, grade: "B+", credits: 4 },
      AI: { internal: 28, external: 60, total: 88, grade: "A+", credits: 4 },
      CN: { internal: 22, external: 54, total: 76, grade: "A", credits: 4 },
      SE: { internal: 26, external: 58, total: 84, grade: "A", credits: 4 },
      Math: { internal: 18, external: 48, total: 66, grade: "B", credits: 3 },
    },
    "4": {
      DSA: { internal: 25, external: 55, total: 80, grade: "A", credits: 4 },
      OOP: { internal: 28, external: 59, total: 87, grade: "A+", credits: 4 },
      DE: { internal: 22, external: 53, total: 75, grade: "A", credits: 4 },
    }
  };

  const backlogInfo = [
    { subject: "Mathematics II", semester: 2, cleared: true, clearedIn: "Sem 3", marks: 68 },
    { subject: "Digital Logic Design", semester: 1, cleared: true, clearedIn: "Sem 2", marks: 72 },
    { subject: "Data Structures", semester: 3, cleared: false, attempts: 2, nextAttempt: "Dec 2024" },
  ];

  const classPerformance = [
    { name: "You", cgpa: 8.38, sgpa: 8.9, rank: 5 },
    { name: "Class Avg", cgpa: 7.92, sgpa: 8.3, rank: null },
    { name: "Topper", cgpa: 9.2, sgpa: 9.4, rank: 1 },
  ];

  const gradeDistribution = [
    { grade: "A+", count: 3, percentage: 25 },
    { grade: "A", count: 5, percentage: 42 },
    { grade: "B+", count: 2, percentage: 17 },
    { grade: "B", count: 1, percentage: 8 },
    { grade: "C", count: 1, percentage: 8 },
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+": return "text-green-600 bg-green-100 border-green-200";
      case "A": return "text-blue-600 bg-blue-100 border-blue-200";
      case "B+": return "text-purple-600 bg-purple-100 border-purple-200";
      case "B": return "text-orange-600 bg-orange-100 border-orange-200";
      case "C": return "text-red-600 bg-red-100 border-red-200";
      default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getPerformanceStatus = (sgpa: number) => {
    if (sgpa >= 9.0) return { text: "Excellent", color: "text-green-600", bg: "bg-green-100" };
    if (sgpa >= 8.0) return { text: "Very Good", color: "text-blue-600", bg: "bg-blue-100" };
    if (sgpa >= 7.0) return { text: "Good", color: "text-orange-600", bg: "bg-orange-100" };
    return { text: "Needs Improvement", color: "text-red-600", bg: "bg-red-100" };
  };

  const performance = getPerformanceStatus(sgpa);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Academic Results</h1>
            <p className="text-gray-600 text-lg">Track your academic performance and progress</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-medium">
              <Download className="w-4 h-4 mr-2" />
              Download Transcript
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* SGPA Overview with Progress */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-blue-700 text-xl font-bold">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                  Semester Performance - Semester {semester}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{sgpa}</div>
                    <div className="text-sm font-medium text-blue-700">SGPA</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="text-2xl font-bold text-green-600 mb-1">{cgpaData[5].cgpa}</div>
                    <div className="text-sm font-medium text-green-700">CGPA</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{currentSemester.credits}</div>
                    <div className="text-sm font-medium text-purple-700">Credits</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="text-2xl font-bold text-orange-600 mb-1">{currentSemester.subjects}</div>
                    <div className="text-sm font-medium text-orange-700">Subjects</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <Badge className={`${performance.bg} ${performance.color} border-0 font-medium`}>
                    {performance.text}
                  </Badge>
                  <div className="text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4 inline mr-1 text-green-600" />
                    +0.2 from last semester
                  </div>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cgpaData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name" 
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
                        fill="url(#cgpaGradient)" 
                        fillOpacity={0.3}
                      />
                      <Line
                        type="monotone"
                        dataKey="cgpa"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ r: 6, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
                        activeDot={{ r: 8, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="sgpa"
                        stroke="#10b981"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 4, fill: "#10b981" }}
                      />
                      <defs>
                        <linearGradient id="cgpaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Subject-wise Marks Table */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-green-700 text-xl font-bold">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                  Subject-wise Performance - Semester {semester}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <Select value={semester} onValueChange={setSemester}>
                    <SelectTrigger className="w-48 bg-white border-gray-300">
                      <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((sem) => (
                        <SelectItem key={sem} value={sem.toString()}>
                          Semester {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="text-sm text-gray-600">
                    Showing {Object.keys(subjectMarks[semester as keyof typeof subjectMarks] || {}).length} subjects
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b-2 border-gray-200">
                        <th className="p-3 text-left font-semibold text-gray-700">Subject</th>
                        <th className="p-3 text-center font-semibold text-gray-700">Internal</th>
                        <th className="p-3 text-center font-semibold text-gray-700">External</th>
                        <th className="p-3 text-center font-semibold text-gray-700">Total</th>
                        <th className="p-3 text-center font-semibold text-gray-700">Grade</th>
                        <th className="p-3 text-center font-semibold text-gray-700">Credits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(subjectMarks[semester as keyof typeof subjectMarks] || {}).map(([subj, marks], index) => (
                        <tr key={subj} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="p-3 font-medium text-gray-900">{subj}</td>
                          <td className="p-3 text-center text-gray-700">{marks.internal}/30</td>
                          <td className="p-3 text-center text-gray-700">{marks.external}/70</td>
                          <td className="p-3 text-center font-semibold text-blue-700">{marks.total}/100</td>
                          <td className="p-3 text-center">
                            <Badge variant="outline" className={getGradeColor(marks.grade)}>
                              {marks.grade}
                            </Badge>
                          </td>
                          <td className="p-3 text-center text-gray-700">{marks.credits}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Grade Distribution */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-purple-700 text-xl font-bold">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                  Grade Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={gradeDistribution}
                        dataKey="count"
                        nameKey="grade"
                        outerRadius={70}
                        label={({ grade, percentage }) => `${grade} (${percentage}%)`}
                      >
                        {gradeDistribution.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {gradeDistribution.map((grade, index) => (
                    <div key={grade.grade} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                        <span className="font-medium">{grade.grade}</span>
                      </div>
                      <span className="text-gray-600">{grade.count} subjects ({grade.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Class Performance Comparison */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-orange-700 text-xl font-bold">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Users className="h-5 w-5 text-orange-600" />
                  </div>
                  Class Ranking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={classPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name" 
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
                      <Bar 
                        dataKey="cgpa" 
                        fill="#f59e0b" 
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {classPerformance.map((student, index) => (
                    <div key={student.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{student.name}</span>
                        {student.rank && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            Rank #{student.rank}
                          </Badge>
                        )}
                      </div>
                      <span className="font-semibold text-gray-700">{student.cgpa} CGPA</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Backlog Information */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-red-700 text-xl font-bold">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-red-600" />
                  </div>
                  Backlog Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {backlogInfo.map((backlog, index) => (
                    <div key={index} className={`p-3 rounded-xl border ${
                      backlog.cleared 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-gray-900">{backlog.subject}</span>
                        <Badge variant={backlog.cleared ? "default" : "destructive"}>
                          {backlog.cleared ? "Cleared" : "Pending"}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>Semester: {backlog.semester}</div>
                        {backlog.cleared ? (
                          <div>Cleared in {backlog.clearedIn} with {backlog.marks} marks</div>
                        ) : (
                          <div>Next attempt: {backlog.nextAttempt} (Attempt #{backlog.attempts})</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
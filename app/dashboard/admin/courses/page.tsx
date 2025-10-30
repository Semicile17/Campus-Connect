"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen, Clock, TrendingUp, Plus } from "lucide-react";

export default function CoursesPage() {
  const [stats, setStats] = useState({ btech: 0, mtech: 0, mca: 0, total: 0 });
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // ✅ Fetch students
        const studentRes = await fetch("/api/student");
        const studentData = await studentRes.json();

        // Calculate stats dynamically
        const counts = { btech: 0, mtech: 0, mca: 0, total: 0 };
        studentData.forEach((student: any) => {
          const course = student.course?.toLowerCase();
          if (course?.includes("b tech") || course?.includes("b.tech")) counts.btech++;
          else if (course?.includes("m tech") || course?.includes("m.tech")) counts.mtech++;
          else if (course?.includes("mca")) counts.mca++;
        });
        counts.total = counts.btech + counts.mtech + counts.mca;
        setStats(counts);

        // ✅ Fetch all courses
        const courseRes = await fetch("/api/courses");
        const courseData = await courseRes.json();
        // If your API returns an array, just set it directly
        setCourses(Array.isArray(courseData) ? courseData : courseData.courses || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCourseColor = (courseType: string) => {
    switch (courseType.toLowerCase()) {
      case "btech":
      case "b.tech":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "mtech":
      case "m.tech":
        return "bg-green-100 text-green-800 border-green-200";
      case "mca":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCourseIcon = (courseName: string) => {
    if (courseName.toLowerCase().includes("computer")) return "💻";
    if (courseName.toLowerCase().includes("electronic")) return "🔌";
    if (courseName.toLowerCase().includes("mechanical")) return "⚙️";
    if (courseName.toLowerCase().includes("civil")) return "🏗️";
    return "🎓";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading course data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
            <p className="text-gray-600 mt-1">Overview of all academic programs and student distribution</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add New Course
          </Button>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 mt-1">
                    All Programs
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
                  <p className="text-gray-500 text-sm font-medium">B.Tech Students</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.btech}</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 mt-1">
                    {stats.total > 0 ? Math.round((stats.btech / stats.total) * 100) : 0}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">M.Tech Students</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.mtech}</p>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 mt-1">
                    {stats.total > 0 ? Math.round((stats.mtech / stats.total) * 100) : 0}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">MCA Students</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.mca}</p>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 mt-1">
                    {stats.total > 0 ? Math.round((stats.mca / stats.total) * 100) : 0}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-xl">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                  <Badge variant="secondary" className="bg-red-100 text-red-700 mt-1">
                    Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Grid Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Academic Programs</h2>
            <div className="text-sm text-gray-600">
              Showing {courses.length} courses
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.length > 0 ? (
              courses.map((course: any) => (
                <Card
                  key={course.id}
                  className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {course.name}
                        </CardTitle>
                        <Badge variant="outline" className={getCourseColor(course.name) + " mt-2"}>
                          {course.name}
                        </Badge>
                      </div>
                      <div className="text-2xl">
                        {getCourseIcon(course.name)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Department:</span>
                      <span>{course.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Duration:</span>
                      <span>{course.durationYears} years</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GraduationCap className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">Semesters:</span>
                      <span>{course.totalSemesters}</span>
                    </div>
                    
                    {course.credits && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                        <span className="font-medium">Total Credits:</span>
                        <span>{course.credits}</span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-gray-200">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-full shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Found</h3>
                  <p className="text-gray-600 mb-6">
                    There are no courses currently available in the system.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Course
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
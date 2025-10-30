/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Calendar, Users, BookOpen, FileText, Clock, Eye, EyeOff } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'assignment' | 'notes' | 'class_test' | 'general' | 'urgent';
  course: string;
  year: number;
  semester: number;
  department: string;
  createdAt: Date;
  dueDate?: Date;
  targetStudents: number;
  isPublished: boolean;
}

interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  years: number;
  totalSemesters: number;
}

interface AnnouncementManagerProps {
  announcements: Announcement[];
  courses: Course[];
  facultyName: string;
  facultyDepartment: string;
}

export function AnnouncementManager({ announcements, courses, facultyName, facultyDepartment }: AnnouncementManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || announcement.type === selectedType;
    const matchesCourse = selectedCourse === "all" || announcement.course === selectedCourse;
    
    return matchesSearch && matchesType && matchesCourse;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment': return "bg-blue-100 text-blue-800";
      case 'notes': return "bg-green-100 text-green-800";
      case 'class_test': return "bg-orange-100 text-orange-800";
      case 'urgent': return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment': return "📝";
      case 'notes': return "📚";
      case 'class_test': return "📋";
      case 'urgent': return "🚨";
      default: return "📢";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="assignment">Assignments</option>
                <option value="notes">Notes</option>
                <option value="class_test">Class Tests</option>
                <option value="general">General</option>
                <option value="urgent">Urgent</option>
              </select>

              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>

              <Button variant="outline" className="border-gray-300 hover:border-blue-500">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-800">Your Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAnnouncements.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No announcements found</p>
                <p className="text-sm">Create your first announcement to get started</p>
              </div>
            ) : (
              filteredAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-white"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl mt-1">
                        {getTypeIcon(announcement.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg mb-1">
                          {announcement.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <Badge className={getTypeColor(announcement.type)}>
                            {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                          </Badge>
                          <span className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            {announcement.course} • Year {announcement.year} • Sem {announcement.semester}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {announcement.isPublished ? (
                        <Badge className="bg-green-100 text-green-800 flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="flex items-center">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Draft
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {announcement.content}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Created: {formatDate(announcement.createdAt)}
                      </span>
                      {announcement.dueDate && (
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Due: {formatDate(announcement.dueDate)}
                        </span>
                      )}
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {announcement.targetStudents} students
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-gray-300">
                        Edit
                      </Button>
                      <Button 
                        variant={announcement.isPublished ? "outline" : "default"} 
                        size="sm"
                        className={announcement.isPublished ? "border-gray-300" : "bg-blue-600 hover:bg-blue-700"}
                      >
                        {announcement.isPublished ? "Unpublish" : "Publish"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
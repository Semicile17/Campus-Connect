/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Download, Calendar, User, BookOpen, Clock, Eye, EyeOff, Bell, BellOff } from "lucide-react";

export type AnnouncementType = 'assignment' | 'notes' | 'class_test' | 'general' | 'urgent';
export type PriorityLevel = 'high' | 'medium' | 'low';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  course: string;
  subject: string;
  year: number;
  semester: number;
  facultyName: string;
  department: string;
  createdAt: Date;
  dueDate?: Date;
  attachments: string[];
  isRead: boolean;
  priority: PriorityLevel; // This is the specific type
}

interface StudentAnnouncementsProps {
  announcements: Announcement[];
  studentName: string;
  studentCourse: string;
  studentYear: number;
}

export function StudentAnnouncements({ announcements, studentName, studentCourse, studentYear }: StudentAnnouncementsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.facultyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || announcement.type === selectedType;
    const matchesPriority = selectedPriority === "all" || announcement.priority === selectedPriority;
    const matchesReadStatus = !showUnreadOnly || !announcement.isRead;
    
    return matchesSearch && matchesType && matchesPriority && matchesReadStatus;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment': return "bg-blue-100 text-blue-800 border-blue-200";
      case 'notes': return "bg-green-100 text-green-800 border-green-200";
      case 'class_test': return "bg-orange-100 text-orange-800 border-orange-200";
      case 'urgent': return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return "bg-red-500";
      case 'medium': return "bg-orange-500";
      case 'low': return "bg-green-500";
      default: return "bg-gray-500";
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const markAsRead = (announcementId: string) => {
    // This would be an API call in real implementation
    console.log(`Marking announcement ${announcementId} as read`);
  };

  const downloadAttachment = (filename: string) => {
    // This would be an API call in real implementation
    console.log(`Downloading ${filename}`);
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
                placeholder="Search announcements, subjects, or faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
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
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <Button 
                variant={showUnreadOnly ? "default" : "outline"}
                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                className={showUnreadOnly ? "bg-blue-600 hover:bg-blue-700" : "border-gray-300 hover:border-blue-500"}
              >
                {showUnreadOnly ? <BellOff className="w-4 h-4 mr-2" /> : <Bell className="w-4 h-4 mr-2" />}
                Unread Only
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Your Announcements
            </CardTitle>
            <div className="text-sm text-gray-600">
              {filteredAnnouncements.length} announcement{filteredAnnouncements.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAnnouncements.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-lg font-medium mb-2">No announcements found</p>
                <p className="text-sm">Try adjusting your filters or check back later for new announcements</p>
              </div>
            ) : (
              filteredAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`p-6 border rounded-xl transition-all duration-200 bg-white ${
                    !announcement.isRead 
                      ? 'border-blue-300 bg-blue-50/50 shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${announcement.priority === 'high' ? 'ring-2 ring-red-200' : ''}`}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="text-2xl mt-1">
                        {getTypeIcon(announcement.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800 text-lg mb-1">
                              {announcement.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2 flex-wrap gap-2">
                              <Badge className={getTypeColor(announcement.type)}>
                                {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                              </Badge>
                              <span className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-1" />
                                {announcement.subject}
                              </span>
                              <span className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {announcement.facultyName}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {/* Priority Indicator */}
                            <div 
                              className={`w-3 h-3 rounded-full ${getPriorityColor(announcement.priority)}`}
                              title={`${announcement.priority} priority`}
                            />
                            {!announcement.isRead && (
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {announcement.content}
                  </p>

                  {/* Attachments */}
                  {announcement.attachments.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                      <div className="flex flex-wrap gap-2">
                        {announcement.attachments.map((file, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => downloadAttachment(file)}
                            className="border-gray-300 hover:border-blue-500 text-xs"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            {file}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(announcement.createdAt)}
                      </span>
                      {announcement.dueDate && (
                        <span className="flex items-center font-medium text-orange-600">
                          <Clock className="w-4 h-4 mr-1" />
                          Due: {formatDate(announcement.dueDate)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      {!announcement.isRead && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => markAsRead(announcement.id)}
                          className="border-gray-300 hover:border-green-500"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Mark as Read
                        </Button>
                      )}
                      <Button 
                        variant={announcement.isRead ? "outline" : "default"} 
                        size="sm"
                        className={announcement.isRead ? "border-gray-300" : "bg-blue-600 hover:bg-blue-700"}
                      >
                        {announcement.type === 'assignment' ? 'View Assignment' : 
                         announcement.type === 'class_test' ? 'View Details' : 'View More'}
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
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ClassData {
  id: string;
  date: Date;
  subject: string;
  course: string;
  year: string;
  department: string;
  duration: string;
  attendance: number;
  totalStudents: number;
  topics: string[];
  status: 'completed' | 'scheduled' | 'cancelled';
}

interface FacultySubject {
  id: string;
  name: string;
  code: string;
  semester: number;
  course: {
    name: string;
    department: string;
  };
}

interface ClassesCalendarProps {
  classesData: ClassData[];
  facultySubjects: FacultySubject[];
}

export function ClassesCalendar({ classesData, facultySubjects }: ClassesCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Generate calendar days
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  // Generate calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dayClasses = classesData.filter(cls => 
      cls.date.getDate() === day && 
      cls.date.getMonth() === currentMonth && 
      cls.date.getFullYear() === currentYear
    );
    calendarDays.push({ date, classes: dayClasses });
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  const getClassesForSelectedDate = () => {
    if (!selectedDate) return [];
    return classesData.filter(cls => 
      cls.date.getDate() === selectedDate.getDate() &&
      cls.date.getMonth() === selectedDate.getMonth() &&
      cls.date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Calendar Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {monthNames[currentMonth]} {currentYear}
          </h2>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`min-h-24 p-2 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-300 hover:shadow-md ${
                  day ? 'bg-white' : 'bg-gray-50'
                } ${
                  day?.date.getDate() === currentDate.getDate() && 
                  day.date.getMonth() === currentDate.getMonth() ? 
                  'border-2 border-blue-500' : ''
                }`}
                onClick={() => day && handleDateClick(day.date)}
              >
                {day && (
                  <>
                    <div className="text-right mb-1">
                      <span className={`inline-block w-6 h-6 text-center text-sm rounded-full ${
                        day.date.getDate() === currentDate.getDate() && 
                        day.date.getMonth() === currentDate.getMonth() ?
                        'bg-blue-500 text-white' : 'text-gray-700'
                      }`}>
                        {day.date.getDate()}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {day.classes.slice(0, 2).map((cls, clsIndex) => (
                        <div
                          key={clsIndex}
                          className={`text-xs p-1 rounded ${
                            cls.status === 'completed' ? 'bg-green-100 text-green-800' :
                            cls.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {cls.subject}
                        </div>
                      ))}
                      {day.classes.length > 2 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{day.classes.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Class Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Class Details - {selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </DialogTitle>
            <DialogDescription>
              Manage and view details of classes scheduled for this day
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {getClassesForSelectedDate().length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No classes scheduled for this day
              </div>
            ) : (
              getClassesForSelectedDate().map((cls) => (
                <Card key={cls.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{cls.subject}</h3>
                        <p className="text-gray-600">{cls.course} • {cls.year}</p>
                        <p className="text-sm text-gray-500">{cls.department}</p>
                      </div>
                      <Badge className={getStatusColor(cls.status)}>
                        {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="font-medium text-gray-700">Duration:</span>
                        <span className="text-gray-600 ml-2">{cls.duration}</span>
                      </div>
                      {cls.status === 'completed' && (
                        <div>
                          <span className="font-medium text-gray-700">Attendance:</span>
                          <span className="text-gray-600 ml-2">
                            {cls.attendance}/{cls.totalStudents} ({Math.round((cls.attendance / cls.totalStudents) * 100)}%)
                          </span>
                        </div>
                      )}
                    </div>

                    {cls.topics.length > 0 && (
                      <div className="mb-3">
                        <span className="font-medium text-gray-700 text-sm">Topics Covered:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {cls.topics.map((topic, index) => (
                            <span
                              key={index}
                              className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {cls.status === 'scheduled' && (
                        <>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Start Class
                          </Button>
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                        </>
                      )}
                      {cls.status === 'completed' && (
                        <>
                          <Button size="sm" variant="outline">
                            View Attendance
                          </Button>
                          <Button size="sm" variant="outline">
                            Add Materials
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            {/* Add New Class Button */}
            <div className="flex justify-center pt-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                + Schedule New Class for This Day
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
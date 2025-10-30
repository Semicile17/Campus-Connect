"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Upload } from "lucide-react";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  attended: number;
  total: number;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  semester: number;
  course: {
    name: string;
    department: string;
  };
  students: Student[];
}

interface AttendanceManagerProps {
  subjects: Subject[];
  facultyName: string;
}

export function AttendanceManager({ subjects, facultyName }: AttendanceManagerProps) {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(subjects[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, boolean>>({});
  const [isMarkingMode, setIsMarkingMode] = useState(false);
  const [markingDate, setMarkingDate] = useState(new Date().toISOString().split('T')[0]);

  // Filter students based on search term
  const filteredStudents = selectedSubject.students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAttendanceToggle = (studentId: string) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const handleMarkAttendance = () => {
    // Here you would typically send the attendance data to your backend
    const presentStudents = Object.entries(attendanceRecords)
      .filter(([_, isPresent]) => isPresent)
      .map(([studentId]) => studentId);

    console.log('Marking attendance for:', {
      date: markingDate,
      subjectId: selectedSubject.id,
      presentStudents,
      totalStudents: selectedSubject.students.length,
      presentCount: presentStudents.length
    });

    // Reset after marking
    setAttendanceRecords({});
    setIsMarkingMode(false);
    
    // Show success message (you can use toast here)
    alert(`Attendance marked successfully for ${markingDate}! ${presentStudents.length} students present.`);
  };

  const calculateAttendancePercentage = (attended: number, total: number) => {
    return total > 0 ? Math.round((attended / total) * 100) : 0;
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 75) return "text-green-600 bg-green-100";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 75) return "Good";
    if (percentage >= 60) return "Average";
    return "Low";
  };

  return (
    <div className="space-y-6">
      {/* Subject Selection */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-800">Select Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <Button
                key={subject.id}
                variant={selectedSubject.id === subject.id ? "default" : "outline"}
                className={`transition-all duration-200 ${
                  selectedSubject.id === subject.id 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "border-gray-300 hover:border-blue-500"
                }`}
                onClick={() => setSelectedSubject(subject)}
              >
                {subject.name} ({subject.code})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject Info and Actions */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{selectedSubject.name}</h2>
              <p className="text-gray-600">
                {selectedSubject.course.name} • Sem {selectedSubject.semester} • {selectedSubject.code}
              </p>
              <p className="text-sm text-gray-500">{selectedSubject.course.department}</p>
            </div>
            <div className="flex gap-3">
              {!isMarkingMode ? (
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                  onClick={() => setIsMarkingMode(true)}
                >
                  Mark Today's Attendance
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={markingDate}
                    onChange={(e) => setMarkingDate(e.target.value)}
                    className="w-40"
                  />
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleMarkAttendance}
                  >
                    Save Attendance
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setIsMarkingMode(false);
                      setAttendanceRecords({});
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
              <Button variant="outline" className="border-gray-300 hover:border-blue-500">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search students by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button variant="outline" className="border-gray-300 hover:border-blue-500">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Attendance Marking Instructions */}
          {isMarkingMode && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-semibold">!</span>
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Marking attendance for {markingDate}
                  </h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Click on student names to mark them as present. Selected students will be highlighted in green.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Students List */}
          <div className="space-y-3">
            {filteredStudents.map((student) => {
              const percentage = calculateAttendancePercentage(student.attended, student.total);
              const isPresent = attendanceRecords[student.id];

              return (
                <div
                  key={student.id}
                  className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                    isMarkingMode
                      ? isPresent
                        ? "border-green-500 bg-green-50 hover:bg-green-100"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                  onClick={() => isMarkingMode && handleAttendanceToggle(student.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      {isMarkingMode && (
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          isPresent ? "bg-green-500 border-green-500" : "border-gray-300"
                        }`} />
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-800">{student.name}</h3>
                        <p className="text-sm text-gray-600">Roll No: {student.rollNumber}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">
                            {student.attended}/{student.total} classes
                          </span>
                          <Badge className={getAttendanceColor(percentage)}>
                            {percentage}% • {getAttendanceStatus(percentage)}
                          </Badge>
                        </div>
                        <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className={`h-2 rounded-full ${
                              percentage >= 75 ? "bg-green-500" :
                              percentage >= 60 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Statistics */}
          {!isMarkingMode && (
            <div className="mt-6 grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{filteredStudents.length}</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {filteredStudents.filter(s => calculateAttendancePercentage(s.attended, s.total) >= 75).length}
                </div>
                <div className="text-sm text-gray-600">Good Attendance</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {filteredStudents.filter(s => 
                    calculateAttendancePercentage(s.attended, s.total) >= 60 && 
                    calculateAttendancePercentage(s.attended, s.total) < 75
                  ).length}
                </div>
                <div className="text-sm text-gray-600">Average</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {filteredStudents.filter(s => calculateAttendancePercentage(s.attended, s.total) < 60).length}
                </div>
                <div className="text-sm text-gray-600">Low Attendance</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
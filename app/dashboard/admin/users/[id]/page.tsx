"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  Clock, 
  ArrowLeft,
  Edit3,
  Trash2,
  Shield,
  BarChart3
} from "lucide-react";

interface CourseInfo {
  year: string;
  currentSemester: string;
  syllabus: string;
  faculty: string[];
  credits: number;
  attendance: string;
  enrollmentNo?: string;
  department?: string;
  batch?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role?: string;
  image?: string;
  courseInfo?: CourseInfo;
  createdAt?: string;
  lastLogin?: string;
}

export default function UserInfoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/admin/get-users/${id}`);
        if (!res.ok) throw new Error("Failed to fetch user info");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        toast.error("Error fetching user information");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/get-users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      toast.success("User deleted successfully");
      router.push("/dashboard/admin/users");
    } catch (err) {
      toast.error("Error deleting user");
    } finally {
      setDeleting(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800 border-red-200";
      case "faculty": return "bg-blue-100 text-blue-800 border-blue-200";
      case "student": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex justify-center items-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading user details...</p>
      </div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex justify-center items-center">
      <Card className="w-96 shadow-lg border-red-200">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">User Not Found</h3>
          <p className="text-gray-600 mb-4">The requested user could not be found.</p>
          <Button onClick={() => router.push("/dashboard/admin/users")} className="bg-blue-600 hover:bg-blue-700">
            Back to Users
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/admin/users")}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Users
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
              <p className="text-gray-600 mt-1">Complete information about the user</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => toast.info("Edit feature coming soon!")}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit User
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {deleting ? "Deleting..." : "Delete User"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Left Column - Profile & Basic Info */}
          <div className="space-y-6">
            
            {/* Profile Summary */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <User className="h-5 w-5" />
                  Profile Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                    <AvatarImage src={user.image || ""} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                      {user.name?.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <Badge variant="outline" className={getRoleColor(user.role || "student") + " mt-2"}>
                      {user.role?.toUpperCase() || "STUDENT"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                      <p className="font-medium text-gray-900">{user.phone || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium text-gray-900">{user.address || "Not provided"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Shield className="h-5 w-5" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-2">
                  <span className="text-sm text-gray-600">User ID</span>
                  <span className="text-sm font-mono text-gray-900">{user.id}</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span className="text-sm text-gray-600">Account Created</span>
                  <span className="text-sm text-gray-900">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span className="text-sm text-gray-600">Last Login</span>
                  <span className="text-sm text-gray-900">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Course Information */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Course Information */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <BookOpen className="h-5 w-5" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.courseInfo ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <GraduationCap className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-blue-700">Year</p>
                        <p className="text-lg font-bold text-blue-900">{user.courseInfo.year}</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                        <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-green-700">Semester</p>
                        <p className="text-lg font-bold text-green-900">{user.courseInfo.currentSemester}</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                        <BarChart3 className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm text-purple-700">Credits</p>
                        <p className="text-lg font-bold text-purple-900">{user.courseInfo.credits}</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                        <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                        <p className="text-sm text-orange-700">Attendance</p>
                        <p className="text-lg font-bold text-orange-900">{user.courseInfo.attendance}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {user.courseInfo.enrollmentNo && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Enrollment No</p>
                          <p className="font-medium text-gray-900">{user.courseInfo.enrollmentNo}</p>
                        </div>
                      )}
                      {user.courseInfo.department && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Department</p>
                          <p className="font-medium text-gray-900">{user.courseInfo.department}</p>
                        </div>
                      )}
                      {user.courseInfo.batch && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Batch</p>
                          <p className="font-medium text-gray-900">{user.courseInfo.batch}</p>
                        </div>
                      )}
                    </div>

                    {user.courseInfo.faculty && user.courseInfo.faculty.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Assigned Faculty</h4>
                        <div className="space-y-2">
                          {user.courseInfo.faculty.map((faculty, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                              <User className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{faculty}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => router.push(`/dashboard/admin/users/${id}/course-details`)}
                    >
                      View Detailed Course Information
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Course Information</h3>
                    <p className="text-gray-600">This user doesn't have any course information available.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start border-green-600 text-green-600 hover:bg-green-50">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="justify-start border-purple-600 text-purple-600 hover:bg-purple-50">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact User
                  </Button>
                  <Button variant="outline" className="justify-start border-blue-600 text-blue-600 hover:bg-blue-50">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="justify-start border-orange-600 text-orange-600 hover:bg-orange-50">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Academic History
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
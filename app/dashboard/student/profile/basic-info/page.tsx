/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  User,
  Mail,
  Calendar,
  Phone,
  MapPin,
  BookOpen,
  GraduationCap,
  Save,
  X,
  Camera,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function BasicInfoPage() {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [photo, setPhoto] = useState("/default-profile.png");

  const [studentInfo, setStudentInfo] = useState({
    name: "Rohit Mahant",
    email: "rohitsinghmahant707@gmail.com",
    dob: "2005-01-01",
    gender: "Male",
    phone: "+91 9548086912",
    address: "Kedar B, Room 101, GBPIET Campus",
    city: "Pauri Garhwal",
    state: "Uttarakhand",
    pincode: "246001",
    rollNo: "230245",
    enrollmentNo: "2300901010245",
    branch: "Computer Science & Engineering",
    semester: "5th Semester",
    year: "3rd Year",
    bloodGroup: "B+",
    emergencyContact: "+91 9876543211",
    fatherName: "Madan Singh Mahant",
    motherName: "Nirmala Mahant",
  });

  const handleEditToggle = () => setEditMode(!editMode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentInfo({
      ...studentInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setStudentInfo({
      ...studentInfo,
      [name]: value,
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setPhoto(fileURL);
    }
  };

  const handleSaveChanges = () => {
    setEditMode(false);
    console.log("Updated Info:", studentInfo);
    // Add API call here to save changes
  };

  const personalInfoFields = [
    { key: "name", label: "Full Name", icon: User, type: "text" },
    { key: "email", label: "Email Address", icon: Mail, type: "email" },
    { key: "dob", label: "Date of Birth", icon: Calendar, type: "date" },
    {
      key: "gender",
      label: "Gender",
      icon: User,
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    {
      key: "bloodGroup",
      label: "Blood Group",
      icon: User,
      type: "select",
      options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
  ];

  const addressFields = [
    { key: "address", label: "Address", icon: MapPin, type: "text" },
    { key: "city", label: "City", icon: MapPin, type: "text" },
    { key: "state", label: "State", icon: MapPin, type: "text" },
    { key: "pincode", label: "PIN Code", icon: MapPin, type: "text" },
  ];

  const academicFields = [
    { key: "rollNo", label: "Roll Number", icon: BookOpen, type: "text" },
    {
      key: "enrollmentNo",
      label: "Enrollment Number",
      icon: BookOpen,
      type: "text",
    },
    { key: "branch", label: "Branch", icon: GraduationCap, type: "text" },
    {
      key: "semester",
      label: "Semester",
      icon: GraduationCap,
      type: "select",
      options: [
        "1st Semester",
        "2nd Semester",
        "3rd Semester",
        "4th Semester",
        "5th Semester",
        "6th Semester",
        "7th Semester",
        "8th Semester",
      ],
    },
    {
      key: "year",
      label: "Academic Year",
      icon: GraduationCap,
      type: "select",
      options: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    },
  ];

  const familyFields = [
    { key: "fatherName", label: "Father's Name", icon: User, type: "text" },
    { key: "motherName", label: "Mother's Name", icon: User, type: "text" },
    {
      key: "emergencyContact",
      label: "Emergency Contact",
      icon: Phone,
      type: "tel",
    },
  ];

  const renderField = (field: any) => {
    const IconComponent = field.icon;

    if (field.type === "select") {
      return (
        <Select
          value={studentInfo[field.key as keyof typeof studentInfo]}
          onValueChange={(value) => handleSelectChange(field.key, value)}
          disabled={!editMode}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option: string) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    return (
      <div className="relative">
        <IconComponent className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          name={field.key}
          value={studentInfo[field.key as keyof typeof studentInfo]}
          disabled={!editMode}
          onChange={handleChange}
          type={field.type}
          className="pl-10"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/student/profile")}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              ← Back to Profile
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Basic Information
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your personal and academic details
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {editMode ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setEditMode(false)}
                  className="border-red-600 text-red-600 hover:bg-red-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveChanges}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={handleEditToggle}
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Edit Information
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Profile Photo Section */}
          <div className="xl:col-span-1 space-y-6">
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 text-lg">
                  <Camera className="h-5 w-5" />
                  Profile Photo
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage
                      src={photo}
                      alt="Profile Photo"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-linear-to-br from-blue-600 to-purple-600 text-white text-2xl font-bold">
                      {studentInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {editMode && (
                    <div className="absolute -bottom-2 -right-2">
                      <Label
                        htmlFor="photo"
                        className="cursor-pointer bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                      >
                        <Camera className="w-4 h-4" />
                      </Label>
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {studentInfo.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{studentInfo.rollNo}</p>
                  <Badge
                    variant="secondary"
                    className="mt-2 bg-green-100 text-green-800"
                  >
                    {studentInfo.branch}
                  </Badge>
                </div>

                {editMode && (
                  <div className="text-center w-full">
                    <Label
                      htmlFor="photo-button"
                      className="cursor-pointer flex items-center gap-2 justify-center text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      <Upload className="w-4 h-4" />
                      Upload New Photo
                    </Label>
                    <Input
                      id="photo-button"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">
                  Profile Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Profile Completion
                  </span>
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800"
                  >
                    95%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="text-sm font-medium">2 days ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Verification</span>
                  <Badge
                    variant="default"
                    className="bg-blue-100 text-blue-800"
                  >
                    Verified
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Information Sections */}
          <div className="xl:col-span-3 space-y-6">
            {/* Personal Information */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-linear-to-r from-blue-50 to-blue-100/50 border-b">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {personalInfoFields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 capitalize">
                        {field.label}
                      </Label>
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-linear-to-r from-green-50 to-green-100/50 border-b">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <GraduationCap className="h-5 w-5" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {academicFields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 capitalize">
                        {field.label}
                      </Label>
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-linear-to-r from-purple-50 to-purple-100/50 border-b">
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <MapPin className="h-5 w-5" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addressFields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 capitalize">
                        {field.label}
                      </Label>
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Family Information */}
            <Card className="shadow-lg border border-gray-200/60 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-linear-to-r from-orange-50 to-orange-100/50 border-b">
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <User className="h-5 w-5" />
                  Family & Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {familyFields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 capitalize">
                        {field.label}
                      </Label>
                      {renderField(field)}
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

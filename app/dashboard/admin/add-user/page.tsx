/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select as UiSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Select from "react-select";

export default function AddUserPage() {
  const router = useRouter();

  const [role, setRole] = useState<"student" | "faculty" | "admin" | "">("");
  const [form, setForm] = useState<Record<string, any>>({
    name: "",
    email: "",
    password: "",
  });
  const [selectedSubjects, setSelectedSubjects] = useState<
    { label: string; value: string }[]
  >([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Fetch all courses
  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch("/api/courses");
      if (!res.ok) throw new Error("Failed to fetch courses");
      return res.json();
    },
  });

  // Fetch all subjects
  const { data: subjects = [] } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const res = await fetch("/api/subjects");
      if (!res.ok) throw new Error("Failed to fetch subjects");
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const endpoint =
        role === "student"
          ? "/api/admin/add-student"
          : role === "faculty"
          ? "/api/admin/add-faculty"
          : "/api/admin/add-admin";

      const body = {
        ...form,
        year: form.year ? Number(form.year) : undefined,
        semester: form.semester ? Number(form.semester) : undefined,
        cgpa: form.cgpa ? Number(form.cgpa) : undefined,
        subjectsTaught: selectedSubjects.map((s) => s.value),
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to add user");
      return res.json();
    },
    onSuccess: (data) => {
      toast.success(
        `${role.charAt(0).toUpperCase() + role.slice(1)} added successfully!`
      );

      if (data?.id) {
        router.push(`/dashboard/admin/users/${data.id}`);
      } else {
        toast.warning("User added, but ID not found in response.");
      }

      setForm({ name: "", email: "", password: "" });
      setRole("");
      setSelectedSubjects([]);
    },
    onError: () => toast.error("Error adding user."),
  });

  const commonFields = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Full Name</Label>
        <Input
          placeholder="Enter full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Email Address
        </Label>
        <Input
          placeholder="Enter email address"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Password</Label>
        <Input
          placeholder="Create password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const roleSpecificFields = () => {
    if (role === "student") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Enrollment Number
            </Label>
            <Input
              placeholder="Enter enrollment number"
              value={form.enrollmentNo || ""}
              onChange={(e) =>
                setForm({ ...form, enrollmentNo: e.target.value })
              }
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Course Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Course</Label>
            <UiSelect
              value={selectedCourse}
              onValueChange={(value) => {
                setSelectedCourse(value);
                setSelectedDepartment("");
                setForm({ ...form, course: value, department: "" });
              }}
            >
              <SelectTrigger className="focus:ring-2 focus:ring-blue-500 transition-all duration-200">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {[...new Set(courses.map((c: any) => c.name))].map(
                  (courseName) => (
                    <SelectItem
                      key={courseName as string}
                      value={courseName as string}
                    >
                      {courseName as string}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </UiSelect>
          </div>

          {/* Department Selection (depends on course) */}
          {selectedCourse && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Department
              </Label>
              <UiSelect
                value={selectedDepartment}
                onValueChange={(value) => {
                  setSelectedDepartment(value);
                  setForm({ ...form, department: value });
                }}
              >
                <SelectTrigger className="focus:ring-2 focus:ring-blue-500 transition-all duration-200">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {courses
                    .filter((c: any) => c.name === selectedCourse)
                    .map((c: any) => (
                      <SelectItem key={c.id} value={c.department}>
                        {c.department}
                      </SelectItem>
                    ))}
                </SelectContent>
              </UiSelect>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Year</Label>
              <Input
                placeholder="Year"
                type="number"
                value={form.year || ""}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Semester
              </Label>
              <Input
                placeholder="Semester"
                type="number"
                value={form.semester || ""}
                onChange={(e) => setForm({ ...form, semester: e.target.value })}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">CGPA</Label>
            <Input
              placeholder="Enter CGPA"
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={form.cgpa || ""}
              onChange={(e) => setForm({ ...form, cgpa: e.target.value })}
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      );
    }

    if (role === "faculty") {
      return (
        <div className="space-y-4">
          {/* Department Selector */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Department
            </Label>
            <UiSelect
              value={form.department || ""}
              onValueChange={(value) => setForm({ ...form, department: value })}
            >
              <SelectTrigger className="focus:ring-2 focus:ring-blue-500 transition-all duration-200">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Computer Science & Engineering">
                  Computer Science & Engineering
                </SelectItem>
                <SelectItem value="Electrical Engineering">
                  Electrical Engineering
                </SelectItem>
                <SelectItem value="Electronics & Communication Engineering">
                  Electronics & Communication Engineering
                </SelectItem>
                <SelectItem value="Mechanical Engineering">
                  Mechanical Engineering
                </SelectItem>
                <SelectItem value="Biotechnology">Biotechnology</SelectItem>
              </SelectContent>
            </UiSelect>
          </div>

          {/* Designation */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Designation
            </Label>
            <Input
              placeholder="Enter designation"
              value={form.designation || ""}
              onChange={(e) =>
                setForm({ ...form, designation: e.target.value })
              }
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Multi-select subjects */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Subjects Taught
            </Label>
            <Select
              isMulti
              options={subjects.map((s: any) => ({
                label: s.name,
                value: s.id,
              }))}
              value={selectedSubjects}
              onChange={(newValue) =>
                setSelectedSubjects(
                  newValue as { label: string; value: string }[]
                )
              }
              className="focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "#e5e7eb",
                  "&:hover": { borderColor: "#d1d5db" },
                  minHeight: "42px",
                }),
              }}
            />
          </div>
        </div>
      );
    }

    if (role === "admin") {
      return (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Department
          </Label>
          <Input
            placeholder="Enter department"
            value={form.department || ""}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8 font-sans">
      <Card className="w-full max-w-2xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-800 tracking-tight">
            Add New User
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Create a new user account in the system
          </p>
        </CardHeader>

        <CardContent>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (!role) {
                toast.error("Please select a role first!");
                return;
              }
              mutation.mutate();
            }}
          >
            {/* Role Selector */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">
                Select Role
              </Label>
              <div className="flex gap-3 flex-wrap">
                {["student", "faculty", "admin"].map((r) => (
                  <Button
                    key={r}
                    type="button"
                    variant={role === r ? "default" : "outline"}
                    className={`flex-1 min-w-[120px] transition-all duration-200 ${
                      role === r
                        ? "bg-blue-600 hover:bg-blue-700 shadow-md"
                        : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
                    }`}
                    onClick={() => {
                      setRole(r as any);
                      setForm({ name: "", email: "", password: "" });
                      setSelectedSubjects([]);
                    }}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Common + Role-Specific Fields */}
            {commonFields}
            {role && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  {role.charAt(0).toUpperCase() + role.slice(1)} Information
                </h3>
                {roleSpecificFields()}
              </div>
            )}

            <Button
              type="submit"
              className="w-full mt-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={mutation.isPending || !role}
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding User...
                </span>
              ) : (
                "Add User"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

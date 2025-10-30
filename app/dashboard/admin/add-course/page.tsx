"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CourseForm = {
  name: string;
  durationYears: number;
  department: string;
  totalSemesters: number;
};

export default function AddCoursePage() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<CourseForm>();
  const router = useRouter();

  const onSubmit = async (data: CourseForm) => {
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          durationYears: Number(data.durationYears),
          totalSemesters: Number(data.totalSemesters),
        }),
      });

      if (!res.ok) throw new Error("Failed to create course");
      toast.success("Course added successfully!");
      reset();
    //   router.push("/courses");
    } catch (err: any) {
      toast.error(err.message || "Error adding course");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 flex items-center justify-center font-sans">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
        <CardHeader className="text-center space-y-2 pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800 tracking-tight">
            Add New Course
          </CardTitle>
          <p className="text-gray-600 text-sm">Create a new academic course program</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Course Name */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Course Name</Label>
                <Input 
                  {...register("name", { required: true })} 
                  placeholder="e.g. Bachelor of Technology"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-gray-300"
                />
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Department</Label>
                <Input 
                  {...register("department", { required: true })} 
                  placeholder="e.g. Computer Science & Engineering"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-gray-300"
                />
              </div>

              {/* Duration and Semesters in Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Duration (Years)</Label>
                  <Input 
                    type="number" 
                    {...register("durationYears", { 
                      required: true,
                      min: 1,
                      max: 6 
                    })} 
                    placeholder="4"
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Total Semesters</Label>
                  <Input 
                    type="number" 
                    {...register("totalSemesters", { 
                      required: true,
                      min: 1,
                      max: 12 
                    })} 
                    placeholder="8"
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-gray-300"
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding Course...
                </span>
              ) : (
                "Add Course"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
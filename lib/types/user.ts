import { JsonValue } from "@prisma/client/runtime/library";

export interface StudentData {
  id: string;
  userId: string;
  enrollmentNo: string;
  course: string;
  year: number;
  semester: number;
  cgpa: number | null;
  photoUrl: string | null;
}

export interface FacultyData {
  id: string;
  userId: string;
  department: string;
  designation: string;
  subjectsTaught: JsonValue;
}

export interface AdminData {
  id: string;
  userId: string;
  department: string;
  permissions: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  student: StudentData | null;
  faculty: FacultyData | null;
  admin: AdminData | null;
  createdAt: Date;
  updatedAt: Date;
}

export type UserState = User | null;
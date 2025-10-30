export const publicRoutes: string[] = ["/", "/about", "/contact", "/login"];

export const roleRoutes = {
  admin: [
    "/dashboard/admin",
    "/dashboard/admin/add-course",
    "/dashboard/admin/add-user",
    "/dashboard/admin/courses",
    "/dashboard/admin/users",
  ],
  faculty: ["/dashboard/faculty","/dashboard/faculty/attendance","/dashboard/faculty/announcements","/dashboard/faculty/classes"],
  student: [
    "/dashboard/student",
    "/dashboard/student/attendance",
    "/dashboard/student/backlogs",
    "/dashboard/student/profile",
    "/dashboard/student/results",
    "/dashboard/student/announcements"
  ],
} ;

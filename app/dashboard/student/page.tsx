import { getUser } from "@/lib/getUser";

export default async function DashboardHome() {
  const user = await getUser();

  if (!user || user.role !== "student") {
    return <div className="p-6 text-red-600 font-semibold">Unauthorized</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-indigo-700">Welcome back!</h1>
      <p className="mt-2 text-gray-600">
        Check your attendance, backlogs, and performance overview.
      </p>
    </div>
  );
}

import { getUser } from "@/lib/getUser";
import ProfileClient from "@/components/student/ProfileClient";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user || user.role !== "student") {
    return (
      <div className="flex h-screen items-center justify-center text-red-600 font-semibold">
        Unauthorized Access
      </div>
    );
  }

  return <ProfileClient user={user} />;
}

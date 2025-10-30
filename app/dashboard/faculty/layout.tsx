
import { getUser } from "@/lib/getUser";
import Sidebar from "@/components/dashboard/Sidebar";
import ClientProviders from "@/lib/ClientProviders";
import ChatbotWidget from "@/components/chatbot/FloatingChatbot";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user =getUser();
  return (
    <ClientProviders>
      <div className="flex h-screen bg-gray-50 text-gray-900">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
          <ChatbotWidget user={user} />
        </main>
      </div>
    </ClientProviders>
  );
}

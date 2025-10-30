/* eslint-disable @typescript-eslint/no-explicit-any */
 
"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  X,
  Mic,
  MicOff,
  Bot,
  User as MUser,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  user: any; // The user data passed from server component
}

// Mock user data - In real app, this would come from your backend/authentication
const userData = {
  student: {
    id: "STU001",
    name: "Aarav Sharma",
    role: "student" as const,
    enrollmentNo: "GBPIET2023CSE045",
    currentSemester: 6,
    marks: {
      "Semester 5": {
        "Data Structures & Algorithms": {
          internal: 28,
          external: 62,
          total: 90,
          grade: "A+",
        },
        "Database Management Systems": {
          internal: 24,
          external: 56,
          total: 80,
          grade: "A",
        },
        "Operating Systems": {
          internal: 22,
          external: 54,
          total: 76,
          grade: "A",
        },
        "Computer Networks": {
          internal: 26,
          external: 58,
          total: 84,
          grade: "A",
        },
        "Software Engineering": {
          internal: 20,
          external: 52,
          total: 72,
          grade: "B+",
        },
      },
      "Semester 4": {
        "Object Oriented Programming": {
          internal: 28,
          external: 60,
          total: 88,
          grade: "A+",
        },
        "Digital Electronics": {
          internal: 24,
          external: 55,
          total: 79,
          grade: "A",
        },
        "Discrete Mathematics": {
          internal: 18,
          external: 50,
          total: 68,
          grade: "B",
        },
      },
    },
    attendance: {
      "Data Structures & Algorithms": "92%",
      "Database Management Systems": "88%",
      "Operating Systems": "85%",
    },
    cgpa: 8.7,
  },
  faculty: {
    id: "FAC001",
    name: "Dr. Priya Patel",
    role: "faculty" as const,
    department: "Computer Science",
    subjects: ["Data Structures", "Algorithms", "Database Systems"],
    currentClasses: ["CSE-A", "CSE-B"],
    schedule: {
      Monday: [
        "9:00 AM - Data Structures (CSE-A)",
        "2:00 PM - Algorithms (CSE-B)",
      ],
      Tuesday: ["11:00 AM - Database Systems (CSE-A)"],
    },
  },
  admin: {
    id: "ADM001",
    name: "Admin User",
    role: "admin" as const,
    department: "Administration",
    permissions: ["user_management", "academic_records", "system_config"],
  },
};

type UserRole = "student" | "faculty" | "admin";

// Role-specific welcome messages and capabilities
const roleCapabilities = {
  student: `Hi 👋 I'm your academic assistant! I can help you with:
• Marks and grades
• Attendance
• CGPA/SGPA
• Course information
• Academic calendar

What would you like to know?`,

  faculty: `Hello Professor! 👋 I'm your faculty assistant. I can help you with:
• Class schedules and timetables
• Student performance analytics
• Attendance management
• Grade submission
• Course materials

How can I assist you today?`,

  admin: `Welcome Admin! 🔧 I'm your administrative assistant. I can help you with:
• User management and permissions
• System analytics and reports
• Academic record management
• Institutional data
• System configuration

What would you like to manage today?`,
};

const getActualUser = (user: any) => {
  if (!user) return null;

  console.log("User structure:", user);

  // For faculty/admin - data is in user.value
  if (user.value) {
    console.log("Found user.value:", user.value);

    try {
      // If value is a string, parse it
      if (typeof user.value === "string") {
        return JSON.parse(user.value);
      }
      // If value is already an object, use it directly
      return user.value;
    } catch (error) {
      console.error("Error parsing user.value:", error);
      return null;
    }
  }

  // For student - data is directly in user object
  if (user.role || user.student || user.faculty || user.admin) {
    return user;
  }

  return null;
};

// Transform actual user data to the expected format
const transformUserData = (user: any, role: UserRole) => {
  if (!user) return userData[role]; // Fallback to mock data if no user

  switch (role) {
    case "student":
      return {
        id: user.id || `STU${user.student?.id || "001"}`,
        name: user.name || "Student User",
        role: "student" as const,
        enrollmentNo: user.student?.enrollmentNo || "GBPIET2023CSE045",
        currentSemester: user.student?.currentSemester || 6,
        marks: user.student?.marks || userData.student.marks, // Fallback to mock marks
        attendance: user.student?.attendance || userData.student.attendance, // Fallback to mock attendance
        cgpa: user.student?.cgpa || 8.7,
      };

    case "faculty":
      return {
        id: user.id || `FAC${user.faculty?.id || "001"}`,
        name: user.name || "Faculty User",
        role: "faculty" as const,
        department: user.faculty?.department || "Computer Science",
        subjects: user.faculty?.subjects || userData.faculty.subjects,
        currentClasses:
          user.faculty?.currentClasses || userData.faculty.currentClasses,
        schedule: user.faculty?.schedule || userData.faculty.schedule,
      };

    case "admin":
      return {
        id: user.id || `ADM${user.admin?.id || "001"}`,
        name: user.name || "Admin User",
        role: "admin" as const,
        department: user.admin?.department || "Administration",
        permissions: user.admin?.permissions || userData.admin.permissions,
      };

    default:
      return userData[role];
  }
};

export default function ChatbotWidget({ user }: Props) {
  const [isReady, setIsReady] = useState(false);
  const actualUser = getActualUser(user);

  // Add this useEffect to wait for user data
  useEffect(() => {
    if (actualUser) {
      setIsReady(true);
    }
  }, [actualUser]);

  console.log(actualUser);

  const getUserRole = (): UserRole => {
    if (!actualUser) return "student";

    // Check all possible role indicators
    if (actualUser.role === "admin" || actualUser.admin) return "admin";
    if (actualUser.role === "faculty" || actualUser.faculty) return "faculty";
    if (actualUser.role === "student" || actualUser.student) return "student";

    return "student";
  };
  const userRole = getUserRole();

  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserRole>(userRole);
  const [messages, setMessages] = useState<
    Array<{ sender: string; text: string; timestamp: Date }>
  >([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setCurrentUser(userRole);
  }, [userRole]);

  // Initialize messages on component mount
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: roleCapabilities[userRole],
        timestamp: new Date(),
      },
    ]);
  }, [userRole]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  // Student-specific query processing
  const processStudentQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (
      lowerQuery.includes("mark") ||
      lowerQuery.includes("score") ||
      lowerQuery.includes("grade")
    ) {
      if (lowerQuery.includes("dsa") || lowerQuery.includes("data structure")) {
        const marks =
          userData.student.marks["Semester 5"]["Data Structures & Algorithms"];
        return `In Data Structures & Algorithms (Semester 5), you scored:\n• Internal: ${marks.internal}/30\n• External: ${marks.external}/70\n• Total: ${marks.total}/100\n• Grade: ${marks.grade}`;
      }
      if (lowerQuery.includes("dbms") || lowerQuery.includes("database")) {
        const marks =
          userData.student.marks["Semester 5"]["Database Management Systems"];
        return `In Database Management Systems (Semester 5), you scored:\n• Internal: ${marks.internal}/30\n• External: ${marks.external}/70\n• Total: ${marks.total}/100\n• Grade: ${marks.grade}`;
      }
      if (
        lowerQuery.includes("last sem") ||
        lowerQuery.includes("previous sem")
      ) {
        const sem5Marks = Object.entries(userData.student.marks["Semester 5"])
          .map(
            ([subject, marks]) =>
              `${subject}: ${marks.total}/100 (${marks.grade})`
          )
          .join("\n");
        return `Your Semester 5 marks:\n${sem5Marks}\n\nSGPA: 8.7`;
      }
      return "I can check your marks in specific subjects like DSA, DBMS, OS, etc. Which subject are you interested in?";
    }

    if (lowerQuery.includes("attendance") || lowerQuery.includes("present")) {
      if (lowerQuery.includes("dsa")) {
        return `Your attendance in Data Structures & Algorithms is ${userData.student.attendance["Data Structures & Algorithms"]}`;
      }
      if (lowerQuery.includes("dbms")) {
        return `Your attendance in Database Management Systems is ${userData.student.attendance["Database Management Systems"]}`;
      }
      return `I can check your attendance for specific subjects. Your current attendance ranges from 85% to 92%. Which subject's attendance would you like to know?`;
    }

    if (lowerQuery.includes("cgpa") || lowerQuery.includes("grade point")) {
      return `Your current CGPA is ${userData.student.cgpa}. You're doing great! 🎉`;
    }

    if (lowerQuery.includes("semester") || lowerQuery.includes("current")) {
      return `You're currently in Semester ${userData.student.currentSemester} of Computer Science & Engineering.`;
    }

    return "I understand you're asking about academic information. Could you please be more specific? For example, you can ask about:\n• 'What were my marks in DSA?'\n• 'What's my attendance in DBMS?'\n• 'What's my current CGPA?'\n• 'Which semester am I in?'";
  };

  // Faculty-specific query processing
  const processFacultyQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("schedule") || lowerQuery.includes("timetable")) {
      const schedule = userData.faculty.schedule;
      const scheduleText = Object.entries(schedule)
        .map(([day, classes]) => `${day}: ${classes.join(", ")}`)
        .join("\n");
      return `Your current schedule:\n\n${scheduleText}`;
    }

    if (lowerQuery.includes("class") || lowerQuery.includes("students")) {
      return `You're currently teaching: ${userData.faculty.currentClasses.join(
        ", "
      )}\nSubjects: ${userData.faculty.subjects.join(", ")}`;
    }

    if (lowerQuery.includes("attendance") && lowerQuery.includes("submit")) {
      return "You can submit attendance through the faculty portal. Would you like me to open the attendance submission page?";
    }

    if (lowerQuery.includes("grade") && lowerQuery.includes("submit")) {
      return "Grade submission portal is available. I can help you navigate to the grade submission system for your subjects.";
    }

    if (lowerQuery.includes("student") && lowerQuery.includes("performance")) {
      return "I can generate student performance reports for your classes. Which class and subject would you like analytics for?";
    }

    return "I can help you with class schedules, student management, grade submission, and attendance tracking. What specific faculty task do you need assistance with?";
  };

  // Admin-specific query processing
  const processAdminQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("user") || lowerQuery.includes("manage user")) {
      return `User Management Options:\n• Add/Remove Users\n• Reset Passwords\n• Manage Permissions\n• View User Activity\n\nYou have permissions for: ${userData.admin.permissions.join(
        ", "
      )}`;
    }

    if (lowerQuery.includes("report") || lowerQuery.includes("analytics")) {
      return "I can generate institutional reports:\n• Student Performance Analytics\n• Faculty Workload Reports\n• Attendance Summary\n• Academic Progress Reports\n\nWhich report would you like to generate?";
    }

    if (lowerQuery.includes("system") || lowerQuery.includes("configure")) {
      return "System Configuration Options:\n• Academic Calendar Setup\n• Grade System Configuration\n• User Role Management\n• Database Maintenance\n• System Backup";
    }

    if (lowerQuery.includes("academic") && lowerQuery.includes("record")) {
      return "Academic Records Management:\n• Batch Processing\n• Transcript Generation\n• Mark Sheet Verification\n• Degree Audit\n\nWhat records do you need to manage?";
    }

    if (lowerQuery.includes("permission") || lowerQuery.includes("access")) {
      return `Current Admin Permissions:\n• ${userData.admin.permissions.join(
        "\n• "
      )}\n\nYou can manage user permissions through the admin dashboard.`;
    }

    return "I can assist with user management, system configuration, institutional reports, and academic record management. What administrative task would you like to perform?";
  };

  const processQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    setIsProcessing(true);

    // Common queries across all roles
    if (
      lowerQuery.includes("hello") ||
      lowerQuery.includes("hi") ||
      lowerQuery.includes("hey")
    ) {
      const userName = userData[currentUser].name;
      return `Hello ${userName}! 👋 How can I assist you today?`;
    }

    if (lowerQuery.includes("help")) {
      return roleCapabilities[currentUser];
    }

    if (lowerQuery.includes("who am i") || lowerQuery.includes("my role")) {
      const userInfo = transformUserData(actualUser, currentUser);
      return `You are ${userInfo.name} (${userInfo.role}${
        userInfo.role === "student"
          ? ` - ${userInfo.enrollmentNo}`
          : userInfo.role === "faculty"
          ? ` - ${userInfo.department}`
          : ` - ${userInfo.department}`
      })`;
    }

    // Role-specific processing
    switch (currentUser) {
      case "student":
        return processStudentQuery(query);
      case "faculty":
        return processFacultyQuery(query);
      case "admin":
        return processAdminQuery(query);
      default:
        return processStudentQuery(query);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Process the query and get bot response
    const botResponse = processQuery(input);

    // Simulate processing delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botResponse,
          timestamp: new Date(),
        },
      ]);
      setIsProcessing(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getRoleBadges = () => {
    switch (currentUser) {
      case "student":
        return [
          { text: "Marks in DSA", color: "bg-blue-100 text-blue-700" },
          { text: "My attendance", color: "bg-green-100 text-green-700" },
          { text: "Current CGPA", color: "bg-purple-100 text-purple-700" },
        ];
      case "faculty":
        return [
          { text: "My schedule", color: "bg-blue-100 text-blue-700" },
          { text: "Submit grades", color: "bg-green-100 text-green-700" },
          { text: "Class analytics", color: "bg-purple-100 text-purple-700" },
        ];
      case "admin":
        return [
          { text: "User management", color: "bg-blue-100 text-blue-700" },
          { text: "System reports", color: "bg-green-100 text-green-700" },
          { text: "Configuration", color: "bg-purple-100 text-purple-700" },
        ];
      default:
        return [];
    }
  };

  // Add this right before your return statement:
  if (!isReady) {
    return (
      <>
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <Button
                size="icon"
                className="relative z-10 rounded-full w-14 h-14 shadow-2xl bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border border-white/20 backdrop-blur-sm"
                onClick={() => setOpen(true)}
              >
                <MessageCircle size={24} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
  return (
    <>
      {/* Floating chat button */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="relative group">
              {/* Animated pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 to-purple-500"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.4, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <Button
                size="icon"
                className="relative z-10 rounded-full w-14 h-14 shadow-2xl bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border border-white/20 backdrop-blur-sm"
                onClick={() => setOpen(true)}
              >
                <MessageCircle size={24} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-linear-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    {currentUser === "student"
                      ? "Academic Assistant"
                      : currentUser === "faculty"
                      ? "Faculty Assistant"
                      : "Admin Assistant"}
                  </h3>
                  <p className="text-xs text-blue-100">
                    {transformUserData(actualUser, currentUser).name} •{" "}
                    {currentUser.charAt(0).toUpperCase() + currentUser.slice(1)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="text-white hover:bg-white/20 rounded-lg"
              >
                <X size={18} />
              </Button>
            </div>

            {/* Role Selector */}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-linear-to-b from-gray-50 to-white max-h-96">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 ${
                      msg.sender === "user"
                        ? "bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                        : "bg-white border border-gray-200 text-gray-700 rounded-bl-none shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {msg.sender === "bot" ? (
                        <Bot size={14} className="text-blue-500" />
                      ) : (
                        <MUser size={14} className="text-white" />
                      )}
                      <span className="text-xs opacity-70">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="whitespace-pre-line text-sm">
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-3 shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                      Thinking...
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-3 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      currentUser === "student"
                        ? "Ask about marks, attendance, CGPA..."
                        : currentUser === "faculty"
                        ? "Ask about schedules, students, grades..."
                        : "Ask about users, reports, system config..."
                    }
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-20"
                    disabled={isProcessing}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={isListening ? stopListening : startListening}
                      className={`h-8 w-8 rounded-lg ${
                        isListening
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {isListening ? <MicOff size={14} /> : <Mic size={14} />}
                    </Button>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={handleSend}
                  disabled={!input.trim() || isProcessing}
                  className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-4"
                >
                  <Send size={16} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {getRoleBadges().map((badge, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={`text-xs ${badge.color}`}
                  >
                    Try: &quot;{badge.text}&quot;
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

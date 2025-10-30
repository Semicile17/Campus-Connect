"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function VisitorChatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your campus assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const pathname = usePathname();

  // Show chatbot only on visitor pages
  const isVisitorPage = ["/", "/about", "/contact"].includes(pathname);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message. For detailed assistance, please contact the administration office or visit the campus help desk.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isVisitorPage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="absolute bottom-16 right-0 w-80 bg-white/95 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Campus Assistant</h3>
                  <p className="text-blue-200 text-xs">Online • Ready to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-slate-50 to-white">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.isUser
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-none"
                        : "bg-white/80 backdrop-blur-sm border border-gray-100 text-gray-700 rounded-bl-none shadow-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.isUser ? "text-blue-100" : "text-gray-400"}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/20 bg-white/50 backdrop-blur-sm">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl transition-all"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: open 
            ? "0 0 0px rgba(59,130,246,0)"
            : [
                "0 0 0px rgba(59,130,246,0.4)",
                "0 0 20px rgba(59,130,246,0.8)",
                "0 0 0px rgba(59,130,246,0.4)",
              ]
        }}
        transition={{
          duration: open ? 0.3 : 2,
          repeat: open ? 0 : Infinity,
        }}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg backdrop-blur-sm border transition-all duration-300 ${
          open 
            ? "bg-gradient-to-br from-slate-600 to-slate-700 border-white/20" 
            : "bg-gradient-to-br from-blue-500 to-cyan-500 border-white/30 hover:shadow-2xl"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={open ? "close" : "chat"}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
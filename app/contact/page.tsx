"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Clock, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "info@gbpiet.ac.in",
      subtitle: "Send us an email anytime",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: "+91 1346-257-999",
      subtitle: "Mon to Fri, 9AM to 5PM",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Campus",
      details: "Pauri Garhwal, Uttarakhand",
      subtitle: "Govind Ballabh Pant Institute",
    },
  ];

  return (
    <div className="flex h-screen bg-white font-sans">
      {/* Gradient Section */}
      {/* Hero Section with Background Carousel */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {/* Image 1 - College Campus */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/campus-building.jpg')" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0, 0, 1] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1],
            }}
          />
          {/* Image 2 - Library */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/labs.jpg')" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1],
            }}
          />
          {/* Image 3 - Laboratory */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/library.jpg')" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1],
            }}
          />
        </div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-indigo-900/80"></div>

        {/* Subtle animated background elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-200/10 rounded-full blur-lg"
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          <motion.div
            className="max-w-md text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1
              className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Get in Touch
            </motion.h1>

            <motion.p
              className="text-xl text-blue-100 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Reach out to us for any queries, support, or information about
              GBPIET
            </motion.p>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {/* Address */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
              >
                <div className="bg-white/20 p-3 rounded-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">
                    Visit Our Campus
                  </div>
                  <div className="text-blue-200 text-sm">
                    Govind Ballabh Pant Institute of Engineering & Technology
                    <br />
                    Ghurdauri, Pauri Garhwal
                    <br />
                    Uttarakhand - 246194
                  </div>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
              >
                <div className="bg-white/20 p-3 rounded-xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Call Us</div>
                  <div className="text-blue-200 text-sm">+91-1368-254321</div>
                  <div className="text-blue-300 text-xs">
                    Administration Office
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
              >
                <div className="bg-white/20 p-3 rounded-xl">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Email Us</div>
                  <div className="text-blue-200 text-sm">info@gbpiet.ac.in</div>
                  <div className="text-blue-300 text-xs">General Inquiries</div>
                </div>
              </motion.div>

              {/* Office Hours */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
              >
                <div className="bg-white/20 p-3 rounded-xl">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Office Hours</div>
                  <div className="text-blue-200 text-sm">
                    Monday - Friday: 9:00 AM - 5:00 PM
                  </div>
                  <div className="text-blue-300 text-xs">
                    Saturday: 9:00 AM - 1:00 PM
                  </div>
                </div>
              </motion.div>

              {/* Emergency Contact */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 }}
                className="flex items-start space-x-4 bg-yellow-500/20 backdrop-blur-sm rounded-2xl p-4 border border-yellow-400/30"
              >
                <div className="bg-yellow-500/30 p-3 rounded-xl">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">
                    Emergency Contact
                  </div>
                  <div className="text-yellow-200 text-sm">+91-1368-254300</div>
                  <div className="text-yellow-300 text-xs">
                    24/7 Campus Security
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Quick Response Notice */}
            <motion.div
              className="mt-8 p-4 bg-green-500/20 border border-green-500/30 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <p className="text-green-100 text-sm text-center">
                💬 We typically respond to all inquiries within 24 hours during
                working days
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
      </motion.div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="mx-auto w-20 h-20 bg-linear-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
              >
                <Mail className="w-10 h-10 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <CardTitle className="text-3xl font-bold bg-linear-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                  Contact Us
                </CardTitle>
                <p className="text-gray-600 mt-2 font-medium">
                  Send us your message
                </p>
              </motion.div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-linear-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

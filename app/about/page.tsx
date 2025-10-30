"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, Globe, Target, Award, Clock, Shield } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Digital Learning",
      description: "Interactive online classrooms, digital libraries, and e-learning resources accessible from anywhere on campus."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Smart Collaboration",
      description: "Seamless communication between students, faculty, and staff through integrated messaging and notification systems."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Connectivity",
      description: "Connect with international universities, attend virtual conferences, and access global educational resources."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal Tracking",
      description: "Monitor academic progress, set personal goals, and track achievements with intelligent analytics and insights."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Achievement Recognition",
      description: "Digital badges, certificates, and recognition systems to celebrate academic and extracurricular accomplishments."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Time Management",
      description: "Smart scheduling, automated reminders, and optimized timetables for efficient campus life management."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Access",
      description: "Advanced security protocols ensuring data protection and secure access to all campus resources and information."
    }
  ];

  const campusImages = [
    { src: "/images/campus-building.jpg", alt: "Main Campus Building", title: "Main Academic Block" },
    { src: "/images/library.jpg", alt: "Digital Library", title: "Smart Library" },
    { src: "/images/labs.jpg", alt: "Computer Labs", title: "Advanced Laboratories" },
    { src: "/images/sports.jpg", alt: "Sports Complex", title: "Sports Facilities" },
    { src: "/images/auditorium.jpg", alt: "Auditorium", title: "Main Auditorium" },
    { src: "/images/hostel.jpg", alt: "Student Hostels", title: "Student Accommodation" }
  ];

  const stats = [
    { number: "5000+", label: "Students Enrolled" },
    { number: "200+", label: "Expert Faculty" },
    { number: "50+", label: "Academic Programs" },
    { number: "25+", label: "Years of Excellence" }
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-blue-900 via-blue-700 to-cyan-600 bg-clip-text text-transparent"
            >
              About Smart Campus
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Transforming Education Through Innovative Digital Solutions at Govind Ballabh Pant Institute of Engineering & Technology
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 text-lg leading-relaxed"
            >
              <p className="text-gray-700 text-xl">
                <strong className="text-blue-800">Smart Campus</strong> represents a revolutionary approach to educational technology, creating an integrated digital ecosystem specifically designed for the prestigious{" "}
                <strong className="text-blue-800">Govind Ballabh Pant Institute of Engineering & Technology</strong>. This comprehensive platform bridges the gap between traditional education and modern technological demands.
              </p>
              
              <p className="text-gray-700">
                Our platform serves as the central nervous system of the campus, enabling seamless, real-time interaction between students, faculty members, administrative staff, and visitors. By leveraging cutting-edge technologies including cloud computing, IoT integration, and artificial intelligence, we&apos;ve created an environment where information flows effortlessly and efficiently.
              </p>

              <p className="text-gray-700">
                The system dramatically simplifies everyday campus operations—from comprehensive academic tracking and automated attendance management to intelligent resource allocation and streamlined visitor access protocols. Every aspect of campus life is integrated under one unified, intuitive platform that adapts to the unique needs of each user group.
              </p>

              <p className="text-gray-700">
                Our mission extends beyond mere digital transformation. We aim to make education management <strong>smarter, faster, and profoundly more connected</strong>, ensuring that technology serves as a true enhancer of both learning experiences and collaborative opportunities. We believe in creating an academic environment where technology empowers rather than complicates.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/">
                  <Button className="bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                    Explore Home
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Get In Touch
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    Access Portal
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {campusImages.slice(0, 4).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group overflow-hidden rounded-2xl shadow-lg"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-semibold text-sm">{image.title}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 bg-linear-to-r from-blue-600 to-cyan-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-blue-800 to-cyan-600 bg-clip-text text-transparent">
              Campus Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the comprehensive suite of tools and services that make our Smart Campus a leader in educational technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 px-6 md:px-20 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-6 text-blue-800">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To pioneer a fully connected, data-driven academic ecosystem where every student, educator, researcher, and visitor experiences unprecedented levels of innovation, accessibility, and personal growth through thoughtfully implemented technology. We envision a campus where digital and physical spaces merge seamlessly to create an environment of continuous learning and collaboration.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-linear-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-6 text-purple-800">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To continuously develop and implement innovative technological solutions that enhance educational outcomes, streamline administrative processes, and foster a collaborative campus community. We are committed to providing reliable, secure, and user-friendly digital tools that empower every member of our institution to achieve their full potential while maintaining the highest standards of academic excellence and operational efficiency.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-6 md:px-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-linear-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-white shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Smart Campus?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of students and faculty members who are already transforming their educational experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl"
                >
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
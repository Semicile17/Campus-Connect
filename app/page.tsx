/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);



  return (
    <main className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-linear-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-linear-to-r from-emerald-400/15 to-teal-400/15 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl w-full">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                Welcome to{" "}
                <span className="block mt-2 bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  GBPiet Smart Campus
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Experience a digital ecosystem connecting students, faculty, and
                visitors — designed for seamless learning, management, and
                collaboration at{" "}
                <span className="font-semibold text-cyan-300">
                  Govind Ballabh Pant Institute of Engineering & Technology
                </span>
                .
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/login" className="flex-1 max-w-xs">
                <Button 
                  size="lg" 
                  className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-6 rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="flex-1 max-w-xs border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-300 font-semibold py-6 rounded-2xl backdrop-blur-sm transition-all duration-300"
              >
                Explore Features
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { number: "5000+", label: "Students" },
                { number: "200+", label: "Faculty" },
                { number: "50+", label: "Programs" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-cyan-300">{stat.number}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image/Visual Content */}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="relative w-full max-w-2xl mx-auto"
>
  {/* Interactive Pie Chart Grid */}
  <div className="relative w-96 h-96 mx-auto">
    {[
      {
        id: 1,
        src: "/images/campus-building.jpg",
        alt: "Campus Infrastructure",
        title: "Campus Infrastructure",
        position: "top-0 left-0",
        gradient: "from-cyan-400 to-blue-500",
        rotation: "rotate-0"
      },
      {
        id: 2,
        src: "/images/digital-classrooms.jpg",
        alt: "Digital Classrooms",
        title: "Digital Learning",
        position: "top-0 right-0",
        gradient: "from-purple-400 to-pink-500",
        rotation: "rotate-90"
      },
      {
        id: 3,
        src: "/images/library.jpg",
        alt: "Smart Library",
        title: "Smart Library",
        position: "bottom-0 left-0",
        gradient: "from-orange-400 to-red-500",
        rotation: "rotate-180"
      },
      {
        id: 4,
        src: "/images/labs.jpg",
        alt: "Advanced Labs",
        title: "Research Labs",
        position: "bottom-0 right-0",
        gradient: "from-green-400 to-emerald-500",
        rotation: "rotate-270"
      },
      {
        id: 5,
        src: "/images/students.jpg",
        alt: "Student Life",
        title: "Student Community",
        position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        gradient: "from-yellow-400 to-amber-500",
        rotation: "rotate-45"
      }
    ].map((item, index) => (
      <motion.div
        key={item.id}
        className={`absolute w-44 h-44 rounded-2xl overflow-hidden cursor-pointer group ${item.position}`}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.5 + index * 0.1,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ 
          scale: 1.15,
          zIndex: 10,
          transition: { duration: 0.3 }
        }}
      >
        {/* Image Container */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
            <div className="text-white text-center w-full">
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-gray-200">Explore →</p>
            </div>
          </div>
        </div>

        {/* Animated Border Glow */}
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-100 -z-10`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    ))}

    {/* Central Logo/Icon */}
    {/* <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: 0.3,
        type: "spring",
        stiffness: 150
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl flex items-center justify-center shadow-2xl border border-white/10"
    >
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="text-white text-2xl"
      >
        🎓
      </motion.div>
    </motion.div> */}

    {/* Connecting Lines */}
    {/* <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <motion.line
        x1="50%"
        y1="50%"
        x2="25%"
        y2="25%"
        stroke="url(#gradient1)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      <motion.line
        x1="50%"
        y1="50%"
        x2="75%"
        y2="25%"
        stroke="url(#gradient2)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      />
      <motion.line
        x1="50%"
        y1="50%"
        x2="25%"
        y2="75%"
        stroke="url(#gradient3)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1.0 }}
      />
      <motion.line
        x1="50%"
        y1="50%"
        x2="75%"
        y2="75%"
        stroke="url(#gradient4)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
      />
      
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
        <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg> */}
  </div>

 
</motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Campus Ecosystem
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              A comprehensive digital platform designed to enhance the academic experience for everyone in the campus community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "For Students",
                desc: "Track your syllabus, attendance, and academic progress with real-time updates and personalized dashboards.",
                icon: "🎓",
                gradient: "from-cyan-500 to-blue-600",
                features: ["Attendance Tracking", "Grade Portal", "Course Materials"]
              },
              {
                title: "For Faculty",
                desc: "Manage courses, labs, and assignments efficiently with advanced digital tools and analytics.",
                icon: "👨‍🏫",
                gradient: "from-purple-500 to-pink-600",
                features: ["Course Management", "Student Analytics", "Resource Library"]
              },
              {
                title: "For Administration",
                desc: "Streamline campus operations with integrated management systems and real-time monitoring.",
                icon: "🏛️",
                gradient: "from-orange-500 to-red-600",
                features: ["Campus Analytics", "Resource Management", "Digital Records"]
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 p-8 hover:border-cyan-400/30 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <motion.div
                  className="text-6xl mb-6"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-blue-200 mb-6 leading-relaxed">{feature.desc}</p>
                
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="flex items-center text-cyan-300 text-sm"
                    >
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-20 px-6 md:px-20"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-linear-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl p-12 backdrop-blur-lg border border-cyan-400/20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Join the Digital Campus Revolution
            </h2>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Access smart solutions for students, faculty, and administration — all under one unified, intelligent portal.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link href="/login">
                <Button 
                  size="lg" 
                  className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-12 py-6 rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 text-lg"
                >
                  Get Started Now
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-blue-300">
            © 2024 GBPiet Smart Campus. Empowering education through technology.
          </p>
        </div>
      </footer>
    </main>
  );
}
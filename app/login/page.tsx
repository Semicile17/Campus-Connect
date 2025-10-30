/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleCaptchaChange = (token: string | null) => {
    setIsHuman(!!token);
  };

  const handleCaptchaError = () => {
    toast.error("CAPTCHA verification failed. Please try again.");
    setIsHuman(false);
  };

  const handleCaptchaExpire = () => {
    toast.info("CAPTCHA expired. Please verify again.");
    setIsHuman(false);
  };

  const resetCaptcha = () => {
    setIsHuman(false);
    recaptchaRef.current?.reset();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");

      return;
    }

    if (!isHuman) {
      toast.error("Please complete the CAPTCHA verification");

      return;
    }

    setLoading(true);

    toast.loading("Signing in...");

    try {
      const response = await axios.post(
        "/api/auth",
        { email, password },
        { withCredentials: true }
      );

      const data = response.data;

      // Store token in localStorage as backup
      if (data.token) {
        localStorage.setItem("auth_token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      }

      toast.success("Login successful! Redirecting...");

      // Redirect based on role
      setTimeout(() => {
        if (data.role === "admin") {
          window.location.href = "/dashboard/admin";
        } else if (data.role === "faculty") {
          window.location.href = "/dashboard/faculty";
        } else {
          window.location.href = "/dashboard/student/profile";
        }
      }, 1500);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Login failed";
      toast.error(errorMessage);

      resetCaptcha();
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  // Clear CAPTCHA when email/password changes
  useEffect(() => {
    if (email || password) {
      resetCaptcha();
    }
  }, [email, password]);

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
            style={{ backgroundImage: "url('/images/library.jpg')" }}
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
            style={{ backgroundImage: "url('/images/students.jpg')" }}
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
              className="text-4xl flex flex-col items-center font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              GBPIET
              <p className="text-[10px] p-1 w-fit bg-green-200 rounded-md text-gray-800 font-sans">
                Campus Connect
              </p>
            </motion.h1>

            <motion.div
              className="space-y-4 mb-8 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-white">For Students</p>
                  <p className="text-blue-100 text-sm">
                    Use your college email and password registered during
                    enrollment
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-white">
                    For Faculty & Staff
                  </p>
                  <p className="text-blue-100 text-sm">
                    Use your institutional credentials provided by the
                    administration
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Need Help?</p>
                  <p className="text-blue-100 text-sm">
                    Contact IT Support: itsupport@gbpiet.ac.in or visit Admin
                    Block
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="border-t border-white/20 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">1,500+</div>
                  <div className="text-blue-200 text-xs font-medium">
                    Active Students
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">120+</div>
                  <div className="text-blue-200 text-xs font-medium">
                    Faculty Members
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">99.2%</div>
                  <div className="text-blue-200 text-xs font-medium">
                    System Uptime
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Security Notice */}
            <motion.div
              className="mt-6 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <p className="text-yellow-100 text-xs text-center">
                🔒 Secure Login: Never share your credentials. Log out after
                each session.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
      </motion.div>

      {/* Login Form Section */}
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
                className="mx-auto w-20 h-20 bg-transparent flex items-center justify-center mb-4 "
              >
                <Image
                  src="/logo.png"
                  alt="GBPIET Logo"
                  width={70}
                  height={70}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <CardTitle className="text-3xl font-bold bg-linear-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                  Welcome Back
                </CardTitle>
                <p className="text-gray-600 mt-2 font-medium">
                  Sign in to your account
                </p>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-6">
              <AnimatePresence></AnimatePresence>

              <div className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Email Address
                  </label>
                  <Input
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Password
                  </label>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>

                {/* Google reCAPTCHA Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="bg-gray-50 p-5 rounded-xl border border-gray-200"
                >
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 block">
                      Security Verification
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Please verify you&apos;re not a robot
                    </p>

                    <div className="flex justify-center">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={
                          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                          "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        } // Default test key
                        onChange={handleCaptchaChange}
                        onErrored={handleCaptchaError}
                        onExpired={handleCaptchaExpire}
                        theme="light"
                        size="normal"
                      />
                    </div>

                    {isHuman && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-center text-green-600 text-sm font-medium"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Verification passed
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <Button
                  onClick={handleLogin}
                  disabled={loading || !isHuman}
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
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="text-center pt-4 border-t border-gray-200"
              >
                <p className="text-sm text-gray-600">
                  New here?{" "}
                  <span className="font-semibold text-blue-700 cursor-not-allowed opacity-80">
                    Contact Administration
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  This site is protected by reCAPTCHA and the Google
                  <a
                    href="https://policies.google.com/privacy"
                    className="text-blue-600 hover:text-blue-700 mx-1"
                  >
                    Privacy Policy
                  </a>
                  and
                  <a
                    href="https://policies.google.com/terms"
                    className="text-blue-600 hover:text-blue-700 ml-1"
                  >
                    Terms of Service
                  </a>
                  apply.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

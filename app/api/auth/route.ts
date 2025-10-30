// app/api/auth/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    // Check JWT secret first
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not configured");
      return NextResponse.json({ message: "Server configuration error" }, { status: 500 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    // Create token with proper payload
    const tokenPayload = { 
      id: user.id, 
      role: user.role,
      email: user.email
    };

    console.log("🔐 Creating token with payload:", tokenPayload);
    
    const token = jwt.sign(
      tokenPayload, 
      process.env.JWT_SECRET, 
      { 
        expiresIn: "1d",
        issuer: "your-app-name"
      }
    );

    console.log("✅ Token created successfully, length:", token.length);

    // Create response with cookie
    const response = NextResponse.json({ 
      success: true, 
      role: user.role,
      token: token // Also return in response for localStorage
    }, { status: 200 });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    console.log("🍪 Cookie set successfully");
    return response;

  } catch (error) {
    console.error("❌ Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
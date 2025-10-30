// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ 
    success: true,
    message: "Logged out successfully"
  });
  
  // Clear the token cookie with the same options used when setting it
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0, // Expire immediately
  });
  
  return response;
}

export async function GET() {
  return POST();
}
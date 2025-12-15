"use server";

import { logout } from "@/lib/api/auth";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await logout();

  const redirect = request.nextUrl.searchParams.get("redirect");
  if (redirect) {
    return NextResponse.redirect(
      new URL(redirect, process.env.NEXT_PUBLIC_APP_URL)
    );
  }

  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_APP_URL));
}

"use server";

import { logout } from "@/lib/api/auth";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let response: NextResponse;

  const redirect = request.nextUrl.searchParams.get("redirect");
  if (redirect) {
    response = NextResponse.redirect(
      new URL(redirect, process.env.NEXT_PUBLIC_APP_URL)
    );
  } else {
    response = NextResponse.redirect(
      new URL("/", process.env.NEXT_PUBLIC_APP_URL)
    );
  }

  await logout();

  return response;
}

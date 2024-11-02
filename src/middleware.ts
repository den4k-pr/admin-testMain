import { NextResponse } from "next/server";

export default async function middleware(req: any) {
  return NextResponse.next(); // Дозволити доступ до всіх сторінок
}

export const config = { matcher: ["/:path*"] };

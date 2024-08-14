import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");

  console.info("Middleware executado");
  if (!accessToken) {
    console.error("Não tem token");
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("Tem token");
  return NextResponse.next();
}

export const config = {
  matcher: ["/Home", "/outra-rota-protegida"],
};

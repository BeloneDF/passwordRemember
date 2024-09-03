"use client";
import { selectMethod } from "@/api/methods";
import { setCookie } from "nookies";

interface User {
  email: string;
  password: string;
}

export async function login(data: User) {
  try {
    const response = await selectMethod("post", "/login", {
      email: data.email,
      password: data.password,
    });

    if (response.status === 200) {
      setCookie(null, "access_token", response.data.acess_token, {
        maxAge: 30 * 24 * 60 * 60, // 30 dias
        path: "/",
        secure: false, // Apenas HTTPS
        httpOnly: false, // Visível para o client-side
        sameSite: "lax", // Proteção contra CSRF
      });
    }

    window.location.href = "/Home";
  } catch (error) {
    console.error(error);
  }
}

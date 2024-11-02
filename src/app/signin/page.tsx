"use client";

import { LoginForm } from "@/components/Login/loginForm";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/"); // Перенаправлення на профіль, якщо залогований
    }
  }, [session, router]);

  return (
    <div className="login">
      <LoginForm />
    </div>
  );
}

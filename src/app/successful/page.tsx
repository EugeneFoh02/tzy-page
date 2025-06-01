"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000); // 5000ms = 5 seconds

    return () => clearTimeout(timer); // Clean up on unmount
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-green-600 mb-4">✅ Registration Successful</h1>
      <p className="text-lg mb-6">Redirecting to the homepage in 5 seconds...</p>
      <a
        href="/"
        className="text-blue-600 underline hover:text-blue-800 transition"
      >
        Click here if not redirected
      </a>
    </div>
  );
}

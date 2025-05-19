"use client";

import React, { useEffect, useState } from "react";
import RegistrationForm from "./registration-form";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen mt-32 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            TZY JUNIOR CUP 2025 ENTRY FORM
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            WE ARE SEEKING FOR SPONSORSHIP
            <br />
            ANYONE WHO WANNA ADVERTISE OR PROMOTE
            <br />
            KINDLY CONTACT TO
            <br />
            TAN ZI LI (010 - 983 3810)
            <br />
            <span>
              Login as:{" "}
              {userEmail ? (
                <span className="text-blue-600 font-semibold">{userEmail}</span>
              ) : (
                <span className="text-gray-500">Not logged in</span>
              )}
            </span>
          </p>
        </div>
        <RegistrationForm />
      </div>
    </main>
  );
}

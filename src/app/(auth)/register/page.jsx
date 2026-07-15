"use client";

import { useEffect } from "react";
import Link from "next/link";

import {
  Building2,
  UserRound,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import "@/styles/App.css";
export default function RegisterChoice() {
    useEffect(() => {
    document.title = "Create Account | JoblyHub";
  }, []);
  return (
    <>
      <Navbar />

      <main className="auth-page">
        <div className="choice-wrap">
          <div className="auth-heading center">
            <span>Create account</span>

            <h1>
              How do you want to use JoblyHub?
            </h1>

            <p>
              Choose the account type that
              matches your purpose.
            </p>
          </div>

          <div className="choice-grid">
            <Link
              href="/register/employer"
              className="choice-card"
            >
              <Building2 size={34} />

              <h2>I am an Employer</h2>

              <p>
                Post jobs, manage listings,
                and review applications.
              </p>
            </Link>

            <Link
              href="/register/job-seeker"
              className="choice-card"
            >
              <UserRound size={34} />

              <h2>I am a Job Seeker</h2>

              <p>
                Find jobs, save
                opportunities, and apply to
                openings.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
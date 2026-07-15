"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

import Navbar from "@/components/Navbar";
import "@/styles/App.css";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://joblyhub-tc8k.onrender.com/api";

export default function Login() {
    useEffect(() => {
    document.title = "Login | JoblyHub";
  }, []);
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [otpCode, setOtpCode] = useState("");
  const [otpMode, setOtpMode] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const updateForm = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const redirectUser = (userData) => {
    switch (userData.role) {
      case "admin":
        router.replace("/admin/dashboard");
        break;

      case "employer":
        router.replace("/employer/dashboard");
        break;

      default:
        router.replace("/job-seeker/dashboard");
    }
  };

  const saveLogin = (userData) => {
    localStorage.setItem(
      "joblyhubToken",
      userData.token
    );

    localStorage.setItem(
      "joblyhubUser",
      JSON.stringify(userData)
    );

    redirectUser(userData);
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    setMessage("");

    if (
      !form.email ||
      !form.password
    ) {
      setMessage(
        "Please enter your email and password."
      );

      return;
    }

    try {
      setLoading(true);

      const { data } =
        await axios.post(
          `${API_URL}/auth/login`,
          form
        );

      if (data.requiresOtp) {
        setOtpMode(true);

        setMessage(
          data.message ||
            "Verification code sent to your email."
        );

        return;
      }

      saveLogin(data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const submitOtp = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!otpCode.trim()) {
      setMessage(
        "Please enter the verification code."
      );

      return;
    }

    try {
      setLoading(true);

      const { data } =
        await axios.post(
          `${API_URL}/auth/verify-login-otp`,
          {
            email: form.email,
            otpCode,
          }
        );

      saveLogin(data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Invalid or expired verification code."
      );
    } finally {
      setLoading(false);
    }
  };

  const backToLogin = () => {
    setOtpMode(false);
    setOtpCode("");
    setMessage("");
  };

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <div className="auth-card">
          <div className="auth-heading">
            <span>
              {otpMode
                ? "Security verification"
                : "Welcome back"}
            </span>

            <h1>
              {otpMode
                ? "Enter verification code"
                : "Login to JoblyHub"}
            </h1>

            <p>
              {otpMode
                ? "We sent a 6-digit verification code to your email."
                : "Access your dashboard and continue managing opportunities."}
            </p>
          </div>

          {message && (
            <p className="form-message">
              {message}
            </p>
          )}

          {!otpMode ? (
            <form
              className="auth-form"
              onSubmit={submitLogin}
            >
              <label>
                Email Address

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateForm}
                  placeholder="Enter your email"
                  required
                />
              </label>

              <label>
                Password

                <div className="password-field">
                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={form.password}
                    onChange={updateForm}
                    placeholder="Enter your password"
                    required
                  />

                  <button
                    type="button"
                    className="password-eye-btn"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </label>

              <div className="forgot-password-row">
                <Link href="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <button
                className="btn btn-primary auth-btn"
                disabled={loading}
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>
            </form>
          ) : (
            <form
              className="auth-form"
              onSubmit={submitOtp}
            >
              <label>
                Verification Code

                <input
                  value={otpCode}
                  onChange={(e) =>
                    setOtpCode(
                      e.target.value
                    )
                  }
                  placeholder="Enter 6-digit code"
                  inputMode="numeric"
                  maxLength={6}
                  required
                />
              </label>

              <button
                className="btn btn-primary auth-btn"
                disabled={loading}
              >
                {loading
                  ? "Verifying..."
                  : "Verify & Continue"}
              </button>

              <button
                type="button"
                className="btn btn-ghost auth-btn"
                onClick={backToLogin}
              >
                Back to login
              </button>
            </form>
          )}

          {!otpMode && (
            <p className="auth-switch">
              Don't have an account?{" "}
              <Link href="/register">
                Create account
              </Link>
            </p>
          )}
        </div>
      </main>
    </>
  );
}
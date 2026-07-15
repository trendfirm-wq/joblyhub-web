"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Bell } from "lucide-react";
import axios from "axios";

import logo from "../assets/Icon PNG background-01.png";

import "./Navbar.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://joblyhub-tc8k.onrender.com/api";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const [shrunk, setShrunk] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [pendingReviews, setPendingReviews] = useState(0);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setUser(
      JSON.parse(
        localStorage.getItem("joblyhubUser") || "null"
      )
    );

    setToken(
      localStorage.getItem("joblyhubToken") || ""
    );
  }, []);

  const dashboardPath =
    user?.role === "admin"
      ? "/admin/dashboard"
      : user?.role === "employer"
      ? "/employer/dashboard"
      : user?.role === "job_seeker"
      ? "/job-seeker/dashboard"
      : "/login";

  useEffect(() => {
    const handleScroll = () => {
      setShrunk(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (
        user?.role !== "admin" ||
        !token
      )
        return;

      try {
        const { data } = await axios.get(
          `${API_URL}/jobs/admin/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const count = data.filter(
          (job) =>
            job.status ===
            "pending_review"
        ).length;

        setPendingReviews(count);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotifications();
  }, [user, token]);

  const closeMenu = () => {
    setMenuOpen(false);
    setNotificationOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("joblyhubToken");

    localStorage.removeItem("joblyhubUser");

    setUser(null);

    closeMenu();

    router.replace("/login");
  };

  const isActive = (href) =>
    pathname === href;
    

  return (
    <header
      className={`navbar ${
        shrunk ? "navbar-shrunk" : ""
      }`}
    >
      <div className="container nav-inner">
        <Link
          href="/"
          className="logo"
          onClick={closeMenu}
        >
         <Image
  src="/images/logo.png"
  alt="JoblyHub"
  width={180}
  height={60}
  priority
  className="logo-img"
/>
        </Link>

        <button
          className="mobile-menu-btn"
          type="button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

        <div
          className={`nav-menu ${
            menuOpen ? "open" : ""
          }`}
        >
          <nav className="nav-links">
            <Link
              href="/"
              onClick={closeMenu}
              className={`nav-link ${
                pathname === "/"
                  ? "active"
                  : ""
              }`}
            >
              Home
            </Link>

            <Link
              href="/jobs"
              onClick={closeMenu}
              className={`nav-link ${
                pathname.startsWith("/jobs")
                  ? "active"
                  : ""
              }`}
            >
              Find Jobs
            </Link>
 

            <Link
              href="/help"
              onClick={closeMenu}
              className={`nav-link ${
                pathname === "/help"
                  ? "active"
                  : ""
              }`}
            >
              Help Center
            </Link>

            
          </nav>

          <div className="nav-actions">
            {user ? (
  <>
    {user.role === "admin" && (
      <div className="admin-notification-wrap">
        <button
          type="button"
          className="admin-bell-btn"
          onClick={() =>
            setNotificationOpen(!notificationOpen)
          }
        >
          <Bell size={18} />

          {pendingReviews > 0 && (
            <span className="admin-bell-count">
              {pendingReviews}
            </span>
          )}
        </button>

        {notificationOpen && (
          <div className="admin-notification-dropdown">
            <strong>
              Admin Notifications
            </strong>

            {pendingReviews > 0 ? (
              <>
                <p>
                  {pendingReviews} paid
                  job
                  {pendingReviews > 1
                    ? "s are "
                    : " is "}
                  waiting for review.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    closeMenu();

                    router.push(
                      "/admin/dashboard"
                    );
                  }}
                >
                  Review Jobs
                </button>
              </>
            ) : (
              <p>
                No new admin
                notifications.
              </p>
            )}
          </div>
        )}
      </div>
    )}

    <Link
      href={dashboardPath}
      onClick={closeMenu}
      className={`dashboard-btn ${
        pathname.startsWith(
          dashboardPath
        )
          ? "active-action"
          : ""
      }`}
    >
      Dashboard
    </Link>

    <button
      className="logout-btn"
      type="button"
      onClick={logout}
    >
      Logout
    </button>
  </>
) : (
  <>
                <Link
              href="/login"
              onClick={closeMenu}
              className={`login-btn ${
                pathname === "/login"
                  ? "active-action"
                  : ""
              }`}
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={closeMenu}
              className={`post-job-btn ${
                pathname.startsWith("/register")
                  ? "active-action"
                  : ""
              }`}
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </div>
  </div>
</header>
);
}
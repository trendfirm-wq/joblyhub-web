"use client";

import Link from "next/link";
import Image from "next/image";
import "@/styles/App.css";
import logo from "../assets/Icon PNG background-011.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <Image
              src={logo}
              alt="JoblyHub Logo"
              priority
            />
          </Link>

          <p>
            JoblyHub connects job seekers with real
            opportunities and helps employers find the
            right talent faster.
          </p>

          <div className="footer-socials">
            <a
              href="https://www.linkedin.com/in/joblyhub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="footer-social-icon"
            >
              in
            </a>

            <a
              href="https://www.facebook.com/share/1annNUs4rZ/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="footer-social-icon"
            >
              f
            </a>

            <a
              href="https://x.com/JoblyHub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="footer-social-icon"
            >
              X
            </a>

            <a
              href="https://whatsapp.com/channel/0029Vb7xkVm4tRrnkxs1UK2A"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="footer-social-icon"
            >
              ☎
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Platform</h4>

          <Link href="/">Home</Link>

          <Link href="/jobs">
            Jobs
          </Link>

          <Link href="/about">
            About JoblyHub
          </Link>

          <Link href="/contact">
            Contact
          </Link>

          <Link href="/updates">
            Updates
          </Link>
        </div>

        <div className="footer-col">
          <h4>Support</h4>

          <Link href="/help">
            Help Center
          </Link>

          <Link href="/safety">
            Safety & Fraud Alert
          </Link>

          <Link href="/commitment">
            Our Commitment
          </Link>

          <Link href="/how-it-works">
            How It Works
          </Link>
        </div>

        <div className="footer-col">
          <h4>Working Hours</h4>

          <div className="footer-hours-list">
            <div className="footer-hours-item">
              <span>Monday – Friday</span>

              <strong>
                8:00 AM – 6:00 PM
              </strong>
            </div>

            <div className="footer-hours-item">
              <span>Saturday</span>

              <strong>
                9:00 AM – 2:00 PM
              </strong>
            </div>

            <div className="footer-hours-item">
              <span>
                Sunday & Public Holidays
              </span>

              <strong>Closed</strong>
            </div>
          </div>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>

          <Link href="/privacy">
            Privacy Policy
          </Link>

          <Link href="/terms">
            Terms of Use
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} JoblyHub.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
"use client";

import Link from "next/link";
import {
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Briefcase,
} from "lucide-react";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "@/styles/App.css";

export default function PricingPage() {
  useEffect(() => {
    document.title = "Pricing | JoblyHub";
  }, []);
  return (
    <div className="site">
      <Navbar />

      <main className="pricing-page">
        <div className="container">

          <div className="pricing-hero">
            <span>JoblyHub Pricing</span>

            <h1>
              Simple & Transparent Pricing
            </h1>

            <p>
              Publish your vacancies and reach thousands of qualified job seekers across Ghana with one affordable payment.
            </p>
          </div>

          <div className="pricing-card">

            <div className="pricing-header">
              <CreditCard size={34} />
              <h2>Job Posting Fee</h2>
            </div>

            <table className="pricing-table">
              <tbody>

                <tr>
                  <td>Job Posting Fee</td>
                  <td>GHS 55.00</td>
                </tr>

                <tr>
                  <td>NHIL (2.5%)</td>
                  <td>GHS 1.38</td>
                </tr>

                <tr>
                  <td>GETFund Levy (2.5%)</td>
                  <td>GHS 1.38</td>
                </tr>

                <tr>
                  <td>VAT (15%)</td>
                  <td>GHS 8.25</td>
                </tr>

                <tr className="pricing-total">
                  <td>Total Amount Payable</td>
                  <td>GHS 66.01</td>
                </tr>

              </tbody>
            </table>

          </div>

          <div className="pricing-features">

            <h2>What's Included</h2>

            <div className="feature-grid">

              <div className="feature-item">
                <CheckCircle2 size={20} />
                Job published on JoblyHub
              </div>

              <div className="feature-item">
                <Briefcase size={20} />
                Employer dashboard access
              </div>

              <div className="feature-item">
                <CheckCircle2 size={20} />
                Applicant management
              </div>

              <div className="feature-item">
                <ShieldCheck size={20} />
                Secure online payment
              </div>

              <div className="feature-item">
                <CheckCircle2 size={20} />
                Admin review before publication
              </div>

              <div className="feature-item">
                <CheckCircle2 size={20} />
                Visible until application deadline
              </div>

            </div>

          </div>

          <div className="pricing-notice">

            <h2>Important Information</h2>

            <ul>

              <li>
                Every vacancy is reviewed before it becomes publicly visible.
              </li>

              <li>
                Payment does not guarantee approval. Jobs must comply with JoblyHub posting policies.
              </li>

              <li>
                All applicable Ghana taxes are already included in the total amount payable.
              </li>

              <li>
                Once approved, your job will remain active until the application deadline or until removed.
              </li>

            </ul>

          </div>

          <div className="pricing-actions">

            <Link
              href="/employer/post-job"
              className="btn btn-primary"
            >
            Back to Dashboard
            </Link>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
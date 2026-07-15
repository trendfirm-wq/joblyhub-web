"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
  useParams,
} from "next/navigation";
import axios from "axios";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "@/styles/App.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://joblyhub-tc8k.onrender.com/api";

export default function EmployerPaymentSuccess() {
  
  const [searchParams] = useSearchParams();

 const router = useRouter();

const [token, setToken] = useState("");

useEffect(() => {
  if (typeof window !== "undefined") {
    setToken(
      localStorage.getItem("joblyhubToken") || ""
    );
  }
}, []);

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const { reference: routeReference } = useParams();

  useEffect(() => {
  if (token) {
    verifyPayment();
  }
}, [token]);
  const verifyPayment = async () => {
    try {
    const reference =
  routeReference ||
  searchParams.get('clientReference') ||
  searchParams.get('reference') ||
  searchParams.get('trxref');

      if (!reference) {
        setMessage('Payment reference not found.');
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `${API_URL}/payments/job-post/status/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        res.data.paymentStatus === 'paid' &&
        res.data.jobStatus === 'pending_review'
      ) {
        setSuccess(true);
        setMessage(
          'Payment successful. Your job is now pending admin review.'
        );

        setTimeout(() => {
          router.push("/employer/dashboard");
        }, 4000);
      } else {
        setMessage(
          'Payment verification incomplete. Please contact support if payment was deducted.'
        );
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          'Failed to verify payment.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site">
      <Navbar />

      <main className="dashboard-page">
        <div className="container">
          <div className="auth-card dashboard-form-card">
            <h1>
              {loading
                ? 'Verifying Payment...'
                : success
                ? 'Payment Successful'
                : 'Payment Verification'}
            </h1>

            <p className={success ? 'success-text' : 'error-text'}>
              {message}
            </p>

            {!loading && (
              <div style={{ marginTop: '20px' }}>
               <Link
  href="/employer/dashboard"
  className="btn btn-primary"
>
                  Go to Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
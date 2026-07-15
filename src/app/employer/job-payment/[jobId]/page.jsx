"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "@/styles/App.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://joblyhub-tc8k.onrender.com/api";

 

export default function JobPaymentPage() {
 const { jobId } = useParams();
const router = useRouter();

const [token, setToken] = useState("");

useEffect(() => {
  if (typeof window !== "undefined") {
    setToken(
      localStorage.getItem("joblyhubToken") || ""
    );
  }
}, []);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

 const jobFee = 55.00;
const nhil = 1.38;
const getFund = 1.38;
const vat = 8.25;
const total = 66.01;

  const payNow = async () => {
    try {
      setLoading(true);
      setMessage('');

      const res = await axios.post(
        `${API_URL}/payments/hubtel/job-post/pay`,
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
        return;
      }

      setMessage('Payment link could not be created.');
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Failed to start payment.'
      );
    } finally {
      setLoading(false);
    }
  };
return (
  <div className="site">
    <Navbar />

    <main className="checkout-page">
      <div className="checkout-shell">
        <section className="checkout-main">
          <span className="checkout-badge">Secure Checkout</span>

         <h1>Complete Your Payment</h1>

<p>
  Your job draft has been prepared successfully. Complete your payment to submit your vacancy for review by the JoblyHub team.
</p>

          <div className="checkout-method">
           <strong>Accepted Payment Methods</strong>

<span>
MTN Mobile Money • Telecel Cash • AirtelTigo Money • Visa • Mastercard • Bank Transfer (Powered by Hubtel)
</span>
          </div>

          {message && <p className="form-message error-text">{message}</p>}

          <div className="checkout-actions">
            <button onClick={payNow} disabled={loading} className="checkout-pay-btn">
             {loading
  ? "Redirecting to Secure Payment..."
  : "Pay GHS 66.01"}
            </button>

            <button
              type="button"
             onClick={() => router.push("/employer/dashboard")}
              className="checkout-later-btn"
            >
              Pay Later
            </button>
          </div>
        </section>

        <aside className="checkout-summary">
         <h3>Payment Summary</h3>

<div className="summary-row">
  <span>Job Posting Fee</span>
  <strong>GHS 55.00</strong>
</div>

<div className="summary-row">
  <span>NHIL (2.5%)</span>
  <strong>GHS 1.38</strong>
</div>

<div className="summary-row">
  <span>GETFund Levy (2.5%)</span>
  <strong>GHS 1.38</strong>
</div>

<div className="summary-row">
  <span>VAT (15%)</span>
  <strong>GHS 8.25</strong>
</div>

<div className="summary-total">
  <span>Total Amount Payable</span>
  <strong>GHS 66.01</strong>
</div>

         <div className="checkout-note">

  <strong>What happens after payment?</strong>

  <ul>
    <li>Your payment will be securely processed by Hubtel.</li>
    <li>Your vacancy will be submitted to JoblyHub for review.</li>
    <li>Our team will review your posting within approximately 24 hours.</li>
    <li>Once approved, your job will be published and become visible to job seekers.</li>
  </ul>

</div>
        </aside>
      </div>
    </main>

    <Footer />
  </div>
);
}
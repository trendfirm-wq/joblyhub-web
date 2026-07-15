"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { XCircle } from "lucide-react";
import "@/styles/App.css";
export default function PaymentCancelled() {
  const { reference } = useParams();

  return (
    <main className="payment-status-page">
      <div className="payment-status-card">
        <XCircle
          size={70}
          color="#ef4444"
          style={{ marginBottom: 20 }}
        />

        <h1>Payment Cancelled</h1>

        <p>
          Your payment was cancelled before it
          was completed.
        </p>

        <p>
          Reference: <strong>{reference}</strong>
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: 30,
            flexWrap: "wrap",
          }}
        >
          <Link
  href={`/employer/job-payment/${reference}`}
  className="btn btn-primary"
>
  Try Again
</Link>

          <Link
            href="/employer/dashboard"
            className="btn btn-ghost"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
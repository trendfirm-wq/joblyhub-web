"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";

import {
  Briefcase,
  CheckCircle2,
  Clock3,
  PlusCircle,
  RefreshCcw,
  Users,
  XCircle,
} from "lucide-react";
import "@/styles/App.css";
import Navbar from "@/components/Navbar";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://joblyhub-tc8k.onrender.com/api";

export default function EmployerDashboard() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [message, setMessage] = useState("");

useEffect(() => {
  if (typeof window === "undefined") return;

  const savedToken =
    localStorage.getItem("joblyhubToken") || "";

  setToken(savedToken);

  if (savedToken) {
    fetchCurrentUser(savedToken);
  }
}, []);

  useEffect(() => {
    if (token) {
      fetchMyJobs();
    }
  }, [token]);
async function fetchCurrentUser(authToken) {
  try {
    const res = await axios.get(
      `${API_URL}/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    setUser(res.data);

    localStorage.setItem(
      "joblyhubUser",
      JSON.stringify(res.data)
    );
  } catch (error) {
    console.error(
      "Failed to refresh user:",
      error.response?.data || error.message
    );
  }
}
  async function fetchMyJobs() {
    try {
      setLoadingJobs(true);

      const res = await axios.get(
        `${API_URL}/jobs/my-jobs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(res.data);
      setMessage("");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to load your jobs. Please login again."
      );
    } finally {
      setLoadingJobs(false);
    }
  }

  async function retryPayment(jobId) {
    try {
      setMessage("");

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

      setMessage("Failed to start payment.");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to restart payment."
      );
    }
  }

  async function deleteJob(jobId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job? This cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs((prev) =>
        prev.filter((job) => job._id !== jobId)
      );
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to delete job."
      );
    }
  }

  const stats = useMemo(
    () => ({
      total: jobs.length,
      pendingPayment: jobs.filter(
        (job) => job.status === "pending_payment"
      ).length,
      pendingReview: jobs.filter(
        (job) => job.status === "pending_review"
      ).length,
      approved: jobs.filter(
        (job) => job.status === "approved"
      ).length,
      rejected: jobs.filter(
        (job) => job.status === "rejected"
      ).length,
    }),
    [jobs]
  );
const canPost =
  user.role === "employer" &&
  user.isEmployerVerified &&
  user.employerVerificationStatus === "verified";
  return (
    <div className="site">
      <Navbar />

      <main className="dashboard-page">
        <div className="container">
          <div className="dashboard-top employer-top">
            <div>
              <span>Employer Dashboard</span>

              <h1>
                Welcome, {user.name || "Employer"}
              </h1>

              <p>
                Post job opportunities, track
                approval status, and manage all your
                listings from one clean dashboard.
              </p>
{user.role === "employer" &&
  user.employerVerificationStatus === "pending" && (
    <div className="verification-notice pending">
      <strong>⏳ Employer Account Under Review</strong>

      <p>
        Thank you for registering your company on JoblyHub. Your employer
        account is currently being reviewed by our team.
      </p>

      <p>
        <strong>Estimated verification time:</strong> Within 24 hours
        during business days.
      </p>

      <p>
        You'll be able to post job vacancies immediately after your
        account has been approved. Thank you for your patience.
      </p>
    </div>
)}

 

{user.role === "employer" &&
  user.employerVerificationStatus === "rejected" && (
    <div className="verification-notice rejected">
      <strong>❌ Verification Unsuccessful</strong>

      <p>
        Unfortunately, we couldn't verify your employer account.
      </p>

      <p>
        {user.employerVerificationNote ||
          "Please contact the JoblyHub support team for assistance."}
      </p>
    </div>
)}
            </div>

      <div className="dashboard-actions">
  <button
    className="btn btn-ghost dash-action"
    onClick={fetchMyJobs}
  >
    <RefreshCcw size={18} />
    Refresh
  </button>

  <Link
    href="/pricing"
    className="btn btn-ghost dash-action"
  >
    Pricing
  </Link>

  <Link
    href="/employer/applications"
    className="btn btn-ghost dash-action"
  >
    <Users size={18} />
    Submissions
  </Link>

  {canPost ? (
    <Link
      href="/employer/post-job"
      className="btn btn-primary dash-action"
    >
      <PlusCircle size={18} />
      Post Job
    </Link>
  ) : (
    <button
      className="btn btn-primary dash-action"
      disabled
      title="Your employer account must be verified before you can post jobs."
    >
      <PlusCircle size={18} />
      Awaiting Verification
    </button>
  )}
</div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Briefcase size={22} />
              </div>

              <div>
                <strong>{stats.total}</strong>
                <span>Total Jobs</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon pending">
                <Clock3 size={22} />
              </div>

              <div>
                <strong>
                  {stats.pendingPayment}
                </strong>
                <span>Pending Payment</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon pending">
                <Clock3 size={22} />
              </div>

              <div>
                <strong>
                  {stats.pendingReview}
                </strong>
                <span>Pending Review</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon approved">
                <CheckCircle2 size={22} />
              </div>

              <div>
                <strong>{stats.approved}</strong>
                <span>Approved</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon rejected">
                <XCircle size={22} />
              </div>

              <div>
                <strong>{stats.rejected}</strong>
                <span>Rejected</span>
              </div>
            </div>
          </div>

          <section className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <span>My Listings</span>
                <h2>Posted Jobs</h2>
              </div>

              {canPost ? (
  <Link
    href="/employer/post-job"
    className="table-link"
  >
    New Job
  </Link>
) : (
  <span
    className="table-link disabled-link"
    title="Available after verification"
  >
    New Job
  </span>
)}
            </div>

            {message && (
              <p className="form-message error-text">
                {message}
              </p>
            )}

            {loadingJobs && (
              <p className="state-text">
                Loading your jobs...
              </p>
            )}

            {!loadingJobs &&
              !message &&
              jobs.length === 0 && (
              <div className="empty-state">
  {canPost ? (
    <>
      <h3>🎉 Employer Account Verified</h3>

      <p>
        Congratulations! Your employer account has been successfully
        verified by the JoblyHub team.
      </p>

      <p>
        You're now ready to publish your first job vacancy and start
        receiving applications from qualified candidates.
      </p>

      <Link
        href="/employer/post-job"
        className="btn btn-primary empty-btn"
      >
        🚀 Post Your First Job
      </Link>
    </>
  ) : (
    <>
      <h3>Employer Verification in Progress</h3>

      <p>
        Your employer account is currently under review. Once approved,
        you'll be able to post your first job vacancy.
      </p>
    </>
  )}
</div>
              )}

            {!loadingJobs &&
              !message &&
              jobs.length > 0 && (
                <div className="table-wrap">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Job</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Deadline</th>
                        <th>Date Posted</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {jobs.map((job) => (
                        <tr key={job._id}>
                          <td>
                            <strong>
                              {job.title}
                            </strong>

                            <small>
                              {job.location}
                            </small>
                          </td>

                          <td>
                            {job.category}
                          </td>

                          <td>
                            {job.jobType}
                          </td>

                          <td>
                            <span
                              className={`status-badge ${job.status}`}
                            >
                              {job.status}
                            </span>

                            {job.status ===
                              "rejected" &&
                              job.rejectionReason && (
                                <small className="rejection-note">
                                  {
                                    job.rejectionReason
                                  }
                                </small>
                              )}
                          </td>

                          <td>
                            {job.deadline
                              ? new Date(
                                  job.deadline
                                ).toLocaleDateString()
                              : "No deadline"}
                          </td>

                          <td>
                            {job.createdAt
                              ? new Date(
                                  job.createdAt
                                ).toLocaleDateString()
                              : "N/A"}
                          </td>

                          <td>
                            <div className="table-actions">
                              <Link
                                href={`/employer/edit-job/${job._id}`}
                                className="table-link"
                              >
                                Edit
                              </Link>

                              {(job.status ===
                                "pending_payment" ||
                                job.paymentStatus ===
                                  "failed") && (
                                <button
                                  className="table-link"
                                  onClick={() =>
                                    retryPayment(
                                      job._id
                                    )
                                  }
                                >
                                  Retry Payment
                                </button>
                              )}

                              <button
                                className="table-link danger-action"
                                onClick={() =>
                                  deleteJob(job._id)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </section>
        </div>
      </main>
    </div>
  );
}
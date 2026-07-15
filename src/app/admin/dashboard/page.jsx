"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Briefcase,
  CheckCircle2,
  Clock3,
  Eye,
  RefreshCcw,
  UserCheck,
  Users,
  Building2,
  X,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "@/styles/App.css";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://joblyhub-tc8k.onrender.com/api";

export default function AdminDashboard() {
 const [user, setUser] = useState({});
const [token, setToken] = useState("");

useEffect(() => {
  if (typeof window !== "undefined") {
    setUser(
      JSON.parse(
        localStorage.getItem("joblyhubUser") || "{}"
      )
    );

    setToken(
      localStorage.getItem("joblyhubToken") || ""
    );
  }
}, []);
  const [activeTab, setActiveTab] = useState('jobs');
const [jobFilter, setJobFilter] = useState('pending_review');
const [activityLogs, setActivityLogs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [userStats, setUserStats] = useState({


    totalUsers: 0,
    jobSeekers: 0,
    employers: 0,
    admins: 0,
  });

  const [loadingJobs, setLoadingJobs] = useState(true);
  const [message, setMessage] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [activityPage, setActivityPage] = useState(1);
const [activityTotalPages, setActivityTotalPages] = useState(1);
const [articles, setArticles] = useState([]);
const [loadingArticles, setLoadingArticles] = useState(false);

useEffect(() => {
  if (token) {
    fetchDashboardData();
  }
}, [token]);
  const fetchDashboardData = async () => {
   await Promise.all([
  fetchJobs(),
  fetchUserStats(),
  fetchEmployers(),
  fetchActivityLogs(),
  fetchArticles(),
]);
  };
const fetchArticles = async () => {
  try {
    setLoadingArticles(true);

    const res = await axios.get(`${API_URL}/articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setArticles(res.data);

  } catch (err) {
    console.log(err);
  } finally {
    setLoadingArticles(false);
  }
};
  const fetchUserStats = async () => {
    try {
     const res = await axios.get(`${API_URL}/users/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserStats({
        totalUsers: res.data.totalUsers || 0,
        jobSeekers: res.data.jobSeekers || 0,
        employers: res.data.employers || 0,
        admins: res.data.admins || 0,
      });
    } catch (error) {
      console.log('Failed to fetch user stats:', error.response?.data || error);
    }
  };
const fetchEmployers = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/auth/admin/employers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEmployers(res.data);
  } catch (error) {
    console.log(
      'Failed to fetch employers:',
      error.response?.data || error
    );
  }
};
const fetchActivityLogs = async (page = activityPage) => {
  try {
    const res = await axios.get(
      `${API_URL}/users/admin/activity-logs?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setActivityLogs(res.data.logs || []);
    setActivityPage(res.data.page || 1);
    setActivityTotalPages(res.data.totalPages || 1);
  } catch (error) {
    console.log('Failed to fetch activity logs:', error.response?.data || error);
  }
};
  const fetchJobs = async () => {
    try {
      setLoadingJobs(true);

      const res = await axios.get(`${API_URL}/jobs/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(res.data);
      setMessage('');
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          'Unable to load admin jobs. Please login again.'
      );
    } finally {
      setLoadingJobs(false);
    }
  };

  const approveJob = async (jobId) => {
    try {
     const job = jobs.find((item) => item._id === jobId);

const confirmRiskApproval =
  job?.requiresManualReview
    ? window.confirm(
        `This job has risk flags: ${job.riskFlags?.join(
          ', '
        )}. Are you sure you want to approve it?`
      )
    : true;

if (!confirmRiskApproval) return;

await axios.put(
  `${API_URL}/jobs/admin/${jobId}/approve`,
  {
    confirmRiskApproval: job?.requiresManualReview || false,
  },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedJob(null);
      fetchDashboardData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to approve job.');
    }
  };

  const rejectJob = async (jobId) => {
    const reason = window.prompt('Enter rejection reason:');

    if (reason === null) return;

    try {
      await axios.put(
        `${API_URL}/jobs/admin/${jobId}/reject`,
        {
          rejectionReason: reason || 'No reason provided',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedJob(null);
      fetchDashboardData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to reject job.');
    }
  };
const verifyEmployer = async (employerId) => {
  try {
    await axios.put(
      `${API_URL}/auth/admin/${employerId}/verify-employer`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchEmployers();
  } catch (error) {
    setMessage(
      error.response?.data?.message ||
        'Failed to verify employer.'
    );
  }
};
const rejectEmployer = async (employerId) => {
  const note = window.prompt(
    'Enter rejection reason for employer:'
  );

  if (note === null) return;

  try {
    await axios.put(
      `${API_URL}/auth/admin/${employerId}/reject-employer`,
      {
        note,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchEmployers();
  } catch (error) {
    setMessage(
      error.response?.data?.message ||
        'Failed to reject employer.'
    );
  }
};
  const deleteJob = async (jobId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this job? This cannot be undone.'
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedJob(null);
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to delete job.');
    }
  };
const stats = useMemo(() => {
  return {
    total: jobs.length,
    pendingPayment: jobs.filter((job) => job.status === 'pending_payment').length,
    pendingReview: jobs.filter((job) => job.status === 'pending_review').length,
    approved: jobs.filter((job) => job.status === 'approved').length,
    rejected: jobs.filter((job) => job.status === 'rejected').length,
    riskFlagged: jobs.filter((job) => job.requiresManualReview).length,
  };
}, [jobs]);
const filteredJobs = useMemo(() => {
  if (jobFilter === 'all') return jobs;

  return jobs.filter((job) => job.status === jobFilter);
}, [jobs, jobFilter]);
  const renderHtml = (html) => {
    return { __html: html || '<p>Not provided</p>' };
  };

  return (
    <div className="site">
      <Navbar />

      <main className="dashboard-page">
        <div className="container">
          <div className="dashboard-top admin-top">
            <div>
              <span>Admin Dashboard</span>
              <h1>
                Welcome, {user.role === 'admin' ? 'JoblyHub' : user.name || 'Admin'}
              </h1>
              <p>
                Review submitted jobs, approve or reject listings, and manage
                public job visibility.
              </p>
            </div>

           <button
  className="btn btn-ghost dash-action refresh-btn"
  onClick={fetchDashboardData}
>
  <RefreshCcw size={18} />
  Refresh
</button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Users size={22} />
              </div>
              <div>
                <strong>{userStats.totalUsers}</strong>
                <span>Total Users</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon approved">
                <UserCheck size={22} />
              </div>
              <div>
                <strong>{userStats.jobSeekers}</strong>
                <span>Job Seekers</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon pending">
                <Building2 size={22} />
              </div>
              <div>
                <strong>{userStats.employers}</strong>
                <span>Employers</span>
              </div>
            </div>

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
               <strong>{stats.pendingReview}</strong>
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

            <div className="stat-card">
              <div className="stat-icon">
                <Users size={22} />
              </div>
              <div>
                <strong>{userStats.admins}</strong>
                <span>Admins</span>
              </div>
            </div>
          </div>
          
<div className="admin-tabs">
  <button
    className={activeTab === 'jobs' ? 'active' : ''}
    onClick={() => setActiveTab('jobs')}
  >
    Job Review
  </button>

  <button
    className={activeTab === 'employers' ? 'active' : ''}
    onClick={() => setActiveTab('employers')}
  >
    Employers
  </button>
<button
  className={activeTab === 'articles' ? 'active' : ''}
  onClick={() => setActiveTab('articles')}
>
  Articles
</button>
  <button
    className={activeTab === 'overview' ? 'active' : ''}
    onClick={() => setActiveTab('overview')}
  >
    Overview
  </button>

  <button
    className={activeTab === 'logs' ? 'active' : ''}
    onClick={() => setActiveTab('logs')}
  >
    Security
  </button>
</div>
{activeTab === 'overview' && (
  <section className="dashboard-panel">
    <div className="panel-heading">
      <div>
        <span>Overview</span>
        <h2>System Summary</h2>
      </div>
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <strong>{userStats.totalUsers}</strong>
        <span>Total Users</span>
      </div>

      <div className="stat-card">
        <strong>{userStats.employers}</strong>
        <span>Employers</span>
      </div>

      <div className="stat-card">
        <strong>{userStats.jobSeekers}</strong>
        <span>Job Seekers</span>
      </div>

      <div className="stat-card">
        <strong>{stats.total}</strong>
        <span>Total Jobs</span>
      </div>

      <div className="stat-card">
     <strong>{stats.pendingReview}</strong>
<span>Pending Review</span>
      </div>

      <div className="stat-card">
      <strong>{stats.riskFlagged}</strong>
        <span>Risk-Flagged Jobs</span>
      </div>

      <div className="stat-card">
        <strong>{activityLogs.length}</strong>
        <span>Recent Security Logs</span>
      </div>

      <div className="stat-card">
        <strong>
          {
            employers.filter(
              (employer) => employer.isEmployerVerified
            ).length
          }
        </strong>
        <span>Verified Employers</span>
      </div>
    </div>
  </section>
)}
{activeTab === 'employers' && (
<section className="dashboard-panel">
  <div className="panel-heading">
    <div>
      <span>Employer Verification</span>
      <h2>Manage employers</h2>
    </div>
  </div>

  {employers.length === 0 ? (
    <div className="empty-state">
      <h3>No employers found</h3>
    </div>
  ) : (
    <div className="table-wrap">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employers.map((employer) => (
            <tr key={employer._id}>
              <td>
                <strong>
                  {employer.companyName || 'No company'}
                </strong>
              </td>

              <td>{employer.email}</td>

              <td>{employer.phone || 'No phone'}</td>

              <td>
                <span
                  className={`status-badge ${
                    employer.employerVerificationStatus ||
                    'not_submitted'
                  }`}
                >
                  {employer.employerVerificationStatus ||
                    'not_submitted'}
                </span>
              </td>

              <td>
                <div className="table-actions">
                  <button
                    className="table-link"
                    onClick={() =>
                      verifyEmployer(employer._id)
                    }
                    disabled={employer.isEmployerVerified}
                  >
                    Verify
                  </button>

                  <button
                    className="table-link muted-action"
                    onClick={() =>
                      rejectEmployer(employer._id)
                    }
                  >
                    Reject
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
)}
{activeTab === 'articles' && (
  <section className="dashboard-panel">

    <div className="panel-heading">

      <div>

        <span>Content</span>

        <h2>Articles</h2>

      </div>

      <Link
        href="/admin/articles/new"
        className="btn btn-primary"
      >
        + New Article
      </Link>

    </div>

    {loadingArticles ? (

      <p>Loading articles...</p>

    ) : articles.length === 0 ? (

      <div className="empty-state">

        <h3>No Articles Yet</h3>

        <p>
          Publish your first article.
        </p>

      </div>

    ) : (

      <div className="table-wrap">

        <table className="dashboard-table">

          <thead>

            <tr>

              <th>Title</th>

              <th>Category</th>

              <th>Status</th>

              <th>Views</th>

              <th>Published</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {articles.map(article => (

              <tr key={article._id}>

                <td>

                  <strong>{article.title}</strong>

                </td>

                <td>

                  {article.category}

                </td>

                <td>

                  <span
                    className={`status-badge ${article.status}`}
                  >
                    {article.status}
                  </span>

                </td>

                <td>

                  {article.views}

                </td>

                <td>

                  {article.publishedAt
                    ? new Date(
                        article.publishedAt
                      ).toLocaleDateString()
                    : '-'}

                </td>

                <td>

                  <Link
                    href={`/admin/articles/edit/${article._id}`}
                    className="table-link"
                  >
                    Edit
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    )}

  </section>
)}
{activeTab === 'jobs' && (
          <section className="dashboard-panel">
            <div className="job-review-filters">
  <button
    className={jobFilter === 'pending_review' ? 'active' : ''}
    onClick={() => setJobFilter('pending_review')}
  >
    Pending Review ({stats.pendingReview})
  </button>

  <button
    className={jobFilter === 'approved' ? 'active' : ''}
    onClick={() => setJobFilter('approved')}
  >
    Approved ({stats.approved})
  </button>

  <button
    className={jobFilter === 'rejected' ? 'active' : ''}
    onClick={() => setJobFilter('rejected')}
  >
    Rejected ({stats.rejected})
  </button>

  <button
    className={jobFilter === 'pending_payment' ? 'active' : ''}
    onClick={() => setJobFilter('pending_payment')}
  >
    Unpaid ({stats.pendingPayment})
  </button>

  <button
    className={jobFilter === 'all' ? 'active' : ''}
    onClick={() => setJobFilter('all')}
  >
    All ({stats.total})
  </button>
</div>  
            <div className="panel-heading">
              <div>
                <span>Job Review</span>
               <h2>
  {jobFilter === 'pending_review' && 'Jobs Pending Review'}
  {jobFilter === 'approved' && 'Approved Jobs'}
  {jobFilter === 'rejected' && 'Rejected Jobs'}
  {jobFilter === 'pending_payment' && 'Unpaid Jobs'}
  {jobFilter === 'all' && 'All Jobs'}
</h2>
              </div>
            </div>

            {message && <p className="form-message error-text">{message}</p>}

            {loadingJobs && <p className="state-text">Loading jobs...</p>}

            {!loadingJobs && !message && filteredJobs.length === 0 && (
              <div className="empty-state">
            <h3>No jobs in this section</h3>
<p>
  Jobs matching the selected filter will appear here.
</p>
              </div>
            )}

            {!loadingJobs && !message && jobs.length > 0 && (
              <div className="table-wrap">
                <table className="dashboard-table">
                  <thead>
                    <tr>
  <th>Job</th>
  <th>Employer</th>
  <th>Category</th>
  <th>Type</th>
  <th>Views</th>
  <th>Status</th>
<th>Risk</th>
<th>Date</th>
  <th>Actions</th>
</tr>
                  </thead>

                  <tbody>
                   {filteredJobs.map((job) => (
                      <tr key={job._id}>
                        <td>
                          <strong>{job.title}</strong>
                          <small>{job.location}</small>
                        </td>

                        <td>
                          <strong>{job.companyName}</strong>
                          <small>{job.employer?.email || 'No email'}</small>
                        </td>

                        <td>{job.category}</td>
                        <td>{job.jobType}</td>
                          <td>{job.views || 0}</td>
                       <td>
 <div className="status-stack">
  <span className={`status-badge ${job.status}`}>
    {job.status.replace('_', ' ')}
  </span>

  <span
    className={`status-badge payment-${job.paymentStatus}`}
  >
    {job.paymentStatus}
  </span>
</div>
</td>

<td>
  {job.requiresManualReview ? (
    <span className="status-badge rejected">
      Risk: {job.riskScore}
    </span>
  ) : (
    <span className="status-badge approved">
      Clear
    </span>
  )}

  {job.riskFlags?.length > 0 && (
    <small style={{ display: 'block', marginTop: '4px' }}>
      {job.riskFlags.join(', ')}
    </small>
  )}
</td>

<td>{new Date(job.createdAt).toLocaleDateString()}</td>

                        <td>
                          <div className="table-actions">
                            <button
                              className="table-link review-action"
                              onClick={() => setSelectedJob(job)}
                            >
                              <Eye size={14} />
                              Review
                            </button>

                            <Link
                             href={`/employer/edit-job/${job._id}`}
                              className="table-link muted-action"
                            >
                              Edit
                            </Link>

                           {job.status === 'pending_review' && (
  <button
    className="table-link"
    onClick={() => approveJob(job._id)}
  >
    Approve
  </button>
)}
                            {job.status !== 'approved' && (
  <button
    className="table-link muted-action"
    onClick={() => rejectJob(job._id)}
  >
    Reject
  </button>
)}

                            <button
                              className="table-link danger-action"
                              onClick={() => deleteJob(job._id)}
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
          )}
{activeTab === 'logs' && (
          <section className="dashboard-panel">
  <div className="panel-heading">
    <div>
      <span>Security Monitoring</span>
      <h2>Recent Activity Logs</h2>
    </div>
  </div>

  {activityLogs.length === 0 ? (
    <div className="empty-state">
      <h3>No activity logs found</h3>
    </div>
  ) : (
    <div className="table-wrap">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Action</th>
            <th>User</th>
            <th>Role</th>
            <th>IP Address</th>
            <th>Route</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {activityLogs.map((log) => (
            <tr key={log._id}>
              <td>
                <strong>{log.action}</strong>
              </td>

              <td>{log.email || 'Unknown'}</td>

              <td>{log.role || 'Unknown'}</td>

              <td>{log.ip || 'Unknown'}</td>

              <td>{log.route || 'N/A'}</td>

              <td>
                {new Date(log.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</section>
)}
{activeTab === 'logs' && (
  <div className="admin-pagination">
    <button
      type="button"
      disabled={activityPage <= 1}
      onClick={() => fetchActivityLogs(activityPage - 1)}
    >
      Previous
    </button>

    <span>
      Page {activityPage} of {activityTotalPages}
    </span>

    <button
      type="button"
      disabled={activityPage >= activityTotalPages}
      onClick={() => fetchActivityLogs(activityPage + 1)}
    >
      Next
    </button>
  </div>
)}
        </div>
      </main>

      {selectedJob && (
        <div className="admin-review-backdrop">
          <div className="admin-review-modal">
            <button
              type="button"
              className="admin-review-close"
              onClick={() => setSelectedJob(null)}
            >
              <X size={20} />
            </button>

            <div className="admin-review-header">
              <span>Job Review</span>
              <h2>{selectedJob.title}</h2>
              <p>
                Review the full job information before approving or rejecting
                this listing.
              </p>
            </div>

            <div className="admin-review-status-row">
              <span className={`status-badge ${selectedJob.status}`}>
                {selectedJob.status}
              </span>
              <small>
                Submitted on{' '}
                {new Date(selectedJob.createdAt).toLocaleDateString()}
              </small>
            </div>

            <div className="admin-review-grid">
              <div>
                <span>Company</span>
                <strong>{selectedJob.companyName || 'Not provided'}</strong>
              </div>

              <div>
                <span>Employer Email</span>
                <strong>{selectedJob.employer?.email || 'Not provided'}</strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{selectedJob.category || 'Not provided'}</strong>
              </div>

              <div>
                <span>Type</span>
                <strong>{selectedJob.jobType || 'Not provided'}</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>{selectedJob.location || 'Not provided'}</strong>
              </div>

              <div>
                <span>Salary / Budget</span>
                <strong>{selectedJob.salary || 'Not provided'}</strong>
              </div>

              <div>
                <span>Industry</span>
                <strong>{selectedJob.industry || 'Not provided'}</strong>
              </div>

              <div>
                <span>Deadline</span>
                <strong>
                  {selectedJob.deadline
                    ? new Date(selectedJob.deadline).toLocaleDateString()
                    : 'Not provided'}
                </strong>
              </div>

              <div>
  <span>Views</span>
  <strong>{selectedJob.views || 0}</strong>
</div>
            </div>
{selectedJob.requiresManualReview && (
  <div className="admin-review-section danger">
    <h3>Risk Warning</h3>

    <p>
      This job contains suspicious keywords and should be reviewed carefully before approval.
    </p>

    <p>
      <strong>Flags:</strong>{' '}
      {selectedJob.riskFlags?.join(', ')}
    </p>
  </div>
)}
            <div className="admin-review-section">
              <h3>Business Description</h3>
              <div
                className="admin-review-html"
                dangerouslySetInnerHTML={renderHtml(
                  selectedJob.companyDescription
                )}
              />
            </div>

            <div className="admin-review-section">
              <h3>Job Description</h3>
              <div
                className="admin-review-html"
                dangerouslySetInnerHTML={renderHtml(selectedJob.description)}
              />
            </div>

            <div className="admin-review-section">
              <h3>Responsibilities / What is needed</h3>
              <div
                className="admin-review-html"
                dangerouslySetInnerHTML={renderHtml(
                  selectedJob.responsibilities
                )}
              />
            </div>

            <div className="admin-review-section">
              <h3>Requirements</h3>
              <div
                className="admin-review-html"
                dangerouslySetInnerHTML={renderHtml(selectedJob.requirements)}
              />
            </div>

            <div className="admin-review-section">
              <h3>How users should respond</h3>

              <div className="admin-review-grid compact">
                <div>
                  <span>Method</span>
                  <strong>{selectedJob.applicationMethod}</strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>{selectedJob.applicationEmail || 'Not provided'}</strong>
                </div>

                <div>
                  <span>Link</span>
                  <strong>{selectedJob.applicationLink || 'Not provided'}</strong>
                </div>
              </div>

              <div
                className="admin-review-html"
                dangerouslySetInnerHTML={renderHtml(
                  selectedJob.applicationInstructions
                )}
              />
            </div>

            <div className="admin-review-section">
              <h3>Contact Details</h3>

              <div className="admin-review-grid compact">
                <div>
                  <span>Name</span>
                  <strong>{selectedJob.contactName || 'Not provided'}</strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>{selectedJob.contactEmail || 'Not provided'}</strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>{selectedJob.contactPhone || 'Not provided'}</strong>
                </div>
              </div>
            </div>

            {selectedJob.rejectionReason && (
              <div className="admin-review-section danger">
                <h3>Rejection Reason</h3>
                <p>{selectedJob.rejectionReason}</p>
              </div>
            )}

            <div className="admin-review-actions">
              <Link
                href={`/employer/edit-job/${selectedJob._id}`}
                className="admin-review-secondary"
              >
                Edit Job
              </Link>

            {selectedJob.status !== 'approved' && (
  <button
    type="button"
    className="admin-review-danger"
    onClick={() => rejectJob(selectedJob._id)}
  >
    Reject
  </button>
)}

{selectedJob.status === 'pending_review' && (
  <button
    type="button"
    className="admin-review-primary"
    onClick={() => approveJob(selectedJob._id)}
  >
    Approve Job
  </button>
)}
            </div>

          </div>

        </div>

      )}

      <Footer />
    </div>
  );
}
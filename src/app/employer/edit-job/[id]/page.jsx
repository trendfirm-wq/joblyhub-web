"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RichTextEditor from "@/components/RichTextEditor";

import "@/styles/App.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://joblyhub-tc8k.onrender.com/api";

const categories = [
  'Agriculture & Farming',
  'Business & Administration',
  'Construction & Real Estate',
  'Creative & Design',
  'Customer Service & Support',
  'Education & Training',
  'Engineering & Technical',
  'Finance & Accounting',
  'Healthcare & Medical',
  'Hospitality & Tourism',
  'Human Resources & Recruitment',
  'Legal & Compliance',
  'Media & Communications',
  'Project Management',
  'Sales & Marketing',
  'Security Services',
  'Skilled Trades & Artisans',
  'Technology & IT',
  'Transport & Logistics',
  'General & Other Jobs',
];

const industries = [
  'Accounting & Audit',
  'Agriculture & Agribusiness',
  'Automotive Industry',
  'Banking & Financial Services',
  'Construction & Infrastructure',
  'Consulting & Professional Services',
  'Education & Training',
  'Energy & Utilities (Oil, Gas, Power)',
  'Environmental & Waste Management',
  'Government & Public Sector',
  'Healthcare & Pharmaceuticals',
  'Hospitality & Tourism',
  'Human Resources Services',
  'Import & Export / Trading',
  'Insurance',
  'Legal Services',
  'Manufacturing & Production',
  'Marketing & Advertising',
  'Media & Entertainment',
  'Mining & Natural Resources',
  'NGO & Non-Profit',
  'Real Estate & Property',
  'Research & Development',
  'Retail & E-commerce',
  'Security Services',
  'Technology & Software',
  'Telecommunications',
  'Transportation & Logistics',
  'Wholesale & Distribution',
  'Other Industries',
];

const jobTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Remote',
  'Hybrid',
];

export default function EmployerEditJob() {
  useEffect(() => {
  document.title = "Edit Job | JoblyHub";
}, []);
  const { id } = useParams();
const router = useRouter();

const [token, setToken] = useState("");
const [currentUser, setCurrentUser] = useState({});

useEffect(() => {
  if (typeof window !== "undefined") {
    setToken(localStorage.getItem("joblyhubToken") || "");
    setCurrentUser(
      JSON.parse(localStorage.getItem("joblyhubUser") || "{}")
    );
  }
}, []);
  const [form, setForm] = useState({
    title: '',
    category: '',
    location: '',
    jobType: '',
    salary: '',
    deadline: '',

    companyName: '',
    industry: '',
    companyWebsite: '',
    companyDescription: '',

    description: '',
    responsibilities: '',
    requirements: '',
    additionalInformation: '',

    applicationMethod: 'email',
    applicationEmail: '',
    applicationLink: '',
    applicationInstructions: '',

    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  const [loadingJob, setLoadingJob] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [jobStatus, setJobStatus] = useState("");
  const [isDirty, setIsDirty] = useState(false);
 useEffect(() => {
  if (id && token) {
    fetchJob();
  }
}, [id, token]);

  const formatDateForInput = (dateValue) => {
    if (!dateValue) return '';
    return new Date(dateValue).toISOString().split('T')[0];
  };

  const normalizeApplicationMethod = (method) => {
    if (method === 'link') return 'website';
    if (method === 'platform') return 'joblyhub';
    return method || 'email';
  };

  const normalizeCategory = (category) => {
    if (categories.includes(category)) return category;

    const oldCategoryMap = {
      'Business, Administration & Customer Service':
        'Business & Administration',
      'Skilled Trades': 'Skilled Trades & Artisans',
      'Hospitality, Travel & Services': 'Hospitality & Tourism',
      'NGO & Development': 'General & Other Jobs',
    };

    return oldCategoryMap[category] || '';
  };

  const normalizeIndustry = (industry) => {
    if (industries.includes(industry)) return industry;
    return '';
  };

  const fetchJob = async () => {
    try {
      setLoadingJob(true);

      const res = await axios.get(`${API_URL}/jobs/employer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForm({
        title: res.data.title || '',
        category: normalizeCategory(res.data.category),
        location: res.data.location || '',
        jobType: res.data.jobType || '',
        salary: res.data.salary || '',
        deadline: formatDateForInput(res.data.deadline),

        companyName: res.data.companyName || '',
        industry: normalizeIndustry(res.data.industry),
        companyWebsite: res.data.companyWebsite || '',
        companyDescription: res.data.companyDescription || '',

        description: res.data.description || '',
        responsibilities: res.data.responsibilities || '',
        requirements: res.data.requirements || '',
        additionalInformation: res.data.additionalInformation || '',

        applicationMethod: normalizeApplicationMethod(
          res.data.applicationMethod
        ),
        applicationEmail: res.data.applicationEmail || '',
        applicationLink: res.data.applicationLink || '',
        applicationInstructions: res.data.applicationInstructions || '',

        contactName: res.data.contactName || '',
        contactEmail: res.data.contactEmail || '',
        contactPhone: res.data.contactPhone || '',
      });
      setJobStatus(res.data.status);
      setMessage('');
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          'Unable to load this job. Please check your access and try again.'
      );
    } finally {
      setLoadingJob(false);
    }
  };

  const updateForm = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));

  setIsDirty(true);
};
const updateRichText = (field, html) => {
  setForm((prev) => ({
    ...prev,
    [field]: html,
  }));

  setIsDirty(true);
};
const autoSaveDraft = async () => {
  if (!isDirty || jobStatus !== "draft" || !token) return;

  try {
    await axios.put(
      `${API_URL}/jobs/${id}`,
      {
        ...form,
        saveAsDraft: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setIsDirty(false);
  } catch (error) {
    console.error("Auto-save failed", error);
  }
};
useEffect(() => {
  if (jobStatus !== "draft") return;

  const interval = setInterval(() => {
    autoSaveDraft();
  }, 30000);

  return () => clearInterval(interval);
}, [form, isDirty, jobStatus]);
useEffect(() => {
  if (jobStatus !== "draft") return;

  const handleBeforeUnload = () => {
    autoSaveDraft();
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, [form, isDirty, jobStatus]);
  const validateForm = () => {
    if (
      !form.title.trim() ||
      !form.category ||
      !form.location.trim() ||
      !form.jobType ||
      !form.companyName.trim() ||
      !form.description.trim() ||
      !form.applicationMethod
    ) {
      setMessage(
        'Please provide title, category, location, job type, company name, job description and application method.'
      );
      return false;
    }

    if (form.applicationMethod === 'email' && !form.applicationEmail.trim()) {
      setMessage('Application email is required.');
      return false;
    }

    if (form.applicationMethod === 'website' && !form.applicationLink.trim()) {
      setMessage('Application website link is required.');
      return false;
    }

    return true;
  };

  const updateJob = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!token) {
      setMessage('Please login again before editing this job.');
      return;
    }

    if (!validateForm()) return;

    try {
      setLoading(true);

  const res = await axios.put(
  `${API_URL}/jobs/${id}`,
  {
    ...form,
    saveAsDraft: false,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
 const updatedJob = res.data.job;

if (updatedJob.status === "pending_payment") {
  router.push(`/employer/job-payment/${updatedJob._id}`);
  return;
}

if (currentUser.role === "admin") {
  router.push("/admin/dashboard");
} else {
  router.push("/employer/dashboard");
}

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          'Failed to update job. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };


const saveDraft = async () => {
  setMessage("");

  if (!token) {
    setMessage("Please login again.");
    return;
  }

  try {
    setLoading(true);

   const res = await axios.put(
  `${API_URL}/jobs/${id}`,
  {
    ...form,
    saveAsDraft: true,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
     setIsDirty(false);
    setMessage("Draft saved successfully.");
    return true;
  } catch (error) {
    setMessage(
      error.response?.data?.message ||
      "Failed to save draft."
    );
    return false;
  } finally {
    setLoading(false);
  }
};
const handleBackToDashboard = async () => {
  if (jobStatus === "draft" && isDirty) {
    const saved = await saveDraft();

    if (!saved) {
      return;
    }
  }

  router.push(backPath);
};
useEffect(() => {
  const handleBeforeUnload = (e) => {
    if (jobStatus === "draft" && isDirty) {
      e.preventDefault();
      e.returnValue = "";
    }
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, [jobStatus, isDirty]);
  const backPath =
    currentUser.role === 'admin' ? '/admin/dashboard' : '/employer/dashboard';

  if (loadingJob) {
    return (
      <div className="site">
        <Navbar />

        <main className="dashboard-page">
          <div className="container">
            <p className="state-text">Loading job details...</p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="site">
      <Navbar />

      <main className="dashboard-page">
        <div className="container">
          <div className="dashboard-top">
            <div>
              <span>{currentUser.role === 'admin' ? 'Admin' : 'Employer'}</span>
              <h1>
  {jobStatus === "draft"
    ? "Continue Draft"
    : "Edit Job"}
</h1>
            <p>
  {jobStatus === "draft"
    ? "Continue working on your draft. Your job hasn't been submitted for payment or review yet."
    : jobStatus === "approved"
    ? "Update your job details. Editing an approved job will send it back for admin review."
    : jobStatus === "rejected"
    ? "Update your job and resubmit it for approval."
    : "Update your job details."}
</p>
            </div>

         <button
  type="button"
  className="btn btn-ghost"
  onClick={handleBackToDashboard}
>
  Back to Dashboard
</button>
          </div>

          <div className="auth-card wide-card dashboard-form-card">
            {message && <p className="form-message error-text">{message}</p>}
            {jobStatus === "draft" && (
  <div className="verification-notice pending">
    <strong>📝 Draft Job</strong>

    <p>
      This job is currently saved as a draft.
      It is not visible to job seekers, has not been submitted
      for payment, and is not awaiting admin review.
    </p>
  </div>
)}
            <form className="auth-form" onSubmit={updateJob}>
              <div className="form-section-title">1. Basic Job Information</div>

              <label>
                Job Title
                <input
                  name="title"
                  value={form.title}
                  onChange={updateForm}
                  required
                />
              </label>

              <div className="form-grid two">
                <label>
                  Category
                  <select
                    name="category"
                    value={form.category}
                    onChange={updateForm}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option value={cat} key={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Job Type
                  <select
                    name="jobType"
                    value={form.jobType}
                    onChange={updateForm}
                    required
                  >
                    <option value="">Select job type</option>
                    {jobTypes.map((type) => (
                      <option value={type} key={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="form-grid two">
                <label>
                  Location
                  <input
                    name="location"
                    value={form.location}
                    onChange={updateForm}
                    required
                  />
                </label>

                <label>
                  Salary
                  <input
                    name="salary"
                    value={form.salary}
                    onChange={updateForm}
                    placeholder="e.g. GHS 1,500 or Negotiable"
                  />
                </label>
              </div>

              <label>
                Deadline
                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={updateForm}
                />
              </label>

              <div className="form-section-title">2. Company Information</div>

              <div className="form-grid two">
                <label>
                  Company Name
                  <input
                    name="companyName"
                    value={form.companyName}
                    onChange={updateForm}
                    required
                  />
                </label>

                <label>
                  Industry
                  <select
                    name="industry"
                    value={form.industry}
                    onChange={updateForm}
                  >
                    <option value="">Select industry</option>
                    {industries.map((industry) => (
                      <option value={industry} key={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                Company Website
                <input
                  name="companyWebsite"
                  value={form.companyWebsite}
                  onChange={updateForm}
                  placeholder="https://example.com"
                />
              </label>

              <label>
                Company Description
                <RichTextEditor
                  value={form.companyDescription}
                  onChange={(html) => updateRichText('companyDescription', html)}
                  placeholder="Describe the company"
                />
              </label>

              <div className="form-section-title">3. Job Details</div>

              <label>
                Job Description
                <RichTextEditor
                  value={form.description}
                  onChange={(html) => updateRichText('description', html)}
                  placeholder="Describe the job clearly"
                />
              </label>

              <label>
                Responsibilities
                <RichTextEditor
                  value={form.responsibilities}
                  onChange={(html) => updateRichText('responsibilities', html)}
                  placeholder="List the main responsibilities"
                />
              </label>

              <label>
                Requirements
                <RichTextEditor
                  value={form.requirements}
                  onChange={(html) => updateRichText('requirements', html)}
                  placeholder="List the requirements"
                />
              </label>

              <label>
                Application Instructions
                <RichTextEditor
                  value={form.applicationInstructions}
                  onChange={(html) =>
                    updateRichText('applicationInstructions', html)
                  }
                  placeholder="Tell applicants how to apply"
                />
              </label>

              <label>
                Additional Information
                <RichTextEditor
                  value={form.additionalInformation}
                  onChange={(html) =>
                    updateRichText('additionalInformation', html)
                  }
                  placeholder="Add benefits, working hours, interview notes, or other useful details"
                />
              </label>

              <div className="form-section-title">4. How to Apply</div>

              <label>
                Application Method
                <select
                  name="applicationMethod"
                  value={form.applicationMethod}
                  onChange={updateForm}
                  required
                >
                  <option value="email">Email</option>
                  <option value="website">Website</option>
                  <option value="joblyhub">Through JoblyHub</option>
                </select>
              </label>

              {form.applicationMethod === 'email' && (
                <label>
                  Application Email
                  <input
                    type="email"
                    name="applicationEmail"
                    value={form.applicationEmail}
                    onChange={updateForm}
                    required
                  />
                </label>
              )}

              {form.applicationMethod === 'website' && (
                <label>
                  Application Website
                  <input
                    name="applicationLink"
                    value={form.applicationLink}
                    onChange={updateForm}
                    required
                    placeholder="https://example.com/apply"
                  />
                </label>
              )}

              {form.applicationMethod === 'joblyhub' && (
                <div className="joblyhub-apply-note">
                  <strong>Through JoblyHub</strong>
                  <p>
                    Job seekers will apply directly on JoblyHub by entering
                    their full name, email, and uploading their cover letter,
                    CV, or resume as one PDF document.
                  </p>
                </div>
              )}

              <div className="form-section-title">
                5. Employer Contact Details
              </div>

              <div className="form-grid two">
                <label>
                  Contact Name
                  <input
                    name="contactName"
                    value={form.contactName}
                    onChange={updateForm}
                  />
                </label>

                <label>
                  Contact Email
                  <input
                    type="email"
                    name="contactEmail"
                    value={form.contactEmail}
                    onChange={updateForm}
                  />
                </label>
              </div>

              <label>
                Contact Phone
                <input
                  name="contactPhone"
                  value={form.contactPhone}
                  onChange={updateForm}
                />
              </label>

            <div className="form-actions">

  {jobStatus === "draft" ? (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={saveDraft}
        disabled={loading}
      >
        💾 Save Draft
      </button>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >
        Submit Job for Review
      </button>
    </>
  ) : (
    <button
      type="submit"
      className="btn btn-primary auth-btn"
      disabled={loading}
    >
      {loading
        ? "Updating Job..."
        : jobStatus === "approved"
        ? "Update Job"
        : jobStatus === "rejected"
        ? "Resubmit for Review"
        : jobStatus === "pending_review"
        ? "Update Job"
        : jobStatus === "pending_payment"
        ? "Continue to Payment"
        : "Update Job"}
    </button>
  )}

</div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
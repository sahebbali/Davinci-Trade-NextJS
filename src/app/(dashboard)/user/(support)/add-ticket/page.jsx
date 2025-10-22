"use client";

import { createSupportTicket } from "@/lib/actions/support.action";
import { useState } from "react";
import { FaRegCheckCircle, FaHourglassEnd } from "react-icons/fa";
export default function AddSupportTicket() {
  const [formData, setFormData] = useState({
    subject: "",
    category: "General",
    priority: "medium",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const ReSetForm = () => {
    setFormData({
      subject: "",
      category: "General",
      priority: "medium",
      description: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    // Call the server action
    const res = await createSupportTicket({
      purpose: formData.category,
      question: formData.description,
      fullName: "Saheb Bali", // you can replace this dynamically
      email: "saheb@example.com", // from user context or auth
      userId: "USER123", // optional: from session
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    });

    setLoading(false);

    if (res.success) {
      alert("Support ticket submitted successfully!");
      setFormData({ subject: "", category: "", description: "", priority: "" });
    } else {
      alert("Failed to submit ticket: " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Support Ticket
          </h1>
          <p className="text-gray-600">
            Submit your issue and we'll get back to you soon
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {submitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <FaRegCheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Ticket Submitted!
              </h2>
              <p className="text-gray-600">
                Your support ticket has been created successfully. We'll respond
                within 24 hours.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Brief description of your issue"
                />
              </div>

              {/* Category and Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option>General</option>
                    <option>Technical</option>
                    <option>Billing</option>
                    <option>Account</option>
                    <option>Commission</option>
                    <option>Registration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Priority *
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Please provide detailed information about your issue..."
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <FaHourglassEnd className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaHourglassEnd className="w-5 h-5" />
                    Submit Ticket
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• High Priority: Within 4 hours</p>
            <p>• Medium Priority: Within 24 hours</p>
            <p>• Low Priority: Within 48 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}

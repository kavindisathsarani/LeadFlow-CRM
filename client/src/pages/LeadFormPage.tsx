// import { useEffect, useState } from "react";
// import type { FormEvent } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { createLead, getLeadById, updateLead } from "../services/leadService";
// import type { LeadStatus } from "../types";

// const statuses: LeadStatus[] = ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"];

// const emptyForm = {
//   name: "",
//   company: "",
//   email: "",
//   phone: "",
//   source: "",
//   salesperson: "",
//   status: "New",
//   dealValue: 0,
// };

// const LeadFormPage = () => {
//   const [formData, setFormData] = useState<any>(emptyForm);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEdit = Boolean(id);

//   useEffect(() => {
//     if (!isEdit || !id) return;
//     const loadLead = async () => {
//       const response = await getLeadById(id);
//       setFormData(response.data);
//     };
//     loadLead();
//   }, [isEdit, id]);

//   const handleSubmit = async (event: FormEvent) => {
//     event.preventDefault();
//     setError("");

//     if (!formData.name || !formData.company || !formData.email) {
//       setError("Name, company, and email are required.");
//       return;
//     }

//     setLoading(true);
//     try {
//       if (isEdit && id) {
//         await updateLead(id, formData);
//       } else {
//         await createLead(formData);
//       }
//       navigate("/leads");
//     } catch (err: any) {
//       setError(err?.response?.data?.message || "Failed to save lead");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="max-w-2xl rounded-lg bg-white p-6 shadow">
//       <h2 className="mb-4 text-2xl font-semibold text-slate-800">{isEdit ? "Edit Lead" : "Add Lead"}</h2>
//       <form className="grid gap-3" onSubmit={handleSubmit}>
//         {["name", "company", "email", "phone", "source", "salesperson"].map((field) => (
//           <input
//             key={field}
//             className="input m-0"
//             placeholder={field[0].toUpperCase() + field.slice(1)}
//             value={formData[field]}
//             onChange={(e) => setFormData((prev: any) => ({ ...prev, [field]: e.target.value }))}
//             required={["name", "company", "email", "phone", "source", "salesperson"].includes(field)}
//           />
//         ))}
//         <select
//           className="input m-0"
//           value={formData.status}
//           onChange={(e) => setFormData((prev: any) => ({ ...prev, status: e.target.value }))}
//         >
//           {statuses.map((status) => (
//             <option key={status} value={status}>
//               {status}
//             </option>
//           ))}
//         </select>
//         <input
//           className="input m-0"
//           type="number"
//           min={0}
//           placeholder="Deal Value"
//           value={formData.dealValue}
//           onChange={(e) => setFormData((prev: any) => ({ ...prev, dealValue: Number(e.target.value) }))}
//         />
//         {error && <p className="text-sm text-rose-600">{error}</p>}
//         <button className="btn btn-primary" disabled={loading}>
//           {loading ? "Saving..." : "Save Lead"}
//         </button>
//       </form>
//     </section>
//   );
// };

// export default LeadFormPage;


import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createLead, getLeadById, updateLead } from "../services/leadService";
import type { LeadStatus } from "../types";
import { 
  Save, 
  ArrowLeft, 
  User, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  UserCircle, 
  DollarSign,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const statuses: LeadStatus[] = ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"];

const sources = ["Website", "Referral", "LinkedIn", "Email Campaign", "Event", "Cold Call", "Other"];

const emptyForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  source: "",
  salesperson: "",
  status: "New",
  dealValue: 0,
};

const LeadFormPage = () => {
  const [formData, setFormData] = useState<any>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (!isEdit || !id) return;
    const loadLead = async () => {
      setLoading(true);
      try {
        const response = await getLeadById(id);
        setFormData(response.data);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load lead");
      } finally {
        setLoading(false);
      }
    };
    loadLead();
  }, [isEdit, id]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (error) setError("");
  };

  const validateField = (field: string, value: any) => {
    if (field === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Invalid email format";
    }
    if (field === "dealValue" && value < 0) {
      return "Deal value cannot be negative";
    }
    if (["name", "company", "email"].includes(field) && !value && touched[field]) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    return "";
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.company || !formData.email) {
      setError("Name, company, and email are required.");
      return;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      if (isEdit && id) {
        await updateLead(id, formData);
        setSuccess("Lead updated successfully!");
      } else {
        await createLead(formData);
        setSuccess("Lead created successfully!");
      }
      setTimeout(() => {
        navigate("/leads");
      }, 1500);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save lead");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = (field: string) => {
    const hasError = validateField(field, formData[field]);
    return `w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
      hasError
        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
        : "border-slate-200 focus:ring-blue-500 focus:border-blue-500"
    }`;
  };

  if (loading && isEdit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin mx-auto"></div>
          </div>
          <p className="mt-4 text-sm font-medium text-slate-600">Loading lead data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/leads")}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Leads
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {isEdit ? "Edit Lead" : "Create New Lead"}
            </span>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            {isEdit ? "Edit Lead" : "Add New Lead"}
          </h1>
          <p className="text-slate-500 mt-1">
            {isEdit 
              ? "Update lead information and track changes" 
              : "Enter lead details to add them to your pipeline"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Lead Information</h2>
            <p className="text-sm text-slate-500 mt-0.5">Fill in the details below</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    Full Name
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  className={inputClasses("name")}
                  placeholder="Enter lead name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
                {validateField("name", formData.name) && (
                  <p className="mt-1 text-xs text-red-500">{validateField("name", formData.name)}</p>
                )}
              </div>

              {/* Company Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    Company
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  className={inputClasses("company")}
                  placeholder="Enter company name"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  required
                />
                {validateField("company", formData.company) && (
                  <p className="mt-1 text-xs text-red-500">{validateField("company", formData.company)}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    Email Address
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  className={inputClasses("email")}
                  placeholder="lead@company.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
                {validateField("email", formData.email) && (
                  <p className="mt-1 text-xs text-red-500">{validateField("email", formData.email)}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    Phone Number
                  </span>
                </label>
                <input
                  className={inputClasses("phone")}
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>

              {/* Source Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    Lead Source
                  </span>
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  value={formData.source}
                  onChange={(e) => handleChange("source", e.target.value)}
                >
                  <option value="">Select source</option>
                  {sources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>

              {/* Salesperson Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="flex items-center gap-2">
                    <UserCircle className="w-4 h-4 text-blue-600" />
                    Salesperson
                  </span>
                </label>
                <input
                  className={inputClasses("salesperson")}
                  placeholder="Assigned salesperson"
                  value={formData.salesperson}
                  onChange={(e) => handleChange("salesperson", e.target.value)}
                />
              </div>

              {/* Status Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Deal Value Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    Deal Value
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  className={inputClasses("dealValue")}
                  placeholder="0"
                  value={formData.dealValue}
                  onChange={(e) => handleChange("dealValue", Number(e.target.value))}
                />
              </div>
            </div>

            {/* Error and Success Messages */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-sm text-red-600 mt-0.5">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-emerald-800">Success</p>
                  <p className="text-sm text-emerald-600 mt-0.5">{success}</p>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="mt-8 flex items-center gap-3 pt-6 border-t border-slate-200">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Lead
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate("/leads")}
                className="px-6 py-2.5 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-800 text-center">
            <span className="font-semibold">💡 Tip:</span> Fields marked with <span className="text-red-500">*</span> are required. 
            Add as much information as possible to better qualify your leads.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadFormPage;
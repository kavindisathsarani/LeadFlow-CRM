import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteList from "../components/NoteList";
import StatusBadge from "../components/StatusBadge";
import { getLeadById } from "../services/leadService";
import { createNote, getNotes } from "../services/noteService";
import type { Lead, Note } from "../types";
import { 
  ArrowLeft, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  UserCircle, 
  DollarSign,
  Calendar,
  FileText,
  Send,
  Edit,
  Trash2,
  Info,
  Clock,
  User
} from "lucide-react";
import { Link } from "react-router-dom";

const LeadDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteContent, setNoteContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const [leadResponse, notesResponse] = await Promise.all([
        getLeadById(id), 
        getNotes(id)
      ]);
      setLead(leadResponse.data);
      setNotes(notesResponse.data);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const submitNote = async (event: FormEvent) => {
    event.preventDefault();
    if (!id || !noteContent.trim()) return;

    setSubmitting(true);
    try {
      await createNote({
        leadId: id,
        content: noteContent,
        createdBy: "CRM Admin",
      });
      setNoteContent("");
      await loadData();
    } catch (error) {
      console.error("Failed to create note:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse"></div>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-slate-600">Loading lead details...</p>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Info className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Lead Not Found</h3>
          <p className="text-slate-500 mb-6">The lead you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/leads")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Leads
          </button>
        </div>
      </div>
    );
  }

  const infoSections = [
    { icon: Building2, label: "Company", value: lead.company, color: "blue" },
    { icon: Mail, label: "Email", value: lead.email, color: "purple" },
    { icon: Phone, label: "Phone", value: lead.phone || "Not provided", color: "green" },
    { icon: Globe, label: "Source", value: lead.source || "Not specified", color: "orange" },
    { icon: UserCircle, label: "Salesperson", value: lead.salesperson || "Unassigned", color: "indigo" },
    { icon: DollarSign, label: "Deal Value", value: `$${lead.dealValue.toLocaleString()}`, color: "emerald" },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; border: string }> = {
      blue: { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-200" },
      purple: { bg: "bg-purple-50", icon: "text-purple-600", border: "border-purple-200" },
      green: { bg: "bg-green-50", icon: "text-green-600", border: "border-green-200" },
      orange: { bg: "bg-orange-50", icon: "text-orange-600", border: "border-orange-200" },
      indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", border: "border-indigo-200" },
      emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-200" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/leads")}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Leads
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Lead Details
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                    {lead.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusBadge status={lead.status} />
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Last updated: {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Link
                to={`/leads/${lead._id}/edit`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
              >
                <Edit className="w-4 h-4" />
                Edit Lead
              </Link>
              <button
                onClick={() => {/* Add delete functionality */}}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* Left Column - Lead Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lead Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Lead Information
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {infoSections.map((section) => {
                    const colors = getColorClasses(section.color);
                    const Icon = section.icon;
                    return (
                      <div key={section.label} className={`flex items-start gap-3 p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
                        <div className={`p-2 rounded-lg bg-white ${colors.icon}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-slate-500">{section.label}</p>
                          <p className="text-sm font-semibold text-slate-900 mt-0.5">
                            {section.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Notes & Activity
                  </h2>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    {notes.length} note{notes.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                {/* Add Note Form */}
                <form onSubmit={submitNote} className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Add a note
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Write a note about this lead..."
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      Send
                    </button>
                  </div>
                </form>

                {/* Notes List */}
                {notes.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-3">
                      <FileText className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-500">No notes yet</p>
                    <p className="text-xs text-slate-400 mt-1">Add a note to start the conversation</p>
                  </div>
                ) : (
                  <NoteList notes={notes} />
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-sm font-semibold opacity-90 mb-3">Lead Summary</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-2xl font-bold">${lead.dealValue.toLocaleString()}</p>
                  <p className="text-xs opacity-80">Deal Value</p>
                </div>
                <div className="pt-3 border-t border-white/20">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="opacity-80">Pipeline Stage</span>
                    <span className="font-semibold">{lead.status}</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ 
                        width: `${
                          lead.status === "New" ? "20%" :
                          lead.status === "Contacted" ? "40%" :
                          lead.status === "Qualified" ? "60%" :
                          lead.status === "Proposal Sent" ? "80%" :
                          lead.status === "Won" ? "100%" : "50%"
                        }` 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                  📞 Schedule a call
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                  ✉️ Send follow-up email
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                  📅 Set a reminder
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                  📊 Generate quote
                </button>
              </div>
            </div>

            {/* Metadata Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                Metadata
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Lead ID</span>
                  <span className="text-slate-700 font-mono text-xs">{lead._id?.slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Created</span>
                  <span className="text-slate-700">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last Activity</span>
                  <span className="text-slate-700">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsPage;
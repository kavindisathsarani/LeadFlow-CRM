import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeadTable from "../components/LeadTable";
import { deleteLead, getLeads } from "../services/leadService";
import type { Lead } from "../types";
import { 
  Plus, 
  Search, 
  Filter, 
  RefreshCw, 
  X, 
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

const LeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", source: "", salesperson: "", search: "" });
  const [showFilters, setShowFilters] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value));
      const response = await getLeads(params as Record<string, string>);
      setLeads(response.data);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const onDelete = async (id: string) => {
    if (!window.confirm("Delete this lead?")) return;
    try {
      await deleteLead(id);
      fetchLeads();
    } catch (error) {
      console.error("Failed to delete lead:", error);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ status: "", source: "", salesperson: "", search: "" });
    setTimeout(() => fetchLeads(), 0);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "");
  const activeFilterCount = Object.values(filters).filter(value => value !== "").length;

  // Calculate statistics
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status?.toLowerCase() === "new").length,
    qualified: leads.filter(l => l.status?.toLowerCase() === "qualified").length,
    won: leads.filter(l => l.status?.toLowerCase() === "won").length,
    lost: leads.filter(l => l.status?.toLowerCase() === "lost").length,
  };

  const statCards = [
    { label: "Total Leads", value: stats.total, icon: Users, color: "blue", gradient: "from-blue-500 to-blue-600" },
    { label: "New Leads", value: stats.new, icon: Clock, color: "purple", gradient: "from-purple-500 to-purple-600" },
    { label: "Qualified", value: stats.qualified, icon: CheckCircle, color: "emerald", gradient: "from-emerald-500 to-emerald-600" },
    { label: "Won", value: stats.won, icon: TrendingUp, color: "green", gradient: "from-green-500 to-green-600" },
    { label: "Lost", value: stats.lost, icon: XCircle, color: "rose", gradient: "from-rose-500 to-rose-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Lead Management
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Leads
              </h1>
              <p className="text-slate-500 mt-1">
                Manage and track all your leads in one place
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={fetchLeads}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <Link
                to="/leads/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Plus className="w-4 h-4" />
                Add Lead
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: "bg-blue-50 text-blue-600",
              purple: "bg-purple-50 text-purple-600",
              emerald: "bg-emerald-50 text-emerald-600",
              green: "bg-green-50 text-green-600",
              rose: "bg-rose-50 text-rose-600",
            };
            
            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`rounded-lg p-2 ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className={`text-xs font-medium px-2 py-1 rounded-full bg-${stat.color}-50 text-${stat.color}-600`}>
                    {stat.label}
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{ backgroundImage: `linear-gradient(to right, ${stat.gradient})` }} />
              </div>
            );
          })}
        </div>

        {/* Filters Section */}
        <div className="mb-6">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                placeholder="Search by name, company, or email..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && fetchLeads()}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-200 ${
                showFilters || hasActiveFilters
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:text-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear all
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm animate-in slide-in-from-top-2 duration-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Advanced Filters</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Source</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                    value={filters.source}
                    onChange={(e) => handleFilterChange("source", e.target.value)}
                  >
                    <option value="">All Sources</option>
                    <option value="website">Website</option>
                    <option value="referral">Referral</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="email">Email Campaign</option>
                    <option value="event">Event</option>
                    <option value="cold_call">Cold Call</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Salesperson</label>
                  <input
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                    placeholder="Enter salesperson name"
                    value={filters.salesperson}
                    onChange={(e) => handleFilterChange("salesperson", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-slate-100">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => {
                    fetchLeads();
                    setShowFilters(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Leads Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">All Leads</h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  Showing {leads.length} lead{leads.length !== 1 ? 's' : ''}
                </p>
              </div>
              {hasActiveFilters && (
                <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  Filtered results
                </div>
              )}
            </div>
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse"></div>
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-600">Loading leads...</p>
              <p className="text-xs text-slate-400 mt-1">Please wait while we fetch your data</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="bg-slate-100 rounded-full p-4 mb-4">
                <Users className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">No leads found</h3>
              <p className="text-slate-500 text-center max-w-sm mb-4">
                {hasActiveFilters 
                  ? "No leads match your current filters. Try adjusting your search criteria."
                  : "Get started by adding your first lead to the system."}
              </p>
              {hasActiveFilters ? (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              ) : (
                <Link
                  to="/leads/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Lead
                </Link>
              )}
            </div>
          ) : (
            <LeadTable leads={leads} onDelete={onDelete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadsPage;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeadTable from "../components/LeadTable";
import { deleteLead, getLeads } from "../services/leadService";
import type { Lead } from "../types";

const LeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", source: "", salesperson: "", search: "" });

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value));
      const response = await getLeads(params as Record<string, string>);
      setLeads(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const onDelete = async (id: string) => {
    if (!window.confirm("Delete this lead?")) return;
    await deleteLead(id);
    fetchLeads();
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-800">Leads</h2>
        <Link to="/leads/new" className="btn btn-primary">
          Add Lead
        </Link>
      </div>
      <div className="grid gap-3 rounded-lg bg-white p-4 shadow sm:grid-cols-2 lg:grid-cols-4">
        <input
          className="input m-0"
          placeholder="Search name/company/email"
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
        />
        <input
          className="input m-0"
          placeholder="Filter by status"
          value={filters.status}
          onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
        />
        <input
          className="input m-0"
          placeholder="Filter by source"
          value={filters.source}
          onChange={(e) => setFilters((prev) => ({ ...prev, source: e.target.value }))}
        />
        <input
          className="input m-0"
          placeholder="Filter by salesperson"
          value={filters.salesperson}
          onChange={(e) => setFilters((prev) => ({ ...prev, salesperson: e.target.value }))}
        />
        <button className="btn btn-primary" onClick={fetchLeads}>
          Apply Filters
        </button>
      </div>
      {loading ? <p>Loading leads...</p> : <LeadTable leads={leads} onDelete={onDelete} />}
    </section>
  );
};

export default LeadsPage;

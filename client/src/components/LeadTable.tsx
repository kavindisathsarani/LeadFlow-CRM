import { Link } from "react-router-dom";
import type { Lead } from "../types";
import StatusBadge from "./StatusBadge";

interface LeadTableProps {
  leads: Lead[];
  onDelete: (id: string) => void;
}

const LeadTable = ({ leads, onDelete }: LeadTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-left text-slate-700">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Salesperson</th>
            <th className="px-4 py-3">Deal Value</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="border-t border-slate-100">
              <td className="px-4 py-3">{lead.name}</td>
              <td className="px-4 py-3">{lead.company}</td>
              <td className="px-4 py-3">{lead.email}</td>
              <td className="px-4 py-3">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-4 py-3">{lead.salesperson}</td>
              <td className="px-4 py-3">${lead.dealValue.toLocaleString()}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Link className="text-blue-600 hover:underline" to={`/leads/${lead._id}`}>
                    View
                  </Link>
                  <Link className="text-slate-700 hover:underline" to={`/leads/${lead._id}/edit`}>
                    Edit
                  </Link>
                  <button className="text-rose-600 hover:underline" onClick={() => onDelete(lead._id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;

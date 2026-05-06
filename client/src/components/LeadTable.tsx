// import { Link } from "react-router-dom";
// import type { Lead } from "../types";
// import StatusBadge from "./StatusBadge";

// interface LeadTableProps {
//   leads: Lead[];
//   onDelete: (id: string) => void;
// }

// const LeadTable = ({ leads, onDelete }: LeadTableProps) => {
//   return (
//     <div className="overflow-x-auto rounded-lg bg-white shadow">
//       <table className="min-w-full text-sm">
//         <thead className="bg-slate-100 text-left text-slate-700">
//           <tr>
//             <th className="px-4 py-3">Name</th>
//             <th className="px-4 py-3">Company</th>
//             <th className="px-4 py-3">Email</th>
//             <th className="px-4 py-3">Status</th>
//             <th className="px-4 py-3">Salesperson</th>
//             <th className="px-4 py-3">Deal Value</th>
//             <th className="px-4 py-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leads.map((lead) => (
//             <tr key={lead._id} className="border-t border-slate-100">
//               <td className="px-4 py-3">{lead.name}</td>
//               <td className="px-4 py-3">{lead.company}</td>
//               <td className="px-4 py-3">{lead.email}</td>
//               <td className="px-4 py-3">
//                 <StatusBadge status={lead.status} />
//               </td>
//               <td className="px-4 py-3">{lead.salesperson}</td>
//               <td className="px-4 py-3">${lead.dealValue.toLocaleString()}</td>
//               <td className="px-4 py-3">
//                 <div className="flex gap-2">
//                   <Link className="text-blue-600 hover:underline" to={`/leads/${lead._id}`}>
//                     View
//                   </Link>
//                   <Link className="text-slate-700 hover:underline" to={`/leads/${lead._id}/edit`}>
//                     Edit
//                   </Link>
//                   <button className="text-rose-600 hover:underline" onClick={() => onDelete(lead._id)}>
//                     Delete
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LeadTable;

import { Link } from "react-router-dom";
import type { Lead } from "../types";
import StatusBadge from "./StatusBadge";
import { 
  Eye, 
  Edit2, 
  Trash2, 
  Building2, 
  Mail, 
  User, 
  DollarSign,
  UserCircle,
  Users
} from "lucide-react";
import { useState } from "react";

interface LeadTableProps {
  leads: Lead[];
  onDelete: (id: string) => void;
}

const LeadTable = ({ leads, onDelete }: LeadTableProps) => {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = (id: string) => {
    onDelete(id);
    setDeleteConfirm(null);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Name
              </div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Company
              </div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <UserCircle className="w-4 h-4" />
                Salesperson
              </div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Deal Value
              </div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {leads.map((lead, index) => (
            <tr 
              key={lead._id} 
              className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                      {lead.name}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-slate-700 font-medium">{lead.company}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-slate-600">{lead.email}</div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                    <UserCircle className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <span className="text-sm text-slate-700">{lead.salesperson || "Unassigned"}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900">
                    ${lead.dealValue.toLocaleString()}
                  </span>
                  {lead.dealValue > 10000 && (
                    <span className="text-xs text-emerald-600 font-medium">High Value</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                {deleteConfirm === lead._id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => confirmDelete(lead._id)}
                      className="px-2 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={cancelDelete}
                      className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded-md hover:bg-slate-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/leads/${lead._id}`}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group/btn"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      to={`/leads/${lead._id}/edit`}
                      className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-200"
                      title="Edit Lead"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(lead._id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {leads.length === 0 && (
        <div className="text-center py-12 bg-white rounded-b-xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
            <Users className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500 text-sm">No leads found</p>
        </div>
      )}
    </div>
  );
};

export default LeadTable;

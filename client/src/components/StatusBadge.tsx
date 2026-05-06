import type { LeadStatus } from "../types";

const statusClasses: Record<LeadStatus, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-sky-100 text-sky-700",
  Qualified: "bg-purple-100 text-purple-700",
  "Proposal Sent": "bg-amber-100 text-amber-700",
  Won: "bg-emerald-100 text-emerald-700",
  Lost: "bg-rose-100 text-rose-700",
};

const StatusBadge = ({ status }: { status: LeadStatus }) => {
  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusClasses[status]}`}>{status}</span>;
};

export default StatusBadge;

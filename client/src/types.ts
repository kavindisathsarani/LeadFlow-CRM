export type LeadStatus = "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won" | "Lost";

export interface Lead {
  _id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  salesperson: string;
  status: LeadStatus;
  dealValue: number;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  _id: string;
  leadId: string;
  content: string;
  createdBy: string;
  createdAt: string;
}

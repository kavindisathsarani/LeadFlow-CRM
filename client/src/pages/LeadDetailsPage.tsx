import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useParams } from "react-router-dom";
import NoteList from "../components/NoteList";
import StatusBadge from "../components/StatusBadge";
import { getLeadById } from "../services/leadService";
import { createNote, getNotes } from "../services/noteService";
import type { Lead, Note } from "../types";

const LeadDetailsPage = () => {
  const { id } = useParams();
  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteContent, setNoteContent] = useState("");

  const loadData = async () => {
    if (!id) return;
    const [leadResponse, notesResponse] = await Promise.all([getLeadById(id), getNotes(id)]);
    setLead(leadResponse.data);
    setNotes(notesResponse.data);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const submitNote = async (event: FormEvent) => {
    event.preventDefault();
    if (!id || !noteContent.trim()) return;

    await createNote({
      leadId: id,
      content: noteContent,
      createdBy: "CRM Admin",
    });
    setNoteContent("");
    loadData();
  };

  if (!lead) return <p>Loading lead details...</p>;

  return (
    <section className="space-y-6">
      <div className="rounded-lg bg-white p-5 shadow">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-800">{lead.name}</h2>
          <StatusBadge status={lead.status} />
        </div>
        <p className="text-slate-700">Company: {lead.company}</p>
        <p className="text-slate-700">Email: {lead.email}</p>
        <p className="text-slate-700">Phone: {lead.phone}</p>
        <p className="text-slate-700">Source: {lead.source}</p>
        <p className="text-slate-700">Salesperson: {lead.salesperson}</p>
        <p className="text-slate-700">Deal Value: ${lead.dealValue.toLocaleString()}</p>
      </div>

      <div className="rounded-lg bg-white p-5 shadow">
        <h3 className="mb-3 text-xl font-semibold text-slate-800">Notes</h3>
        <form className="mb-4 flex gap-2" onSubmit={submitNote}>
          <input
            className="input m-0"
            placeholder="Write a note..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            required
          />
          <button className="btn btn-primary">Add Note</button>
        </form>
        <NoteList notes={notes} />
      </div>
    </section>
  );
};

export default LeadDetailsPage;

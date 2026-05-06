import type { Note } from "../types";

const NoteList = ({ notes }: { notes: Note[] }) => {
  if (!notes.length) {
    return <p className="text-slate-500">No notes added yet.</p>;
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div key={note._id} className="rounded-md border border-slate-200 bg-white p-3">
          <p className="text-slate-800">{note.content}</p>
          <p className="mt-1 text-xs text-slate-500">
            By {note.createdBy} on {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NoteList;

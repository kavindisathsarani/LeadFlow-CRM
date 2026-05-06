import api from "./api";

export const getNotes = async (leadId: string) => {
  const response = await api.get(`/notes/${leadId}`);
  return response.data;
};

export const createNote = async (payload: { leadId: string; content: string; createdBy: string }) => {
  const response = await api.post("/notes", payload);
  return response.data;
};

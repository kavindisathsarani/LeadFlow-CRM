import api from "./api";
import type { Lead } from "../types";

export const getLeads = async (params?: Record<string, string>) => {
  const response = await api.get("/leads", { params });
  return response.data;
};

export const getLeadById = async (id: string) => {
  const response = await api.get(`/leads/${id}`);
  return response.data;
};

export const createLead = async (payload: Partial<Lead>) => {
  const response = await api.post("/leads", payload);
  return response.data;
};

export const updateLead = async (id: string, payload: Partial<Lead>) => {
  const response = await api.put(`/leads/${id}`, payload);
  return response.data;
};

export const deleteLead = async (id: string) => {
  const response = await api.delete(`/leads/${id}`);
  return response.data;
};

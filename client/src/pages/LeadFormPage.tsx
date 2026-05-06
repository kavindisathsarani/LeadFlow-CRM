import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createLead, getLeadById, updateLead } from "../services/leadService";
import type { LeadStatus } from "../types";

const statuses: LeadStatus[] = ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"];

const emptyForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  source: "",
  salesperson: "",
  status: "New",
  dealValue: 0,
};

const LeadFormPage = () => {
  const [formData, setFormData] = useState<any>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (!isEdit || !id) return;
    const loadLead = async () => {
      const response = await getLeadById(id);
      setFormData(response.data);
    };
    loadLead();
  }, [isEdit, id]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!formData.name || !formData.company || !formData.email) {
      setError("Name, company, and email are required.");
      return;
    }

    setLoading(true);
    try {
      if (isEdit && id) {
        await updateLead(id, formData);
      } else {
        await createLead(formData);
      }
      navigate("/leads");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold text-slate-800">{isEdit ? "Edit Lead" : "Add Lead"}</h2>
      <form className="grid gap-3" onSubmit={handleSubmit}>
        {["name", "company", "email", "phone", "source", "salesperson"].map((field) => (
          <input
            key={field}
            className="input m-0"
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, [field]: e.target.value }))}
            required={["name", "company", "email", "phone", "source", "salesperson"].includes(field)}
          />
        ))}
        <select
          className="input m-0"
          value={formData.status}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, status: e.target.value }))}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <input
          className="input m-0"
          type="number"
          min={0}
          placeholder="Deal Value"
          value={formData.dealValue}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, dealValue: Number(e.target.value) }))}
        />
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Lead"}
        </button>
      </form>
    </section>
  );
};

export default LeadFormPage;

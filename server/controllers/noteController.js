const mongoose = require("mongoose");
const Note = require("../models/Note");
const Lead = require("../models/Lead");

const createNote = async (req, res, next) => {
  try {
    const { leadId, content, createdBy } = req.body;

    if (!leadId || !content || !createdBy) {
      return res.status(400).json({ success: false, message: "leadId, content, and createdBy are required" });
    }

    const leadExists = await Lead.exists({ _id: leadId });
    if (!leadExists) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    const note = await Note.create({ leadId, content, createdBy });
    return res.status(201).json({ success: true, data: note });
  } catch (error) {
    return next(error);
  }
};

const getLeadNotes = async (req, res, next) => {
  try {
    const { leadId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(leadId)) {
      return res.status(400).json({ success: false, message: "Invalid lead id" });
    }
    const notes = await Note.find({ leadId }).sort({ createdAt: -1 });
    return res.json({ success: true, count: notes.length, data: notes });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createNote, getLeadNotes };

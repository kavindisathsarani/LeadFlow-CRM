const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createNote, getLeadNotes } = require("../controllers/noteController");

const router = express.Router();

router.use(authMiddleware);
router.post("/", createNote);
router.get("/:leadId", getLeadNotes);

module.exports = router;

const express = require("express");
const router = express.Router();
const { addProgress, getProgressHistory } = require("../controllers/progressController");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addProgress);
router.get("/history", protect, getProgressHistory);

module.exports = router;

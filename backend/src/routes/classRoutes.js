const express = require("express");
const router = express.Router();
const { createClass, getAllClasses, getTrainerClasses } = require("../controllers/classController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createClass);
router.get("/all", getAllClasses);
router.get("/trainer", protect, getTrainerClasses);

module.exports = router;

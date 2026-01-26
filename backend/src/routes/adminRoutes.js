const express = require("express");
const router = express.Router();
const { getPendingUsers, approveUser, getApprovedUsers, rejectUser } = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Only admins can access these routes
router.use(protect);
router.use(adminOnly);

// GET pending users (Verified but not Approved)
router.get("/pending-users", getPendingUsers);

// GET approved users
router.get("/approved-users", getApprovedUsers);

// POST approve user
router.post("/approve/:role/:id", approveUser);

// DELETE reject user
// DELETE reject user (Permanent Delete)
router.delete("/reject/:role/:id", rejectUser);

// PUT deactivate user (Revoke Approval)
router.put("/deactivate/:role/:id", require("../controllers/adminController").deactivateUser);

// GET all payments
router.get("/payments", require("../controllers/adminController").getAllPayments);

// GET reports
router.get("/reports", require("../controllers/adminController").getReports);


module.exports = router;

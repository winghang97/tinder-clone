const express = require("express");
const user = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/get-profile", protect, user.get);
router.get("/", protect, user.getAll);

module.exports = router;

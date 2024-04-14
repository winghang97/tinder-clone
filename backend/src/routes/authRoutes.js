const express = require("express");
const auth = require("../controllers/authController");

const router = express.Router();

router.post("/login", auth.login);
router.post("/register", auth.register);

module.exports = router;

const express = require("express");
const user = require("../controllers/userController");

const router = express.Router();

router.get("/", user.getAll);

module.exports = router;

const express = require("express");
const like = require("../controllers/likeController");

const router = express.Router();

router.post("/create", like.create);
router.delete("/delete/:id", like.delete);

module.exports = router;

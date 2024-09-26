const express = require("express");
const { createChat, findeUserChart, findChart } = require("../controllers/chatController");

const router = express.Router();
router.post("/", createChat)
router.get("/:chartId", findeUserChart)
router.get("/find/:firstId/:secoundId", findChart)





module.exports = router;
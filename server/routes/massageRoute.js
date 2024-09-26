const express = require("express");
const { getMassage, createMassage } = require("../controllers/massageControllers");

const router = express.Router();


router.post("/", createMassage)
router.get("/:chartId", getMassage)

module.exports = router

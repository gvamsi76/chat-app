const mongoose = require("mongoose");

const massageSchema = new mongoose.Schema(
    {
        chartId: String,
        senderId: String,
        text: String
    },
    {
        timestamps: true
    }
)

const massageModal = mongoose.model("Massage", massageSchema);
module.exports = massageModal;
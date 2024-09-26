const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        members: Array,
    },
    {
        timestamps: true
    },
)
const chaModal = mongoose.model("Chat", chatSchema);
module.exports = chaModal
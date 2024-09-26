const massageModal = require("../models/massageModal");

const createMassage = async (req, res) => {
    const { chartId, senderId, text } = req.body;
    const massage = new massageModal({
        chartId,
        senderId,
        text,
    });
    try {
        const response = await massage.save();
        res.status(200).json(response)  

    } catch (error) {
        res.status(500).json("........")
        throw new error
    }
}
const getMassage = async (req, res) => {
    const { chartId } = req.params;
    try {
        const response = await massageModal.find({ chartId })
        res.status(200).json(response)


    } catch (error) {
        res.status(500).json("........")
        throw new error
    }
}

module.exports = { createMassage , getMassage }
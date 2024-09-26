const chatModal = require("../models/chatModal")


const createChat = async (req, res) => {
    const { firstId, secoundId } = req.body;
    try {
        const chat = await chatModal.findOne({
            members: { $all: [firstId, secoundId] }

        });
        if (chat) return res.status(200).json(chat)
        const newchart = new chatModal({
            members: [firstId, secoundId]
        })
        const response = await newchart.save()
        res.status(200).json(response)

    } catch (error) {
        res.status(500).json("........")
        throw new error
    }
}       

const findeUserChart = async (req, res) => {

    const  chartId = req.params.chartId
    try {
        const chats = await chatModal.find({
            members: { $in: [chartId] }
        })
        res.status(200).json(chats)

    } catch (error) {
        res.status(500).json("........")
        throw new error
    }
};

const findChart = async (req, res) => {

    const { firstId, secoundId } = req.params
    try {

        const chat = await chatModal.find({
            members: { $all: [firstId, secoundId] }

        })
        res.status(200).json(chat)

    } catch (error) {
        console.log(error,"error");
        res.status(500).json("........")
        throw new error
    }
};

module.exports = { createChat, findeUserChart, findChart }
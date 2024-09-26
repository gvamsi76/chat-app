const userModel = require("../models/userModal")
const bycript = require("bcrypt");
const validator = require("validator")
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const createToken = (_id) => {
    const jwtkey = "supersecretkey7993884"
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" })
}

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (user) return res.status(400).json(" User with this email already exit...")

        if (!name || !email || !password) return res.status(400).json("All fields are required....")
        if (!validator.isEmail(email)) return res.status(400).json("Email must be a valid email")
        if (!validator.isStrongPassword(password)) return res.status(400).json("Password must be strong")
        user = new userModel({ name, email, password })

        const salt = await bycript.genSalt(10)
        user.password = await bycript.hash(user.password, salt)
        await user.save();

        const token = createToken(user._id)
        res.status(200).json({ _id: user._id, name, email, token })
    } catch (error) {
        res.status(500).json("234rt2345 ")
        throw new error
    }

};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await userModel.findOne({ email })

        if (!user) return res.status(400).json("Invalid email or password")
        const isValidPassword = await bycript.compare(password, user.password)

        if (!isValidPassword) return res.status(400).json(" invalid password")

        const token = createToken(user._id)
        res.status(200).json({ _id: user._id, name: user.name, email, token })

    } catch (error) {
        console.log(error); 1
    }
}

const findUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userModel.findById({ _id: userId });
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}
const getAllUsers = async (req, res) => {

    try {
        const users = await userModel.find();
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { registerUser, loginUser, findUser, getAllUsers }
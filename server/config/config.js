const mongoose = require('mongoose');
require('dotenv').config()
const path = require("path")

console.log(process.env.MONGO_URI ,"env")
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'chatApp',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error: ', error);
        process.exit(1);
    }
};

module.exports = connectDB;

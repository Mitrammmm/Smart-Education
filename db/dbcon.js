const mongoose = require('mongoose');

const localUrl = 'mongodb://127.0.0.1:27017/SmartEducation';
const liveUrl = 'mongodb+srv://collablab2243:collabLabs@cluster0.40vgfba.mongodb.net/CollabLab?retryWrites=true&w=majority&appName=Cluster0';

const connectDb = async () => {
    return mongoose.connect(liveUrl)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });
};

module.exports = connectDb;


const mongoose  = require('mongoose')
const localUrl = 'mongodb://127.0.0.1:27017/SmartEducation'
const liveUrl = "mongodb+srv://collablab2243:collabLab@cluster0.zl1cuz4.mongodb.net/CollabLab?retryWrites=true&w=majority&appName=Cluster0"

const connectDb = async () => {
    return mongoose.connect(localUrl)
    .then(()=>{
        console.log("Connected to MongoDB")
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDb;
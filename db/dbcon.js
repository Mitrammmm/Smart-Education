const mongoose  = require('mongoose')
const localUrl = 'mongodb://127.0.0.1:27017/SmartEducation'

const connectDb = async () => {
    return mongoose.connect(localUrl)
    .then(()=>{
        console.log("Connected to MongoDB")
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDb;
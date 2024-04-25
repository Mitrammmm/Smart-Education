const ChatModel = require('../models/doubt')
const UserModel = require('../models/user');

const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'dmhs50pdp', 
  api_key: '211654577373189', 
  api_secret: 'niITexNrWo1TrPkyJeVpK6wTUJU' 
});

class ChatController {
    // static getAllDoubts = async (req,res) => {
    //     try {
    //         const doubts = await ChatModel.find();
    //         res.render('messaging', { d:doubts });
    //     }catch (err) {
    //         console.log(err);
    //     }
    // }
    static addDoubt = async (req,res) => {
        try {
            let imageUpload;
            if (req.files && req.files.image) {
                const file = req.files.image;
                imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'collabLab'
                });
            }
            const { title, description, author } = req.body;
            const newDoubtData = {
                title: title,
                description: description,
                author: author
            };

            if (imageUpload) {
                newDoubtData.image = {
                public_id: imageUpload.public_id,
                url: imageUpload.secure_url
                };
            }
            const data = await UserModel.find();
            const userEmails = data.map(user => user.email); // Extracting email addresses from user objects
            // console.log(userEmails);

            this.sendEmail(title, description,author,userEmails)
            const newDoubt = new ChatModel(newDoubtData);
            await newDoubt.save();
            res.redirect('messaging');
        }catch (err) {
            console.log(err);
        }
    }
    static sendEmail = async (title,description ,author,userEmails) => {
        // console.log(name,email,phone,course,description);
        let transporter = await nodemailer.createTransport({
            //For Gmail
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "collablab2243@gmail.com",
                pass: "obdojrysnnojlkyu"
            },
        });
        let info = await transporter.sendMail({
            from: "test@gmail.com", // sender address
            to: userEmails.join(' '), // list of receivers separated by space
            subject: `Doubt in ${title}`, // Subject line
            text: "Details :", // plain text body
            // html body
            html: `By : <b>${author}</b><br> 
                   Description : <b>${description}</b><br>
                   Website : <a href="http://localhost:3000/messaging">Click Here to View</a>
                    `
        });
    }
}

module.exports = ChatController
const ChatModel = require('../models/doubt')

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

            const newDoubt = new ChatModel(newDoubtData);
            await newDoubt.save();
            res.redirect('messaging');
        }catch (err) {
            console.log(err);
        }
    }
}

module.exports = ChatController
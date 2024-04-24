const UserModel = require('../models/user');
const ResourceModel = require('../models/resource');
const ChatModel = require('../models/doubt')
// To Secure Password
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'dmhs50pdp', 
  api_key: '211654577373189', 
  api_secret: 'niITexNrWo1TrPkyJeVpK6wTUJU' 
});

class FrontController {
    static home = async (req, res) => {
        try {
            // console.log('drift.api.showWelcomeMessage()')
            res.render('home',{message:req.flash('success'),msg:req.flash('error')})
        }catch(err){
            console.log(err);
        }
    }
    static login = async (req, res) => {
        try {
            res.render('login',{message:req.flash('success'),msg:req.flash('error')})
        }catch(err){
            console.log(err);
        }
    }
    static register = async (req, res) => {
        try {
            res.render('register',{message:req.flash('success'),msg:req.flash('error')})
        }catch(err){
            console.log(err);
        }
    }
    static description = async (req, res) => {
        try {
            const resource = await ResourceModel.find();
            res.render('description', {r: resource})
        }catch(err){
            console.log(err);
        }
    }
    static DSAdescription = async (req, res) => {
        try {
            const resource = await ResourceModel.find();
            res.render('DSAdescription', {r: resource})
        }catch(err){
            console.log(err);
        }
    }
    static MLdescription = async (req, res) => {
        try {
            const resource = await ResourceModel.find();
            res.render('MLdescription', {r: resource})
        }catch(err){
            console.log(err);
        }
    }
    static contact = async (req, res) => {
        try {
            res.render('contact')
        }catch(err){
            console.log(err);
        }
    }
    static messaging = async (req, res) => {
        try {
            const doubts = await ChatModel.find();
            res.render('messaging', { d:doubts })
        }catch(err){
            console.log(err);
        }
    }
    static topicListing = async (req, res) => {
        try {
            res.render('topicListing')
        }catch(err){
            console.log(err);
        }
    }
    static userinsert = async (req, res) => {
        try {
            let imageUpload = null; // Set default value for image upload
    
            // To upload Image on Cloud if an image is uploaded
            if (req.files && req.files.image) {
                const file = req.files.image;
                imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'collabLab'
                });
            }
    
            const { n, e, p, cp } = req.body;
            const user = await UserModel.findOne({ email: e });
    
            if (user) {
                req.flash('error', 'Email Already Exists.');
                res.redirect('/register');
            } else {
                if (n && e && p && cp) {
                    if (p == cp) {
                        const hashPassword = await bcrypt.hash(p, 10);
                        const result = new UserModel({
                            name: n,
                            email: e,
                            password: hashPassword,
                            image: {
                                public_id: imageUpload ? imageUpload.public_id : 'userProfile/ogjhqekpvgaoknrunb4y',
                                url: imageUpload ? imageUpload.secure_url : 'https://res.cloudinary.com/dmtgrirpq/image/upload/v1709919759/userProfile/ogjhqekpvgaoknrunb4y.webp'
                            }
                        });
                        await result.save();
                        res.redirect('/login');
                        // // To save data
                        // const userData = await result.save();
                        // if (userData) {
                        //     // To Generate Token
                        //     const token = jwt.sign({ ID: userData._id }, 'guptchabi@123456');
                        //     res.cookie('token', token);
                        //     this.sendVerifyMail(n, e, userData._id);
                        //     req.flash("success", "Successfully Registered, Please Verify your Email.");
                        //     res.redirect("/register");
                        // } else {
                        //     req.flash('error', 'Not a Verified User.');
                        //     res.redirect('/register');
                        // }
                    } else {
                        req.flash('error', 'Password & Confirm Password must be Same.');
                        res.redirect('/register');
                    }
                } else {
                    req.flash('error', 'All Fields are Required.');
                    res.redirect('/register');
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    static verifyLogin = async (req, res) => {
        try{
            const {email , password} = req.body
            const user = await UserModel.findOne({email:email})
            if(user!=null){
                const isMatch = await bcrypt.compare(password , user.password)
                if(isMatch){
                    // To Generate Token
                    const token = jwt.sign({ ID: user.id }, 'guptchabi@123456');
                    // console.log(token)
                    res.cookie('token',token)

                    //Admin Login
                    if(user.role==='admin'){
                        res.redirect('/admin/dashboard')
                    }
                    //User login
                    else {
                        res.redirect('/')
                    }

                    // //Admin Login
                    // if(user.role==='admin' && user.isVerified == 1){
                    //     res.redirect('/admin/dashboard')
                    // }
                    // //User login
                    // else if(user.role==='user' && user.isVerified == 1){
                    //     res.redirect('/home')
                    // }
                    // else {
                    //     req.flash('error', 'Please Verify your Email First')
                    //     res.redirect('/')
                    // }
                }else{
                    req.flash('error','Email or Password is Not Correct.')
                    res.redirect('/');
                }
            }else{
                req.flash('error','You are not a Registered User.')
                res.redirect('/');
            }
        }catch(err){
            console.log(err);
        }
    }
    static forgetPasswordVerify = async (req, res) => {
        try {
          const { email } = req.body;
          const userData = await UserModel.findOne({ email: email });
          //console.log(userData)
          if (userData) {
            const randomString = randomstring.generate();
            await UserModel.updateOne(
              { email: email },
              { $set: { token: randomString } }
            );
            this.sendEmail(userData.name, userData.email, randomString);
            req.flash("success", "Check your mail to Reset your Password!");
            res.redirect("/login");
          } else {
            req.flash("error", "This is not a Registered Email , Please Register");
            res.redirect("/register");
          }
        } catch (error) {
          console.log(error);
        }
    }
    static resetPassword = async (req, res) => {
        try {
          const token = req.query.token;
          const tokenData = await UserModel.findOne({ token: token });
          if (tokenData) {
            res.render("resetPassword", { user_id: tokenData._id });
          } else {
            res.render("404");
          }
        } catch (error) {
          console.log(error);
        }
    }
    static reset_Password1 = async (req, res) => {
        try {
        const { password, user_id } = req.body;
        const newHashPassword = await bcrypt.hash(password, 10);
        await UserModel.findByIdAndUpdate(user_id, {
            password: newHashPassword,
            token: "",
        });
        req.flash("success", "Reset Password Updated successfully ");
        res.redirect("/login");
        } catch (error) {
        console.log(error);
        }
    }
    static sendEmail = async (name, email, token) => {
        // console.log(name,email,status,comment)
        // connenct with the smtp server
    
        let transporter = await nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
    
          auth: {
            user: "collablab2243@gmail.com",
            pass: "obdojrysnnojlkyu"
          },
        });
        let info = await transporter.sendMail({
          from: "test@gmail.com", // sender address
          to: email, // list of receivers
          subject: "Reset Password", // Subject line
          text: "hello", // plain text body
          html:
            "<p>Hii " +
            name +
            ',Please click here to <a href="http://localhost:3000/reset-password?token=' +
            token +
            '">Reset</a> your Password.',
        });
    }
    static profile = async (req, res) => {
        try{
            const {name,image,email,id} = req.userData;
            res.render('profile',{n:name , i:image , e:email , id:id, message:req.flash('success'),msg:req.flash('error')});
        }catch(err){
            console.log(err);
        }
    }
    static updateProfile = async (req, res) => {
        try{
            // const {name,image,email,id} = req.userData;
            // console.log(req.body)
            // console.log(req.files.image)
            const { id } = req.userData
            const {name,email} =req.body
            var data = {
                name: name,
                email: email
            }
            await UserModel.findByIdAndUpdate(id, data)
            req.flash('success', "Profile Updated successfully")
            res.redirect('/profile')
        }catch(err){
            console.log(err);
        }
    }
    static changePassword = async (req, res) => {
        try{
            const {id} = req.userData;
            // console.log(req.body);
            const {op , np , cp} = req.body;
            if (op && np && cp) {
                const user = await UserModel.findById(id)
                const isMatched = await bcrypt.compare(op, user.password)
                //console.log(isMatched)
                if (!isMatched) {
                    req.flash('error', 'Current password is incorrect ')
                    res.redirect('/profile')
                } else {
                    if (np != cp) {
                        req.flash('error', 'Password and Confirm Password does not match')
                        res.redirect('/profile')
                    } else {
                        const newHashPassword = await bcrypt.hash(np, 10)
                        await UserModel.findByIdAndUpdate(id, {
                            password: newHashPassword
                        })
                        req.flash('success', 'Password Updated successfully ')
                        res.redirect('/profile')
                    }
                }
            } else {
                req.flash('error', 'All fields are required')
                res.redirect('/profile')
            }
        }catch(err){
            console.log(err);
        }
    }

    // static updateImage = async (req, res) => {
    //     try{
    //         const { id } = req.userData
    //         if (req.files) {
    //             const user = await UserModel.findById(id)
    //             const imageID = user.image.public_id
    //             // console.log(imageID)

    //             //deleting image from Cloudinary
    //             await cloudinary.uploader.destroy(imageID)
    //             //new image update
    //             const imagefile = req.files.image
    //             const imageupload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
    //                 folder: 'collabLab'
    //             })
    //             var data = {
    //                 image: {
    //                     public_id: imageupload.public_id,
    //                     url: imageupload.secure_url
    //                 }
    //             }
    //         }
    //         await UserModel.findByIdAndUpdate(id, data)
    //         req.flash('success', "Profile Updated successfully")
    //         res.redirect('/profile')
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
    static updateImage = async (req, res) => {
        try {
            const { id } = req.userData;
            if (req.files) {
                const user = await UserModel.findById(id);
                if (user.image && user.image.public_id) {
                    await cloudinary.uploader.destroy(user.image.public_id);
                }
                const imageFile = req.files.image;
                const imageUpload = await cloudinary.uploader.upload(imageFile.tempFilePath, {
                    folder: 'collabLab'
                });
                const data = {
                    image: {
                        public_id: imageUpload.public_id,
                        url: imageUpload.secure_url
                    }
                };
                await UserModel.findByIdAndUpdate(id, data);
                req.flash('success', "Profile image updated successfully");
            } else {
                req.flash('error', "No image uploaded");
            }
        } catch(err) {
            console.error(err);
            req.flash('error', "An error occurred while updating profile image");
        }
        res.redirect('/profile');
    }
    


    static logOut = async (req, res) => {
        try{
            res.clearCookie('token');
            req.flash('success','Successfully Logged Out.')
            res.redirect('/')
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = FrontController;
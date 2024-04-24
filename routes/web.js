const express = require('express');
const router = express.Router();
const checkUserAuth = require('../middleware/auth');
const FrontController = require('../controllers/FrontController');
const ContactController = require('../controllers/ContactController');
const ResourceController = require('../controllers/ResourceController');
const ChatController = require('../controllers/ChatController');

router.get('/' , FrontController.home)
router.get('/login' , FrontController.login)
router.get('/register' , FrontController.register)
router.get('/description' , FrontController.description)
//by mitra
router.get('/DSAdescription' , FrontController.DSAdescription)
router.get('/MLdescription' , FrontController.MLdescription);
router.get('/ejs/web-design.ejs' , FrontController.description);
router.get('/ejs/data-structures-&-algorithms.ejs' , FrontController.DSAdescription);
router.get('/ejs/machine-learning.ejs' , FrontController.MLdescription);





router.get('/contact' , FrontController.contact)
router.get('/topicListing' , FrontController.topicListing)
router.get('/messaging' , FrontController.messaging)

router.post('/userinsert', FrontController.userinsert)
router.post('/verifyLogin', FrontController.verifyLogin)
router.get('/logOut',FrontController.logOut)

router.post('/forgotPassword' , FrontController.forgetPasswordVerify)
router.get('/reset-password',FrontController.resetPassword)
router.post('/reset_Password1',FrontController.reset_Password1)

router.get('/profile',FrontController.profile) //checkuserAuth removed
router.post('/updateProfile',FrontController.updateProfile) //checkuserAuth removed
router.post('/updateImage',FrontController.updateImage) //checkuserAuth removed
router.post('/changePassword',FrontController.changePassword) //checkuserAuth removed

router.post('/contactUs',ContactController.contactUs)
// router.post('/contactUs/:id',checkUserAuth ,ContactController.contactUs)

router.post('/insertResource',ResourceController.insertResource)

router.post('/addDoubt',ChatController.addDoubt)

module.exports = router;
const express = require('express');
const router = express.Router();
const checkUserAuth = require('../middleware/auth');
const FrontController = require('../controllers/FrontController');
const ContactController = require('../controllers/ContactController');
const ResourceController = require('../controllers/ResourceController');
const ChatController = require('../controllers/ChatController');
const AdminController = require('../controllers/AdminController');


router.get('/' , FrontController.home)
router.get('/login' , FrontController.login)
router.get('/register' , FrontController.register)
router.get('/admin/dashboard' , AdminController.dashboard);

router.get('/description' , FrontController.description)
router.get('/DSAdescription' , FrontController.DSAdescription)
router.get('/MLdescription' , FrontController.MLdescription);
router.get('/web-design' , FrontController.description);
router.get('/data-structures-&-algorithms' , FrontController.DSAdescription);
router.get('/machine-learning' , FrontController.MLdescription);

router.get('/contact' , FrontController.contact)
router.get('/topicListing' , FrontController.topicListing)
router.get('/messaging' ,checkUserAuth, FrontController.messaging)

router.post('/userinsert', FrontController.userinsert)
router.post('/verifyLogin', FrontController.verifyLogin)
router.get('/logOut',FrontController.logOut)

router.post('/forgotPassword' , FrontController.forgetPasswordVerify)
router.get('/reset-password',FrontController.resetPassword)
router.post('/reset_Password1',FrontController.reset_Password1)

router.get('/profile',checkUserAuth,FrontController.profile)
router.post('/updateProfile',checkUserAuth,FrontController.updateProfile)
router.post('/updateImage',checkUserAuth,FrontController.updateImage)
router.post('/changePassword',checkUserAuth,FrontController.changePassword)

router.post('/contactUs',ContactController.contactUs)
// router.post('/contactUs/:id',checkUserAuth ,ContactController.contactUs)

router.post('/insertResource',ResourceController.insertResource)

router.post('/addDoubt',ChatController.addDoubt)

module.exports = router;
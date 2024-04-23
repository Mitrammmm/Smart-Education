const express = require('express');
const router = express.Router();
const checkUserAuth = require('../middleware/auth');
const FrontController = require('../controllers/FrontController');
const ContactController = require('../controllers/ContactController');

router.get('/' , FrontController.home)
router.post('/userinsert', FrontController.userinsert)
router.post('/verifyLogin', FrontController.verifyLogin)
router.get('/logOut',FrontController.logOut)

router.post('/forgotPassword' , FrontController.forgetPasswordVerify)
router.get('/reset-password',FrontController.resetPassword)
router.post('/reset_Password1',FrontController.reset_Password1)

router.post('/contactUs',ContactController.contactUs)
// route.post('/contactUs/:id',checkUserAuth ,ContactController.contactUs)

module.exports = router;
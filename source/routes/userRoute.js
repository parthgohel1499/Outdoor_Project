import express from 'express';
const router = express.Router();
import { RegUser, login, forgotPassword, HomeController, verifyToken, deleteAccount, contactUs } from '../controllers/userControllers';
import { sendMail, insertData } from '../controllers/newModelController';
import Validation from '../middleware/Uservalidator';


router.get('/home', HomeController);

router.post('/Register', Validation.authValidator('registration'), RegUser);

router.post('/login', login);

router.post('/forgotPassword', forgotPassword);

router.post('/verifyToken', verifyToken);

router.post('/newModelData', insertData);

router.post('/sendMail', sendMail);

router.post('/delete/account/:userId', deleteAccount);

router.post('/contactUs', contactUs)


module.exports = router;
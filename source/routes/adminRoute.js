import express from 'express';
const router = express.Router();
import { EditUser, viewUser, deleteUser, viewContactUs, deleteContactUs } from '../controllers/adminController';
import { adminAuthentication } from '../middleware/authToken';

router.get('/viewuser', adminAuthentication, viewUser);

router.delete('/deleteuser/:userId', adminAuthentication, deleteUser);

router.put('/editUser/:userId', adminAuthentication, EditUser);

router.get('/view/contactUs', adminAuthentication, viewContactUs);

router.delete('/delete/contactUs/:userId', adminAuthentication, deleteContactUs);

module.exports = router;
import express from 'express';
const router = express.Router();
import { addOrder, getOrders } from '../User/OrderController';
import multerImage from '../utils/imageUpload';

router.post('/Make-Orders', multerImage.upload.single('Image'), addOrder)

router.get('/view-orders', getOrders)

module.exports = router;
import express from 'express';
const router = express.Router();
import { addcategory, viewCategory, editCategory, deleteCategory } from './categorycontroller';
import multerImage from '../../utils/imageUpload';
import { adminAuthentication } from '../../middleware/authToken';

router.post('/addcategory',
    multerImage.upload.single('categoryImage'), adminAuthentication, addcategory)

router.get('/viewcategory', viewCategory)

router.put('/editcategory/:categoryId', adminAuthentication, multerImage.upload.single('categoryImage'), editCategory)

router.delete('/deletecategory/:categoryId', adminAuthentication, deleteCategory)

module.exports = router;    
import express from 'express';
const router = express.Router();
import { addArea, viewArea, deleteArea, editArea } from './areaController';
import { areaValidator } from '../../../source/middleware/areaValidation';
import { adminAuthentication } from '../../middleware/authToken'

router.post('/add-area', adminAuthentication, areaValidator('areaValidation'), addArea);

router.get('/view-area', viewArea);

router.delete('/delete-area/:areaId', adminAuthentication, deleteArea);

router.put('/edit-area/:areaId', adminAuthentication, editArea)

module.exports = router;
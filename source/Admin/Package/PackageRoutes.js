import express from 'express';
const router = express.Router();
import { addPackage, viewPackage, deletePackage, editPackage } from './PackageController'
import { adminAuthentication } from '../../middleware/authToken';

router.post('/add/package', adminAuthentication, addPackage);

router.get('/view/package', viewPackage);

router.delete('/delete/package/:packageId', adminAuthentication, deletePackage);

router.put('/edit/package/:packageId', adminAuthentication, editPackage);

module.exports = router;
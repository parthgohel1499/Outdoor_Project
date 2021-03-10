import { areaModel } from './area.model';
import { check, validationResult } from 'express-validator';
import { verifyObjectId } from '../../utils/verifyID';

async function addArea(req, res) {

    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation Error.');
            error.statusCode = 400;
            error.data = errors.array();
            throw error;
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        return res.send(error)
    }

    try {
        const { areaname, pincode } = req.body;

        const addArea = new areaModel({
            areaname: areaname,
            pincode: pincode
        })

        const isExist = await areaModel.findOne({ areaname: areaname })

        if (!isExist) {
            const insertarea = await addArea.save();

            if (!insertarea) {
                res.status(400).send({ message: "unable to insert data !", status: 400 });
            } else {
                res.status(200).send({ message: "data added successfully !", status: 200 });
            }
        } else {
            res.status(400).send({ message: "This area is already exist !", status: 400 });
        }

    } catch (error) {
        res.status(500).send({ mesage: "Internal Server error !", status: 500, error });
    }
}

async function viewArea(req, res) {

    try {
        const { areaId } = req.query;

        if (areaId) {
            if (verifyObjectId(areaId)) {
                const findId = await areaModel.findById({ _id: areaId })
                if (!findId) {
                    res.status(400).send({ message: "not exist !" })
                } else {
                    res.status(200).send({ message: "Area found successfully !", status: 200, data: findId })
                }
            } else {
                res.status(400).send({ message: "Incorrect UserId", status: 400, data: null })
            }
        } else {
            const getAllData = await areaModel.find();

            res.status(200).send({ message: "Data found Successfully !", status: 200, data: getAllData });
        }
    } catch (error) {
        res.status(500).send({ message: "Intrenal server error !", status: 500 });
    }
}

async function deleteArea(req, res) {
    try {
        const { areaId } = req.params;

        if (verifyObjectId(areaId)) {
            const isExist = await areaModel.findById({ _id: areaId });

            if (!isExist) {
                res.status(400).send({ message: "This Data is not exist !", status: 400 })
            } else {

                await areaModel.deleteOne({ _id: areaId })

                res.status(200).send({ message: "Data is deleted successfully !", status: 200 })
            }
        } else {
            res.status(400).send({ message: "Incorrect Id !" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", status: 500 });
    }

}

async function editArea(req, res) {

    try {
        const { areaId } = req.params;
        const { areaname, pincode } = req.body;

        if (verifyObjectId(areaId)) {

            const findArea = await areaModel.findOne({ _id: areaId })
            if (!findArea) {
                res.status(400).send({ message: "Area not found !" })
            } else {

                const checkArea = await areaModel.findOne({ areaname: areaname });

                if (!checkArea) {
                    const filter = { _id: areaId }
                    const update = {
                        areaname: areaname, pincode: pincode
                    }
                    await areaModel.updateOne(filter, update)

                    res.status(200).send({ message: "Area is updated successfully !", status: 200 });
                } else {
                    res.status(400).send({ message: "area is already exist !", status: 400, data: checkArea.areaname });
                }
            }
        } else {
            res.status(400).send({ message: "Incorrect Id !" });
        }
    } catch (error) {
        res.status(500).send({ message: error + "Internal Server Error !", status: 500 });
    }

}

export { addArea, viewArea, deleteArea, editArea }
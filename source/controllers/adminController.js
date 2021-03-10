import { RegModel } from '../models/RegModel';
import ContactUsModel from '../models/ContactUs.model'
import { verifyObjectId } from '../../source/utils/verifyID';
import { query } from 'express-validator';
require('dotenv').config();


async function viewUser(req, res) {

    try {
        const { userId } = req.query;
        const query = { _id: userId };

        if (userId) {
            if (verifyObjectId(userId)) {
                const viewData = await RegModel.CheckById(query)
                if (!viewData) {
                    throw {
                        status: 404,
                        message: "Data not found"
                    }
                } else {
                    res.status(200).send({ msg: "get Data successfully !", viewData });
                }
            } else {
                res.status(400).send({ message: "Incorrect UserId !", status: 400 })
            }
        } else {
            const viewData = await RegModel.findData()

            if (!viewData) {
                const response = { statusCode: 400, message: `unable to show data`, data: null };
                res.status(400).send(response);

            } else {
                const response = { statusCode: 200, message: `get all user ! `, data: viewData };
                res.status(200).send(response);
            }
        }
    } catch (error) {
        res.status(error.status || 500).send({ message: error.message, status: 500 })
    }
}

async function deleteUser(req, res) {

    const query = req.params.userId

    const isDeleted = RegModel.CheckById(query);
    console.log(isDeleted);

    try {
        const delUser = await RegModel.findAndDelete(query);

        if (!delUser) {
            res.status(400).send({ message: "enter valid id !", status: 400 });
        } else {
            res.status(200).send({ message: "user is deleted successfully !", status: 200 });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error Q", status: 500 });
    }
}

async function EditUser(req, res, next) {

    try {
        const userId = req.params.userId;

        if (userId) {
            if (verifyObjectId(userId)) {
                const filter = ({ _id: userId });
                const { username, dob, mobile, gender } = req.body;
                var update = {
                    dob: dob,
                    mobile: mobile,
                    username: username,
                    gender: gender
                }
                const FindUser = await RegModel.modifyOne(filter, update);
                if (!FindUser) {
                    res.status(400).send({ message: "User not found !", status: 400 });
                } else {
                    res.status(200).send({ message: "User detail is updated successfully !", status: 200 });
                }
            } else {
                res.status(400).send({ message: "Incorrect UserId !", status: 400 })
            }
        }
        else {
            res.status(400).send({ message: "Enter User Id !", status: 400 })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error !" });
    }
}

async function viewContactUs(req, res) {

    try {
        const { userId } = req.query;
        let query = { _id: userId }

        if (userId) {
            if (verifyObjectId(userId)) {
                const findUser = await ContactUsModel.verifyOne(query);

                if (!findUser) {
                    res.status(400).send({ message: "User not found !" })
                } else {
                    res.status(200).send({ message: "user found Successfull !", status: 200, data: findUser });
                }
            } else {
                res.status(400).send({ message: "Incorrect Id !", status: 200 })
            }
        } else {
            const listAllUser = await ContactUsModel.verify()

            if (!listAllUser) {
                res.status(400).send({ message: "unable to show data !" });
            } else {
                res.status(200).send({ message: "data found Successfully ! ", status: 200, data: listAllUser })
            }
        }
    } catch (error) {
        res.status(500).send({ message: error + "Internal server Error !", status: 500 });
    }
}

async function deleteContactUs(req, res) {

    try {
        const { userId } = req.params;
        let query = { _id: userId }

        if (verifyObjectId(userId)) {
            const removeData = await ContactUsModel.verifyIdAndDelete(query)

            if (!removeData) {
                res.status(400).send({ message: "unable to remove your data ! please check your Id !", status: 400, data: null });
            } else {
                res.status(200).send({ message: "Record Deleted successfully !", status: 200, data: null });
            }
        } else {
            res.status(400).send({ message: "Incorrect Id !", status: 400, data: null });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error !", status: 500 })
    }
}

export { EditUser, viewUser, deleteUser, viewContactUs, deleteContactUs }
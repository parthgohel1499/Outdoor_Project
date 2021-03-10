import { RegModel } from '../models/RegModel';
import contactUsModel from '../models/ContactUs.model';
import hashPassword from '../utils/passwordEncrypion';
import { validationResult } from 'express-validator';
import jwtToken from '../utils/jwtToken';
import SendMail from '../utils/sendMail';
import cryptoRandomString, { async } from 'crypto-random-string';


function HomeController(req, res) {
    res.send("Home Page !");
}

async function RegUser(req, res) {

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
            error.statusCode = 400;
        }
        return res.send(error)
    }

    const { username, email, dob, mobile, gender, password, resetToken } = req.body;

    const hash = hashPassword.encrypt(password);

    try {
        const data = await new RegModel({
            username: username,
            email: email,
            dob: dob,
            mobile: mobile,
            gender: gender,
            resetToken,
            password: hash
        });
        let query = { email: email }
        const checkEmail = await RegModel.checkEmail(query)

        if (!checkEmail) {
            const saveData = await data.save()
            if (!saveData) {
                throw new Error("unable to save data !");
            } else {
                res.status(200).send({ message: "Your data successfully added !", status: "success !", saveData })
                console.log("Added Data : ", saveData);
            }
        } else {
            res.send({ message: "user is already exist !" })
        }

    } catch (error) {
        res.status(400).send({ message: error.message });
        console.log(error);
    }
}

async function login(req, res) {

    try {
        const { password, email } = req.body;
        let query = { email: email }

        const fetchData = await RegModel.checkEmail(query)
        if (!fetchData) {
            throw {
                status: 404,
                message: 'email not found !'
            }
        } else if (fetchData.isDeleted == false) {
            const hash = hashPassword.decrypt(fetchData.password);
            if (hash == password) {

                const token = jwtToken.MakeToken(fetchData._id, fetchData.username, fetchData.isAdmin, fetchData.email);
                console.log("token :", token);
                res.status(200).send({ auth: true, token, status: 200 });

            } else {
                res.status(400).send({ message: "password is incorrect !", status: 400, data: null })
            }
        } else {
            res.status(400).send({ message: "sorry, your account is temporary disabled !", status: 400, data: null })
        }

    } catch (error) {
        res.status(error.status || 400).send({ message: "Something went wrong !", status: 404 });
    }
}

async function forgotPassword(req, res) {

    try {
        const RandomString = cryptoRandomString({ length: 20, type: 'url-safe' });

        const { email } = req.body;

        let filter = { email: email }
        let update = { resetToken: RandomString };

        const updateToken = await RegModel.verifyAndModify(filter, update);

        if (updateToken) {

            const mail = await SendMail.sMail(email, RandomString);

            res.status(200).send({ message: "mail sent !", mail, status: 200 });

        } else {
            throw new Error("Enter valid email !")
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

async function verifyToken(req, res) {

    try {
        const { token, password } = req.body;

        const hash = hashPassword.encrypt(password);

        let filter = { resetToken: token }
        let update = {
            password: hash, $unset: { resetToken: null }
        }

        const updatePassword = await RegModel.verifyAndModify(filter, update);

        if (!updatePassword) {
            throw new Error("Token is invalid ! ");
        } else {
            res.status(200).send({ message: "password is updated !", status: 200 });
        }
    } catch (error) {
        res.status(400).send({ message: error.message, status: 400 });
    }
}

async function deleteAccount(req, res) {

    try {
        const { userId } = req.params;

        let filter = { _id: userId }

        let update = { isDeleted: true }

        /* const isDeletedAc = RegModel.findById({ _id: userId }) */

        const fetchId = await RegModel.verifyIdAndModify(filter, update)

        if (!fetchId) {
            throw new Error("Invalid Id !");
        } else {
            res.status(200).send({ message: "Account is deleted !" });
        }

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

async function contactUs(req, res, next) {

    try {
        const { Fullname, email, message } = req.body;

        const ContactUsData = new contactUsModel({
            Fullname: Fullname,
            email: email,
            message: message
        })

        const insertData = await ContactUsData.save()

        if (!insertData) {
            throw new Error("unable to send data !")
        } else {
            res.status(200).send({ message: "Data Send Successfully !", status: 200, data: insertData })
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export { contactUs, HomeController, RegUser, login, forgotPassword, verifyToken, deleteAccount }


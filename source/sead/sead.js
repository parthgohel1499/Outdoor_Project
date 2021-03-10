import { RegModel } from '../models/RegModel';
import hashPassword from '../utils/passwordEncrypion';
import mongoose from 'mongoose';

require('dotenv').config({ path: '../../.env' });

try {
    const Connection = mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })

    if (!Connection) {
        console.log("unable to connect database !");
    } else {
        console.log("Connected to MongoDB Cloud Successfully !");
    }

    admin = async () => {
        const hash = hashPassword.encrypt(process.env.password);
        data = new RegModel({
            isAdmin: true,
            username: "Mitul",
            email: "mitulpatel1812@gmail.com",
            dob: "1998-09-18",
            mobile: 7016946821,
            gender: "male",
            password: hash
        });

        const checkEmail = await RegModel.findOne({ email: data.email })

        if (!checkEmail) {
            const saveData = await data.save()
            console.log("admin created successfully !", saveData);

        } else {
            console.log("user is already exist !");
        }
    }
} catch (error) {
    console.log("unable to run");
}
admin();

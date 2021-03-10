const { async } = require('crypto-random-string');
import DemoModel from '../models/demoModel';
import nodemailer from 'nodemailer';

async function insertData(req, res) {
    const { bookName, realeaseDate, language, b_author, b_price, b_qty } = req.body;

    saveData = new DemoModel(
        req.body
    )

    //res.send({ meesage: "data added !", saveData })

    const Data = await saveData.save();

    if (!Data) {
        res.json({ message: "unable to add data !" })
    } else {
        res.send({ meesage: "data added !", saveData })
    }

}

function sendMail() {
    try {
        var sender = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'parthgohel984298@gmail.com',
                pass: 'ozhlkjoidyrjvwkg'
            }
        });

        var mail = {
            from: "parthgohel984298@gmail.com",
            to: "ajghl1399@gmail.com",
            subject: "Sending Email using Node.js",
            text: "demo email"
        };

        sender.sendMail(mail, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent successfully: "
                    + info.response);
            }
        });
    } catch (error) {
        console.log("something went wrong !");
    }

}

export { insertData, sendMail }
import nodemailer from 'nodemailer';
require('dotenv').config();

// send mail with defined transport object
exports.sMail = (email, RandomString) => {

    var sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'parthgohel984298@gmail.com',
            pass: 'ozhlkjoidyrjvwkg'
        }
    });

    var mail = {
        from: "parthgohel984298@gmail.com",
        subject: "From Outdoor Kings , for update password !",
        to: email,
        html: `link to create new password : http://localhost:3030/forgot verification code : ${RandomString}`
    };

    console.log("email sent !");
    //res.send({ message: " email sent !" });

    sender.sendMail(mail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.send({ message: " email sent !" })
            console.log("Email sent successfully: "
                + info.response);
        }
    });
}



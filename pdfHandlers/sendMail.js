const nodemailer = require('nodemailer');
require('dotenv').config()
const createPDF = require('./createPDF');

let emailClient = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

const sendEmail = async(user) =>{
    let pdfOutput = await createPDF(user);
    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Monthly Expense Report",
        text: "Please find the attached PDF file for your monthly expense report.",
        attachments: [
            {
                filename: "MonthlyExpenseReport.pdf",
                path: pdfOutput,
            }
        ]
    };
    try{
        emailClient.sendMail(mailOptions);
    }
    catch(err){
        console.log(err);
    }
}

module.exports = sendEmail;
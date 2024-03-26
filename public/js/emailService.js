const nodemailer = require('nodemailer');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'teachertrek2023@gmail.com',
        pass: 'wclg ztmp wxeo gwsb'
    }
});

// Function to send email notification
const sendEmailNotification = (toEmail, subject, text) => {
    const mailOptions = {
        from: 'teachertrek2023@gmail.com',
        to: toEmail,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email notification error:', error);
        } else {
            console.log('Email notification sent:', info.response);
        }
    });
};

module.exports = sendEmailNotification;

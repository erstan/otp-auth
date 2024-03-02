const nodemailer = require('nodemailer');

const sendEmail = async (senderEmail, senderPassword, recipientEmail, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });

    const mailObject = {
      from: process.env.MAIL_USERNAME,
      to: recipientEmail,
      subject: subject,
      text: body
    };
    
    await transporter.sendMail(mailObject);
  } catch (err) {
    console.log(`Failed to send the email to ${recipientEmail}`);
    console.error(err.message);
  }
}

module.exports = sendEmail;

const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey("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");
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


// This is my config.env file where i define SENDGRID_API_KEY:SENDGRID_API_KEY=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 .Why does this error message appear on the console? API key does not start with "SG.".








const sendEmail = async (mailOptions) => {
    try {
      await sgMail.send(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error(error);
    }
  };

// const sendEmail = async(mailOptions) =>{
//     let transporter = nodemailer.createTransport({
//         host : process.env.SMTP_HOST,
//         port : process.env.SMTP_PORT,
//         auth : {
//             user : process.env.SMTP_USER,
//             pass : process.env.SMTP_PASS
//         }
//     });

//     let info = await transporter.sendMail(mailOptions);
//     console.log(`Message Sent : ${info.messageId}`);
// };

module.exports = sendEmail;
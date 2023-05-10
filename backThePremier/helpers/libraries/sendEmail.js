const sgMail = require('@sendgrid/mail');











const sendEmail = async (mailOptions) => {

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
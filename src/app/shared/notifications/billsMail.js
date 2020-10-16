const nodemailer = require("nodemailer");


async function notifyBillTransaction(reqBody){
    const  transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "devmail236@gmail.com", // custom domain
          pass: "test1234>", // mail password
        },
      });
      const mailConfig = {
        from: 'devmail236@gmail.com',
        to: 'lordoadjaro@gmail.com', // to be changed to reqBody.email
        subject: 'PASSWORD RESET SUCCESFULLY',
        html: `
        <h1>Dear ${reqBody.username}</h1>
        <p>you</p>
        <p></p>
        `
      };

       return transporter.sendMail(mailConfig, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}



module.exports = {
    notifyBillTransaction
}
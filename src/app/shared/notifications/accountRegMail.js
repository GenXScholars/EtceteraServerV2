const nodemailer = require("nodemailer");


async function notifyAccountReg(reqBody){
    const  transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "devmail236@gmail.com", // custom domain
          pass: "test1234>", // mail password
        },
      });
      const mailConfig = {
        from: 'devmail236@gmail.com',
        to: 'lordoadjaro@gmail.com', // to be changed to user.email
        subject: 'Account was Created Successfully',
        html: `
        <h1>Dear: ${reqBody.username}</h1>
        <p>your vinebill account was created successfully</p>
        <p>YOUR DETAILS ARE: <br></p>
        <p>UserName: ${reqBody.username}</p>
        <p>Password: ${reqBody.password}</p>
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
    notifyAccountReg
}
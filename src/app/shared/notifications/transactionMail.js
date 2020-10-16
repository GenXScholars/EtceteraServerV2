const nodemailer = require("nodemailer");


async function sendCreditTransaction(reqBody){
    const  transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "adjaro.ogaga@gmail.com", // custom domain
          pass: "1986LORDo", // mail password
        },
      });
      const mailConfig = {
        from: 'devmail236@gmail.com',
        to: 'lordoadjaro@gmail.com', // to be changed to user.email
        subject: 'YOUR WALLET WAS CREDITED',
        html: `
        <h1>Dear ${user.username}</h1>
        <p>Bellow are the details of the credit transaction </p>
        <p>wallet holder: ${reqBody.password}</p>
        <p>Amount Credited: ${reqBody.amount}</p>
        <p>WalletBalance: ${reqBody.RecipientWalletBalance}</p>
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


async function sendDebitTransaction(){
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
        subject: 'YOUR WALLET WAS CREDITED',
        html: `
        <h1>Dear ${user.username}</h1>
        <p>Bellow are the details of the debit transaction </p>
        <p>wallet holder: ${reqBody.password}</p>
        <p>Amount Debited: ${reqBody.amount}</p>
        <p>WalletBalance: ${reqBody.availableBalance}</p>
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

async function sendTransferToBankTransaction(){
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
      subject: 'YOUR WALLET WAS CREDITED',
      html: `
      <h1>Dear ${user.username}</h1>
      <p>Bellow are the details of the debit transaction </p>
      <p>wallet holder: ${reqBody.password}</p>
      <p>Amount Debited: ${reqBody.amount}</p>
      <p>WalletBalance: ${reqBody.availableBalance}</p>
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
  sendCreditTransaction,
  sendDebitTransaction
}
const nodemailer = require("nodemailer");

const defaultMsg = "You haven't set a pin"
async function notifyWalletCreation(reqBody){
    const  transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "adjaro.ogaga@gmail.com", // custom domain
          pass: "1986LORDo", // mail password
        },
      });
      const mailConfig = {
        from: 'support@vinebill.com',
        to: `${reqBody.Email}`, // to be changed to user.email
        subject: 'Wallet Created Successfully',
        html: `
        <div style="background-color:blue;text-align:center;">
          <h1>Dear: ${reqBody.AccountName}</h1>
          <p>your vinebill wallet created successfully</p>
          <p>YOUR DETAILS ARE: <br></p>
          <p>Wallet Name: ${reqBody.AccountName}</p>
          <p>WalletBalance: ${reqBody.AvailableBalance}</p>
          <p>WalletPin: ${reqBody.walletPin || defaultMsg }</p>
        </div>  
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

async function notifyWalletPinSet(reqBody){
  const  transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adjaro.ogaga@gmail.com", // custom domain
        pass: "1986LORDo", // mail password
      },
    });
    const mailConfig = {
      from: 'support@vinebill.com',
      to: `${reqBody.Email}`, // to be changed to user.email
      subject: 'Wallet Pin set Successfully',
      html: `
      <div style="background-color:blue;text-align:center;">
        <h1>Dear: ${reqBody.AccountName}</h1>
        <p>your vinebill wallet created successfully</p>
        <p>YOUR DETAILS ARE: <br></p>
        <p>Wallet Name: ${reqBody.AccountName}</p>
        <p>WalletBalance: ${reqBody.AvailableBalance}</p>
        <p>WalletPin: ${reqBody.walletPin || defaultMsg }</p>
        <p>please do not disclose this pin to anyone</p><br>
        <hr>
        <p>VINEBILL.COM</p>
      </div>  
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

async function notifyWalletPasswordSet(reqBody){
  const  transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adjaro.ogaga@gmail.com", // custom domain
        pass: "1986LORDo", // mail password
      },
    });
    const mailConfig = {
      from: 'support@vinebill.com',
      to: `${reqBody.Email}`, // to be changed to user.email
      subject: 'Wallet Password set Successfully',
      html: `
      <div style="background-color:blue;text-align:center;">
        <h1>Dear: ${reqBody.AccountName}</h1>
        <p>your vinebill wallet created successfully</p>
        <p>YOUR DETAILS ARE: <br></p>
        <p>Wallet Name: ${reqBody.AccountName}</p>
        <p>WalletBalance: ${reqBody.AvailableBalance}</p>
        <p>WalletPin: ${reqBody.walletPassword || defaultMsg }</p>
        <p>please do not disclose this pin to anyone</p><br>
        <hr>
        <p>VINEBILL.COM</p>
      </div>  
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
    notifyWalletCreation,
    notifyWalletPinSet,
    notifyWalletPasswordSet
}
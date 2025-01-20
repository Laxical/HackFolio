const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.gmail_auth_mail,
      pass: process.env.gmail_auth_pass
    }
});

async function donation_success(recieverID, amount) {
    

    const info = await transporter.sendMail({
      from: `"hackfolio " <jananathan.m22@iiits.in>`,
      to: `${recieverID}`,
      subject: "Confirmation of Donation ",
      text: `Your Donation of RS ${amount} is successful the receipt is attached with this Mail . Thank You for being a part of making a change :>`,
    });
    
  
  }

  async function sendOtp(receiverEmail, otp) {
    const mailOptions = {
      from: '"hackfolio" <jananathan.m22@iiits.in>',
      to: receiverEmail,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    };
  
    await transporter.sendMail(mailOptions);
  }
  module.exports={
    donation_success,
    sendOtp
  }
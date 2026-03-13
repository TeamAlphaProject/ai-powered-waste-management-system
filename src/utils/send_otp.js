const nodemailer = require("nodemailer");

const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  console.log("Using Email:", process.env.EMAIL);

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}`
    });
    console.log("OTP sent successfully");
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};

module.exports = sendOTP;
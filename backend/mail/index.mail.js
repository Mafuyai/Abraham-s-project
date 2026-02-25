const nodemailer = require("nodemailer");
const { REGISTER_TEMPLATE } = require("./template/register.template");
const { OTP_TEMPLATE } = require("./template/otp.template");
const { SIGNIN_TEMPLATE } = require("./template/signin.template");
const {
  VERIFY_SUCCESS_TEMPLATE,
} = require("./template/verify.success.template");
const {
  VERIFICATION_EMAIL_TEMPLATE,
} = require("./template/verifyToken.template");

const sendEmail = async (option) => {
  console.log("Attempting to send email...");

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    logger: true,
    debug: true,
  });

  // Get the correct template
  let htmlContent;
  switch (option.type) {
    case "verification":
      htmlContent = VERIFICATION_EMAIL_TEMPLATE(
        option.message.otp,
        option.message.name
      );
      break;
    case "register":
      htmlContent = REGISTER_TEMPLATE(
        option.message.name,
        option.message.email
      );
      break;
    case "otp":
      htmlContent = OTP_TEMPLATE(option.message.name, option.message.otp);
      break;
    case "signin":
      htmlContent = SIGNIN_TEMPLATE(
        option.message.name,
        option.message.time,
        option.message.device
      );
      break;
    case "verifySuccess":
      htmlContent = VERIFY_SUCCESS_TEMPLATE(option.message.name);
      break;
    default:
      throw new Error("Invalid email template type");
  }

  try {
    const info = await transporter.sendMail({
      from: `"${process.env.MAIL_NAME}" <${process.env.MAIL_USER}>`,
      to: option.to,
      subject: option.subject,
      html: option.html || htmlContent,
    });
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};

module.exports = sendEmail;

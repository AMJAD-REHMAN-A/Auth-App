import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendMail = async ({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
       if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
       } else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId, {forgetPasswordToken: hashedToken, forgetPasswordTokenExpiry: Date.now() + 3600000})
       }
       const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f5547a97bb0af9",
          pass: "0d79af1c02710e"
        }
      });

      const mailOptions = {
        from: "mjdrehman@gmail.com",
        to: "mjdrehman@gmail.com",
        subject: "test mailer",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
      }

      const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;
    } catch (error: any) {
        throw new Error(error.message);
        
    }
    
}
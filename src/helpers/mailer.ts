import User from "@/models/user.models";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import fs from "fs/promises";
import path from "path";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const templatePath = path.join(
      process.cwd(),
      "src",
      "templates",
      emailType === "VERIFY" ? "verifyEmail.html" : "resetPassword.html"
    );

    let htmlContent = await fs.readFile(templatePath, "utf-8");

    htmlContent = htmlContent.replace(
      /\${process\.env\.DOMAIN}/g,
      process.env.DOMAIN || ""
    );
    htmlContent = htmlContent.replace(/\${hashedToken}/g, hashedToken);

    const mailOptions = {
      from: "test@email.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: htmlContent,
    };

    return await transport.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

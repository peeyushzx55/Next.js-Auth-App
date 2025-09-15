import User from "@/models/user.models";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import fs from "fs/promises";
import path from "path";

interface SendVerificationEmailParams {
  email: string;
  userId: string;
}

export const sendVerificationEmail = async ({
  email,
  userId,
}: SendVerificationEmailParams) => {
  try {
    // Generate verification token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update user with verification token
    await User.findByIdAndUpdate(userId, {
      verifyToken: hashedToken,
      verifyTokenExpiry: Date.now() + 3600000, // Token expires in 1 hour
    });

    // Create email transport
    const transport = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    // Read email template
    const templatePath = path.join(
      process.cwd(),
      "src",
      "templates",
      "verifyEmail.html"
    );
    let htmlContent = await fs.readFile(templatePath, "utf-8");

    // Replace template variables
    htmlContent = htmlContent.replace(
      /\${process\.env\.DOMAIN}/g,
      process.env.DOMAIN || ""
    );
    htmlContent = htmlContent.replace(/\${hashedToken}/g, hashedToken);

    // Send verification email
    const mailOptions = {
      from: "test@email.com",
      to: email,
      subject: "Verify your email",
      html: htmlContent,
    };

    return await transport.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

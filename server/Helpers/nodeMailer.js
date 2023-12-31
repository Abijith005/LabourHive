import nodemailer from "nodemailer";

export async function sentOtp(email, otp) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
      port: 465, // Port for SMTP (usually 465)
      secure: true,
      tls: {
        rejectUnauthorized: false,
      }, // Usually true if connecting to port 465
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.PASSWORD, // Password (for gmail, your app password)
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Labour Hive Email Verification",
      html: `
          <h1>Verify Your Email For Labour Hive</h1>
            <h3>use this code to verify your email</h3>
            <h2>${otp}</h2>
          `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("email sent error ", error);
        reject(error);
      } else {
        console.log("email sent successfull");
        resolve(otp);
      }
    });
  } catch (error) {
    console.log("Error", error);
  }
}

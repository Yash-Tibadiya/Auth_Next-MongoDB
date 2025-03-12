import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailOptions) => {
  try {
    // TODO: configure mail for usage
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 465,
      secure: true,
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions = {
      from: "ymtibadiya@enacton.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset Your PassWord",
      html: "<b>Hello world?</b>",
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

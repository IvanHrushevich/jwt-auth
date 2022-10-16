const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(emailTo, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: emailTo,
      subject: "Account activation on " + process.env.API_URL,
      text: "1",
      html: `
          <div>
              <h1>To activate your account follow the link:</h1>
              <a href="${link}">${link}</a>
          </div>
        `,
    });

    return null;
  }
}

module.exports = new MailService();

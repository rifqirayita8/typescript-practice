import nodemailer from 'nodemailer';

export const sendWelcomeEmail= async(to:string, username:string) => {
  const transporter= nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions= {
    from: process.env.EMAIL,
    to,
    subject: 'Selamat Bergabung!',
    html: `<h1>Selamat datang, ${username}!</h1><p>Terima kasih telah bergabung dengan kami.</p>`
  };

  await transporter.sendMail(mailOptions);
}

export const sendOtpEmail= async(to: string, subject: string, html:string) => {
  const transporter= nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions= {
    from: process.env.EMAIL,
    to,
    subject,
    html
  };

  await transporter.sendMail(mailOptions);
}

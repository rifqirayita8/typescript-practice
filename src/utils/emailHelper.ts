import nodemailer from 'nodemailer';

export const sendWelcomeEmail= async(to:string, username:string) => {
  const transporter= nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: 'Selamat Bergabung di RkomKampus!',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
        <h2 style="color: #4CAF50;">Halo, ${username} 👋</h2>
        <p>Selamat datang di <strong>RkomKampus</strong> – platform terbaik untuk membantumu memilih perguruan tinggi impian! 🎓</p>
        <p>Kami sangat senang kamu telah bergabung. Jelajahi berbagai universitas, temukan jurusan yang tepat, dan capai cita-citamu bersama kami.</p>
        <p style="margin: 20px 0;">
          <a href="https://university-app-fe.vercel.app/" style="
            display: inline-block;
            padding: 12px 24px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
          ">
            Mulai Sekarang
          </a>
        </p>
        <p>Kalau ada pertanyaan, jangan ragu buat hubungi kami kapan saja.</p>
        <p>Salam hangat,<br/>Tim RkomKampus</p>
      </div>
    `
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

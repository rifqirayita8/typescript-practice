var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodemailer from 'nodemailer';
export const sendWelcomeEmail = (to, username) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer.createTransport({
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
    yield transporter.sendMail(mailOptions);
});
export const sendOtpEmail = (to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        html
    };
    yield transporter.sendMail(mailOptions);
});

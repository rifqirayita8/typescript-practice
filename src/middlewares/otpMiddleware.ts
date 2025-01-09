import rateLimit from "express-rate-limit";

const otpRateLimiter= rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: {
    status: false,
    message: 'Anda telah melebihi batas percobaan. Silahkan coba lagi dalam 1 jam'
  },
  standardHeaders: true,
  legacyHeaders: false,
})

export default otpRateLimiter;
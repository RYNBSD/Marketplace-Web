export default {
  NODE: {
    PORT: process.env.PORT,
    ENV: process.env.NODE_ENV,
  },
  COOKIE: {
    SECRET: process.env.COOKIE_SECRET,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
  },
  SESSION: {
    SECRET: {
      KEY: process.env.SESSION_SECRET_KEY,
      IV: process.env.SESSION_SECRET_IV,
    },
  },
  MAIL: {
    USER: process.env.MAIL_USER,
    PASS: process.env.MAIL_PASS,
  },
  NEXT: {
    URL: process.env.NEXT_URL ?? process.env.VERCEL_URL,
  },
} as const;

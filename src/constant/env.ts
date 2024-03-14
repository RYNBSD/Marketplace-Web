export default {
  NODE: {
    ENV: process.env.NODE_ENV,
  },
  BASE: {
    URL: process.env.BASE_URL,
  },
} as const;

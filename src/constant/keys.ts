export default {
  HTTP: {
    HEADERS: {
      CSRF: "X-CSRF-Token",
      JWT: "X-JWT-Token",
      USER_ID: "X-User-Id",
      ACCESS_TOKEN: "Access-Token",
    },
  },
  COOKIE: {
    JWT: "jwt",
    SESSION: "session",
    AUTHORIZE: "authorize",
  },
  GLOBAL: {
    PUBLIC: "public",
    UPLOADS: "uploads",
    IMAGES: "images",
    MODELS: "models",
  },
  BROWSER: {
    LOCALE_STORAGE: {
      SETTING: "setting",
      CART: "cart",
    },
  },
} as const;

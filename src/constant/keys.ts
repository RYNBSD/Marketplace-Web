export default {
  BASE_URL: "http://localhost:8000",
  API_VERSION: "/v1",
  HTTP: {
    HEADERS: {
      // CSRF: "X-CSRF-Token",
      // JWT: "X-JWT-Token",
      // USER_ID: "X-User-Id",
      ACCESS_TOKEN: "Access-Token",
    },
  },
  COOKIE: {
    SESSION: "session",
    AUTHORIZATION: "authorization",
  },
  GLOBAL: {
    PUBLIC: "public",
  },
  BROWSER: {
    LOCALE_STORAGE: {
      SETTING: "setting",
      CART: "cart",
    },
  },
  INPUT: {
    // CSRF: "csrf",
    ACCESS_TOKEN: "access-token",
    IMAGE: "image"
  }
} as const;
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "production" | "development" | "test";
      BASE_URL: string;
    }
  }
}

export {};

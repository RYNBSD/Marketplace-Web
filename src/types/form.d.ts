export type ResponseState =
  | {
      success: false;
      error: string;
    }
  | { success: true; data: any };

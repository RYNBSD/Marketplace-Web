export type FormState =
  | {
      success: false;
      error: string;
    }
  | { success: true; data: unknown };

export type ApiError = {
  message: string;
  status: number;

  errors?: {
    formErrors?: string[];
    fieldErrors?: Record<string, string[]>;
  };
};

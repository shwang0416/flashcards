export type Errors = "INVALID_EMAIL" | "INVALID_PASSWORD";

export type ErrorTypes = {
  [key in Errors]: {
    message: string;
  };
};

type Errors = "INVALID_EMAIL" | "INVALID_PASSWORD";

type ErrorTypes = {
  [key in Errors]: {
    message: string;
  };
};

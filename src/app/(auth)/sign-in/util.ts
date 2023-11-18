import { ErrorTypes } from "../types";

export const validateEmail = (email: string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};

export const validatePassword = (password: string) => {
  //영어소문자, 숫자 포함 8자 이상의 비밀번호
  if (password.match(/(?=.*\d)(?=.*[a-z]).{8,}/)) return true;
  return false;
};

export const SIGN_IN_ERRORS: ErrorTypes = {
  INVALID_EMAIL: {
    message: "올바른 형식의 이메일을 입력해주세요",
  },
  INVALID_PASSWORD: {
    message: "비밀번호는 영어소문자, 숫자 포함 8자 이상이어야 합니다",
  },
};

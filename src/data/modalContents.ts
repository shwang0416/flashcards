import { ModalContents } from "@/components/Modal";

type ErrorFormat = `error${number}${number}${number}`;
type Cases = "success" | "error" | ErrorFormat;
type ModalCases = {
  [key in Cases]: ModalContents;
};

export const SIGNIN_MODAL_CONTENTS: Partial<ModalCases> = {
  success: {
    title: "EMAIL SENT",
    description: [
      "입력한 이메일로 인증 요청을 보냈습니다",
      "메일의 링크를 클릭해 가입을 완료해주세요",
    ],
    buttonText: "닫기",
  },
  error400: {
    title: "Invalid login credentials",
    description: [
      "로그인 정보가 잘못되었습니다",
      "아이디 또는 비밀번호를 확인해주세요",
    ],
    buttonText: "닫기",
  },
  error: {
    title: "ERROR",
    description: ["에러가 발생했습니다", "새로 고침 후 다시 시도해주세요"],
    buttonText: "닫기",
  },
};
export const UPDATE_PASSWORD_MODAL_CONTENTS: Partial<ModalCases> = {
  success: {
    title: "UPDATE PASSWORD SUCCEED",
    description: [
      "비밀번호 초기화가 완료되었습니다",
      "새로운 비밀번호로 로그인해주세요",
    ],
    buttonText: "닫기",
  },
  error: {
    title: "UPDATE PASSWORD ERROR",
    description: ["에러가 발생했습니다", "새로 고침 후 다시 시도해주세요"],
    buttonText: "닫기",
  },
};
export const RESET_PASSWORD_MODAL_CONTENTS: Partial<ModalCases> = {
  success: {
    title: "EMAIL SENT",
    description: [
      "입력한 이메일로 비밀번호 초기화 링크를 보냈습니다",
      "메일의 링크를 클릭해주세요",
    ],
    buttonText: "닫기",
  },
  error: {
    title: "RESET PASSWORD",
    description: ["에러가 발생했습니다", "새로 고침 후 다시 시도해주세요"],
    buttonText: "닫기",
  },
};
export const CARDS_BOX_MODAL_CONTENTS: ModalCases = {
  success: {
    title: "EMAIL SENT",
    description: [
      "입력한 이메일로 비밀번호 초기화 링크를 보냈습니다",
      "메일의 링크를 클릭해주세요",
    ],
    buttonText: "닫기",
  },
  error: {
    title: "CARD NOTFOUND",
    description: ["카드를 찾을 수 없습니다"],
    buttonText: "닫기",
  },
};

export const SIGNUP_MODAL_CONTENTS: ModalCases = {
  success: {
    title: "EMAIL SENT",
    description: [
      "입력한 이메일로 인증 요청을 보냈습니다",
      "메일의 링크를 클릭해 가입을 완료해주세요",
    ],
    buttonText: "닫기",
  },
  error: {
    title: "ERROR",
    description: ["에러가 발생했습니다", "새로 고침 후 다시 시도해주세요"],
    buttonText: "닫기",
  },
};

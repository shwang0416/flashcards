import { ModalContents } from "@/components/Modal";

type Cases = "success" | "error";
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
  error: {
    title: "ERROR",
    description: ["에러가 발생했습니다", "새로 고침 후 다시 시도해주세요"],
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

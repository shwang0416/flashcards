// "use server";

// type State = {
//   message: string | null;
//   type: string | null;
// };
// const CardFormSubmitAction = async (state: State, formData: FormData) => {
//   const questionTitle = formData.get("question_title") as string;
//   const questionContents = formData.get("question_contents") as string;
//   const answerContents = formData.get("answer") as string;

//   if (!questionTitle || !questionContents || !answerContents) {
//     alert("내용을 모두 입력해주세요");
//     return {
//       message: "내용을 모두 입력해주세요",
//       type: "내용을 모두 입력해주세요",
//     };
//   }
//   // FIXME: loading state

//   await submitCallback({
//     questionTitle,
//     questionContents,
//     answerContents,
//     tags: localTags,
//   });

//   return {
//     message: "내용을 모두 입력해주세요",
//     type: "내용을 모두 입력해주세요",
//   };
// };

// export default CardFormSubmitAction;

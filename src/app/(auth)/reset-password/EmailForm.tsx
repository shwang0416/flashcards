"use client";

type EmailFormProps = {
  authCallback: ({ email }: { email: string }) => Promise<void>;
  buttonText: string;
};
const EmailForm = ({ authCallback, buttonText }: EmailFormProps) => {
  const formHandler = async (formData: FormData) => {
    const email = formData.get("email") as string;

    if (!email) alert("정보를 다 입력하세요");

    await authCallback({ email });
  };
  return (
    <div className="div">
      <form action={formHandler}>
        <div className="">
          <label htmlFor="email">email</label>
          <input id="email" name="email" type="text" />
        </div>
        <div className="">
          <input
            type="submit"
            value={buttonText}
            className="font-semibold bg-pink-300 p-3 rounded-xl hover:bg-pink-400 cursor-pointer text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default EmailForm;

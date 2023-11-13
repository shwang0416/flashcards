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
    <div className="w-80">
      <form action={formHandler} className="flex flex-col gap-16">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-gray-500">
            email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            className="h-12 rounded-lg"
          />
        </div>
        <div className="">
          <input
            type="submit"
            value={buttonText}
            className="font-semibold w-full bg-pink-300 p-3 rounded-xl hover:bg-pink-400 cursor-pointer text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default EmailForm;

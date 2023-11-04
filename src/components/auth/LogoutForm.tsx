"use client";

import signOutAction from "@/adaptor/serverActions/auth/signoutAction";
import { useRouter } from "next/navigation";

const LogoutForm = () => {
  const router = useRouter();
  const signout = async () => {
    const { error } = await signOutAction();
    if (error) {
      throw new Error("ERROR: Logout failed");
    }

    router.push("/sign-in");
  };

  return (
    <>
      <form>
        <input
          formAction={signout}
          className="text-white cursor-pointer"
          type="submit"
          value="Logout"
        />
      </form>
    </>
  );
};

export default LogoutForm;

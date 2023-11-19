import { redirect } from "next/navigation";

// export const dynamic = "force-dynamic";

const RootPage = async () => {
  redirect("/daily-check-in");
};

export default RootPage;

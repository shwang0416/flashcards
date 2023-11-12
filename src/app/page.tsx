export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";

const RootPage = async () => {
  redirect("/daily-check-in");
};

export default RootPage;

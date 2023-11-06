export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";

const RootPage = async () => {
  redirect("/play-cards");
};

export default RootPage;

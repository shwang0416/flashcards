import { redirect } from "next/navigation";

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  redirect(`/play-cards/card/${id}/front`);
};

export default Page;

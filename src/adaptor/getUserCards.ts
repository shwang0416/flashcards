import supabase from "@/lib/supabase/supabase-service-role-client";

const getUserCards = async (userId: string): Promise<string[]> => {
  const { data: UserCards, error } = await supabase
    .from("UserCards")
    .select("card_id")
    .eq("user_id", userId);
  if (error) throw new Error("ERROR: getUserCards failed");
  return UserCards?.map((elem) => elem.card_id);
};

export default getUserCards;

import supabase from "@/lib/supabase/supabase-service-role-client";

const deleteUserCard = async (cardId: string) => {
  const { error } = await supabase
    .from("UserCards")
    .delete()
    .eq("card_id", cardId);
  if (error) {
    throw new Error("ERROR: deleteUserCard failed");
  }
};

export default deleteUserCard;

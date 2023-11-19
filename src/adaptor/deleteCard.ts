import supabase from "@/lib/supabase/supabase-service-role-client";

const deleteCard = async (cardId: string) => {
  const { error } = await supabase.from("Card").delete().eq("id", cardId);
  if (error) {
    throw new Error("ERROR: deleteCard failed");
  }
};

export default deleteCard;

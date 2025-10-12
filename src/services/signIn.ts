import supabase from "../utils/supabase";

const checkEmailExists = async (email: string) => {
  const { data, error } = await supabase.from("profiles").select("*").eq("email", email).single();

  if (error && error.code !== "PGRST116") {
    console.error("Supabase error:", error);
    return false;
  }

  return data;
};

export { checkEmailExists };

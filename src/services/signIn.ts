import supabase from "../utils/supabase";

const checkEmailExists = async (email: string) => {
  const { data, error } = await supabase.from("profiles").select("*").eq("email", email).single();

  if (error && error.code !== "PGRST116") {
    console.error("Supabase error:", error);
    return false;
  }

  return !!data;
};

const checkHandleExists = async (handle: string, uid: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("handle", handle)
    .neq("uid", uid)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Supabase error:", error);
    return false;
  }

  return !!data;
};

const googleLoginHandler = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (error) throw error;
};

export { checkEmailExists, checkHandleExists, googleLoginHandler };

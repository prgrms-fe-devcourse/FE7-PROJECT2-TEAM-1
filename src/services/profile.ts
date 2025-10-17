import supabase from "../utils/supabase";

const getUserPostsAPI = async (uid: string) => {
  try {
    const { data, error } = await supabase.from("posts").select("*").eq("user_id", uid);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getUserPostsAPI };

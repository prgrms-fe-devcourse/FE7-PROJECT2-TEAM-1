import supabase from "../utils/supabase";

const deletePostAPI = async (uid: string) => {
  try {
    const { data, error } = await supabase.from("posts").delete().eq("uid", uid);
    if (error) throw error;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { deletePostAPI };

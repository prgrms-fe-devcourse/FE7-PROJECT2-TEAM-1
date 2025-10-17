import supabase from "../utils/supabase";

export async function getProfile(userId: string) {}

export async function getPostByUid(postId: string) {
  const { data, error } = await supabase.from("posts").select("*").eq("uid", postId).single();
  if (error) throw error;
  return data as Post | null;
}

export async function getAuthorByPostId(postId: string) {
  const { data: postRow } = await supabase
    .from("posts")
    .select("user_id")
    .eq("uid", postId)
    .single();
  const userId = postRow?.user_id;
  if (!userId) throw new Error("작성자를 찾을 수 없습니다.");

  const { data: profile } = await supabase
    .from("profiles")
    .select("profile_img, username, handle")
    .eq("uid", userId)
    .single();
  return profile as Profile;
}

export async function getVotesByOptionId(optionId: string) {
  const { count, error } = await supabase
    .from("votes")
    .select("*", { count: "exact", head: true })
    .eq("option_id", optionId);
  if (error) throw error;
  return count ?? 0;
}

// export async function getLikeByPostId(postId: string) {
//   const { data: likes } = await supabase.from("likes").select("*").eq("post_id", postId).single();
//   return likes;
// }

export async function getCommentsByPostId(postId: string) {
  const { data, error } = await supabase
    .from("comments")
    .select(
      "uid, created_at, user_id, post_id, comment_content, report_count, is_visible, profiles(username, handle, profile_img)",
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as CommentWithProfile[];
}

// export async function getProfileByUserId(userId: string) {
//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("profile_img, username, handle")
//     .eq("uid", userId)
//     .single();
//   return profile as Profile;
// }

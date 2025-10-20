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
    .select("uid, profile_img, username, handle")
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

export async function getHasVotedByOptionId(optionId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");

  const { data: optionRow } = await supabase
    .from("options")
    .select("post_id")
    .eq("uid", optionId)
    .single(); // 해당 옵션이 정의된 게시글 id
  if (!optionRow?.post_id) throw new Error("게시글 ID를 찾을 수 없습니다.");

  const postId = optionRow.post_id;

  const { data: existing } = await supabase
    .from("votes")
    .select("*, options:option_id(*)")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) throw new Error("이미 투표했습니다.");
  return [user.id, postId];
}

export async function getVoteStatus(postId: string) {}
// 현재 유저 확인 (없으면 비로그인 상태로 간주)
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

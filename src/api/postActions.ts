import supabase from "../utils/supabase";

// 투표
export async function submitVote(optionId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");

  const { data: existing } = await supabase
    .from("votes")
    .select("uid")
    .eq("option_id", optionId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) throw new Error("이미 투표했습니다.");

  const { error } = await supabase
    .from("votes")
    .insert([{ user_id: user.id, option_id: optionId }]);
  if (error) throw error;
}

// 좋아요
export async function toggleLike(postId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");

  const { data: existing } = await supabase
    .from("likes")
    .select("uid")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase.from("likes").delete().eq("uid", existing.uid);
    if (error) throw error;
    return { liked: false };
  } else {
    const { error } = await supabase.from("likes").insert([{ post_id: postId, user_id: user.id }]);
    if (error) throw error;
    return { liked: true };
  }
}

// 댓글
export async function addComment(postId: string, content: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");

  const { data, error } = await supabase
    .from("comments")
    .insert([{ post_id: postId, user_id: user.id, comment_content: content }])
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

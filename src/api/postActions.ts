import supabase from "../utils/supabase";
import { getHasVotedByOptionId } from "./postGet";

// 투표
export async function submitVote(optionId: string) {
  const [userId, postId] = await getHasVotedByOptionId(optionId);

  const { data, error } = await supabase
    .from("votes")
    .insert([{ user_id: userId, option_id: optionId, post_id: postId }])
    .select("*")
    .single();
  if (error) throw error;

  // 알람 처리
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("vote_count,user_id")
    .eq("uid", postId)
    .single();

  if (postError) throw postError;

  const { vote_count, user_id } = post;
  if (vote_count === 3 || vote_count === 10 || vote_count === 30) {
    const { error: alarmError } = await supabase
      .from("alarm")
      .insert([{ type: "votes", reference_id: data.uid, sender_id: userId, receiver_id: user_id }]);

    if (alarmError) throw alarmError;
  }
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
export async function addComment(postId: string, content: string, author_id: string) {
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

  // 알람 처리
  const { error: alarmError } = await supabase
    .from("alarm")
    .insert([
      { type: "comments", reference_id: data.uid, sender_id: user.id, receiver_id: author_id },
    ]);

  if (alarmError) throw alarmError;
}

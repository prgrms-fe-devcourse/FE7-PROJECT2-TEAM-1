// import Profile from "../pages/profile/Profile";
import type { CommentWithProfile, Post } from "../types/post";
import type { Profile } from "../types/profile";
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

export async function getProfileByUserId(userId: string) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("profile_img, username, handle")
    .eq("uid", userId)
    .single();
  return profile as Profile;
}

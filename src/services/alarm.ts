import type { Database } from "../types/database";
import supabase from "../utils/supabase";

type TableName = keyof Database["public"]["Tables"];
const fetchAlarmsAPI = async (uid: string) => {
  try {
    const { data: alarms, error } = await supabase
      .from("alarm")
      .select("*")
      .eq("receiver_id", uid)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return alarms;
  } catch (error) {
    console.error(error);
  }
};

const allReadAPI = async (uid: string) => {
  try {
    const { error } = await supabase
      .from("alarm")
      .update({ is_read: true })
      .eq("receiver_id", uid)
      .select("*");
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
};

const deleteAlarmAPI = async (uid: string) => {
  try {
    const { data, error } = await supabase.from("alarm").delete().eq("uid", uid).select();
    if (error) throw error;
    console.log("삭제하면 뭐오냐: ", data);
  } catch (error) {
    console.log(error);
  }
};

const handleOpenPost = async (reference_id: string, type: string) => {
  console.log(reference_id);
  try {
    const { data, error } = await supabase
      .from(type as TableName)
      .select("posts(*)")
      .eq("uid", reference_id)
      .single();

    if (error) throw error;
    if (!data) {
      console.warn("해당 알림에 연결된 게시글이 없습니다:");
      return null;
    }

    const { posts } = data;
    if (!posts) null;
    return posts as Post;
  } catch (error) {
    console.error("포스트 불러오기 실패:", error);
    return null;
  }
};

const getCommentUserAPI = async (uid: string) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select(
        `
        comment_content,
    profiles(*)
  `,
      )
      .eq("uid", uid)
      .maybeSingle();
    if (error) throw error;
    if (data) return data;
  } catch (error) {
    console.error(error);
  }
};

const winnerOptionAPI = async (vote_id: string) => {
  const { data, error } = await supabase
    .from("votes")
    .select(
      `
    *,
    posts (
      *,
      options (*)
    )
  `,
    )
    .eq("uid", vote_id)
    .single();
  if (error) throw error;
  if (!data) return;
  if (!data.posts) return;

  const postTitle = data.posts.post_title;
  const options = data.posts.options;

  const optionVoteCounts = await Promise.all(
    options.map(async (item) => {
      const { count, error } = await supabase
        .from("votes")
        .select("*", { count: "exact", head: true })
        .eq("option_id", item.uid);
      if (error) throw error;
      return { ...item, vote_count: count };
    }),
  );

  const [a, b] = optionVoteCounts;
  const winner = (a?.vote_count ?? 0) > (b?.vote_count ?? 0) ? a : b;

  return {
    post_title: postTitle,
    winner_title: winner.option_title,
    vote_count: winner.vote_count,
  };
};

export {
  fetchAlarmsAPI,
  allReadAPI,
  deleteAlarmAPI,
  handleOpenPost,
  getCommentUserAPI,
  winnerOptionAPI,
};

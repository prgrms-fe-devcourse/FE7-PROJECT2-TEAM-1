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

export { fetchAlarmsAPI, allReadAPI, deleteAlarmAPI, handleOpenPost };

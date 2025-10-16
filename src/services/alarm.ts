import supabase from "../utils/supabase";

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

export { fetchAlarmsAPI, allReadAPI, deleteAlarmAPI };

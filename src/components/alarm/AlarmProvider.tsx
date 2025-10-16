import { useEffect } from "react";
import { useAlarmStore } from "../../stores/alarmStore";
import supabase from "../../utils/supabase";
import { useAuthStore } from "../../stores/authStore";

export default function AlarmProvider() {
  const profile = useAuthStore((state) => state.profile);
  const { addAlarm, getAlarms, unReadCount, setUnReadCount } = useAlarmStore((state) => state);

  useEffect(() => {
    if (!profile?.uid) return;

    (async () => {
      const data = await getAlarms(profile.uid);
      setUnReadCount(data.filter((item) => !item.is_read).length);
    })();

    const channel = supabase
      .channel("alarm")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "alarm",
          filter: `receiver_id=eq.${profile?.uid}`,
        },
        (payload) => {
          addAlarm(payload.new as Alarm);
          setUnReadCount(unReadCount + 1);
        },
      )
      .subscribe((state) => console.log(state));

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.uid]);

  return null;
}

// import type { Database } from "./database";

// type Alarm = Database["public"]["Tables"]["alarm"]["Row"];
type AlarmType = "vote" | "comment" | "report" | "like";

interface Alarm {
  uid: string;
  receiver_id: string;
  sender_id: string;
  reference_id: string;
  is_read: boolean;
  type: AlarmType | string;
  created_at: string;
}

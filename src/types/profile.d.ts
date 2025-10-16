// import type { Database } from "./database";

// type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export interface Profile {
  uid: string;
  email: string;
  profile_img: string | null;
  bio: string | null;
  created_at: string;
  username: string;
  handle: string;
}

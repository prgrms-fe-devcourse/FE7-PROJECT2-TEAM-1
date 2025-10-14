// import type { Database } from "./database";

// type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface Profile {
  email: string;
  profile_img: string | null;
  bio: string | null;
  created_at: string;
  username: string;
  handle: string;
}

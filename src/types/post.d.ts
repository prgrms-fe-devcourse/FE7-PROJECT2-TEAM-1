type Category = "friendship" | "love" | "food" | "life" | "hobby" | "work";
type OptionKey = "left" | "right";

interface Post {
  uid: string;
  user_id: string;
  post_title: string;
  post_desc: string | null;
  created_at: string;
  updated_at: string | null;
  like_count: number;
  report_count: number;
  is_visible: boolean;
  vote_count: number;
  comment_count: number;
  category: Category | string;
}

interface Option {
  uid: string;
  post_id: string;
  option_title: string;
  option_img: string | null;
  created_at: string;
  position: OptionKey;
}
interface Vote {
  uid: string;
  user_id: string;
  option_id: string;
  created_at: string;
  post_id: string;
}

interface Like {
  uid: string;
  created_at: string;
  user_id: string;
  post_id: string;
}

interface CommentDB {
  uid: string;
  created_at: string;
  user_id: string;
  post_id: string;
  comment_content: string;
  report_count: number;
  is_visible: boolean;
}

interface CommentWithProfile extends CommentDB {
  profiles?: {
    username: string | null;
    handle: string | null;
    profile_img: string | null;
  } | null;
}

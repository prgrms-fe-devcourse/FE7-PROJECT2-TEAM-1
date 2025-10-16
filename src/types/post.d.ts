export interface Post {
  uid: string;
  user_id: string;
  post_title: string;
  post_desc: string;
  created_at: string;
  updated_at: string;
  like_count: number;
  report_count: number;
  is_visible: boolean;
  vote_count: number;
  comment_count: number;
  category: "우정" | "연애" | "음식" | "생활" | "취미" | "일";
}

export interface Option {
  uid: string;
  post_id: string;
  option_title: string;
  option_img: string | null;
  created_at: string;
  position: "left" | "right";
}
export interface Vote {
  uid: string;
  user_id: string;
  option_id: string;
  created_at: string;
}

export interface Like {
  uid: string;
  created_at: string;
  user_id: string;
  post_id: string;
}

export interface CommentDB {
  uid: string;
  created_at: string;
  user_id: string;
  post_id: string;
  comment_content: string;
  report_count: number;
  is_visible: boolean;
}

export interface CommentWithProfile extends CommentDB {
  profiles?: {
    username: string | null;
    handle: string | null;
    profile_img: string | null;
  } | null;
}

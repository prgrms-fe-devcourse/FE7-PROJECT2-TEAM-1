interface Chat {
  category: string;
  content: string | null;
  created_at: string;
  uid: string;
  user_id: string;
  profiles: {
    username: string;
  };
}

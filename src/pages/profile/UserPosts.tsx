import { useEffect, useState } from "react";
import { getUserPostsAPI } from "../../services/profile";
import PostCard from "../post/PostCard";

export default function UserPosts({ profile }: { profile: Profile | null }) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!profile?.uid) return;
    const getUserPosts = async () => {
      const data = await getUserPostsAPI(profile?.uid);
      if (data) setPosts(data);
    };
    getUserPosts();
  }, []);

  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        {posts.map((post) => (
          <PostCard key={post.uid} post={post} />
        ))}
      </div>
    </>
  );
}

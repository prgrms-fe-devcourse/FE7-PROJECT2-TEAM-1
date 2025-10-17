import { useEffect, useState } from "react";
import categoryArrow from "../../assets/posts/categoryArrow.svg";
import newPost from "../../assets/posts/newPost.svg";

import PostCard from "./PostCard";
import supabase from "../../utils/supabase";
import type { Post } from "../../types/post";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("is_visible", true) // 숨김 게시물 제외
          .order("created_at", { ascending: false }); // 최신순 정렬

        if (error) throw error;
        setPosts(data);
      } catch (err: any) {
        console.error("게시물 불러오기 실패:", err.message);
        setError("게시물을 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading)
    return <div className="text-center text-[#FF8C00] mt-10">게시물을 불러오는 중...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  return (
    <div>
      <div className="border-b border-[#FF8C00]">
        <div className="flex items-center justify-between max-w-[1200px] mx-auto h-[85px] text-[#FF8C00] ">
          <div className="flex items-center">
            <img src={categoryArrow} className="w-[31px] h-[26px]" />
            <span className="text-[30px] ml-[20px]">우정</span>
          </div>
          <img src={newPost} className="mr-[51px]" />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto">
        {posts.map((post) => (
          <PostCard key={post.uid} post={post} />
        ))}
      </div>
    </div>
  );
}

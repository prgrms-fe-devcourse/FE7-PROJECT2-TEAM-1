import { useEffect, useState } from "react";
import { getUserPostsAPI } from "../../services/profile";

export default function UserStats({ profile }: { profile: Profile | null }) {
  const [posts, setPosts] = useState<Post[]>([]);

  // useEffect(() => {
  //   if (!profile?.uid) return;
  //   const getUserPosts = async () => {
  //     const data = await getUserPostsAPI(profile?.uid);
  //     if (data) setPosts(data);
  //   };

  //   // 받은 투표, 받은 좋아요 가공
  //   getUserPosts();
  // }, []);

  return (
    <>
      <div className="w-[996px] border-t border-[#FF8C00] m-auto mt-[30px] mb-[10px] flex justify-center gap-[220px] py-[20px]">
        <div className="flex flex-col items-center">
          <p className="text-[#FF8C00] text-[24px] font-bold">{0}</p>
          <p className="text-[14px] text-[#CFCFCF]">게시물</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[#FF8C00] text-[24px] font-bold">0</p>
          <p className="text-[14px] text-[#CFCFCF]">받은 투표</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[#FF8C00] text-[24px] font-bold">0</p>
          <p className="text-[14px] text-[#CFCFCF]">받은 좋아요</p>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";

export default function UserStats({ posts }: { posts: Post[] | null }) {
  const [likeCount, setLikeCount] = useState(0);
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    const likes = posts?.reduce((acc, cur) => cur.like_count + acc, 0);
    setLikeCount(likes || 0);

    const votes = posts?.reduce((acc, cur) => cur.vote_count + acc, 0);
    setVoteCount(votes || 0);
  }, [posts]);

  return (
    <>
      <div className="w-[996px] border-t border-[#FF8C00] m-auto mt-[30px] mb-[10px] flex justify-center gap-[220px] py-[20px]">
        <div className="flex flex-col items-center">
          <p className="text-[#FF8C00] text-[24px] font-bold">{posts?.length}</p>
          <p className="text-[14px] text-[#CFCFCF]">게시물</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[#FF8C00] text-[24px] font-bold">{voteCount}</p>
          <p className="text-[14px] text-[#CFCFCF]">받은 투표</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[#FF8C00] text-[24px] font-bold">{likeCount}</p>
          <p className="text-[14px] text-[#CFCFCF]">받은 좋아요</p>
        </div>
      </div>
    </>
  );
}

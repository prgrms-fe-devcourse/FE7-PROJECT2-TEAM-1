import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { handleOpenPost, winnerOptionAPI } from "../../../services/alarm";
import AlarmCardSkeleton from "../../loading/AlarmCardSkeleton";

export default function AlarmCardVote({
  alarm,
  setPostData,
  openPost,
}: {
  alarm: Alarm;
  setPostData: Dispatch<SetStateAction<Post | null>>;
  openPost: boolean;
}) {
  const [winnerData, setWinnerData] = useState<{
    post_title: string;
    winner_title: string;
    vote_count: number | null;
  }>({ post_title: "", winner_title: "", vote_count: 0 });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!openPost) return;

    const getPost = async () => {
      const post = await handleOpenPost(alarm.reference_id, alarm.type);
      setPostData(post);
    };

    getPost();
  }, [openPost, alarm.uid]);

  useEffect(() => {
    const getWinnerOption = async () => {
      try {
        const data = await winnerOptionAPI(alarm.reference_id);
        if (data) setWinnerData(data);
      } catch (error) {
        console.error(error);
      } finally {
        const timer = setTimeout(() => setIsLoading(false), 700);
        return () => clearTimeout(timer);
      }
    };
    getWinnerOption();
  }, []);

  if (isLoading) return <AlarmCardSkeleton />;

  return (
    <>
      {winnerData ? (
        <>
          <p className="p-4.5 pb-0 text-[13px] underline text-[#d3cfcf] hover:text-[#bfbcbc]">
            {winnerData.post_title}
          </p>
          <p className="p-4.5 font-normal text-[11px]">
            해당 게시물에서 "
            <span className="font-bold text-[#ff8c00cc]">{winnerData.winner_title}</span>" 선택지의
            투표 수가 {winnerData.vote_count}표차로 우세하고 있습니다.
          </p>
        </>
      ) : (
        <div className="flex justify-center items-center mt-9 text-[#999999]">
          <p>삭제된 게시글입니다</p>
        </div>
      )}
    </>
  );
}

import { useEffect, type Dispatch, type SetStateAction } from "react";
import { handleOpenPost } from "../../../services/alarm";

export default function AlarmCardVote({
  alarm,
  setPostData,
  openPost,
}: {
  alarm: Alarm;
  setPostData: Dispatch<SetStateAction<Post | null>>;
  openPost: boolean;
}) {
  // reference_id로 vote db 갖고와서 가공

  useEffect(() => {
    if (!openPost) return;

    const getPost = async () => {
      const post = await handleOpenPost(alarm.reference_id, alarm.type);
      setPostData(post);
    };

    getPost();
  }, [openPost, alarm.uid]);

  return (
    <>
      <p className="p-4.5 pb-0 text-[13px] underline text-[#d3cfcf] hover:text-[#bfbcbc]">
        치킨 VS 피자 당신의 선택은?
      </p>
      <p className="p-4.5 font-normal text-[11px]">
        해당 게시물에서 "<span className="font-bold text-[#ff8c00cc]">치킨</span>" 선택지의 투표
        수가 우세하고 있습니다.
      </p>
    </>
  );
}

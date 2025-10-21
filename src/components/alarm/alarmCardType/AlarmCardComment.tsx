import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import profile_default from "../../../assets/profile/profile_default.png";
import { getCommentUserAPI, handleOpenPost } from "../../../services/alarm";

export default function AlarmCardComment({
  alarm,
  setPostData,
  openPost,
}: {
  alarm: Alarm;
  setPostData: Dispatch<SetStateAction<Post | null>>;
  openPost: boolean;
}) {
  const [commentUser, setCommentUser] = useState<
    { comment_content: string; profiles: Profile } | undefined
  >();

  useEffect(() => {
    if (!openPost) return;

    const getPost = async () => {
      const post = await handleOpenPost(alarm.reference_id, alarm.type);
      setPostData(post);
    };

    getPost();
  }, [openPost, alarm.uid]);

  useEffect(() => {
    const getCommentUser = async () => {
      const user = await getCommentUserAPI(alarm.reference_id);
      setCommentUser(user);
    };
    getCommentUser();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-[10px] p-3.5">
        <div className="flex gap-[10px] text-left pt-1">
          <div className="relative w-[35px] h-[35px] rounded-full  border-2 border-[#FF8C00] flex-shrink-0">
            <img
              src={commentUser?.profiles.profile_img || profile_default}
              alt="profile_img"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <p className="font-normal text-[12px] mb-[2px]">{commentUser?.profiles.username}</p>
            <p className="font-normal text-[9px] mt-[3px]">@{commentUser?.profiles.handle}</p>
          </div>
        </div>
        <div className="p-1">
          <p className="font-normal text-[11px] text-[#d3cfcf] mb-[3px]">답글을 남기셨습니다.</p>
          <p className="font-normal text-[12px] underline" style={{ wordSpacing: "-5px" }}>
            {commentUser?.comment_content}
          </p>
        </div>
      </div>
    </>
  );
}

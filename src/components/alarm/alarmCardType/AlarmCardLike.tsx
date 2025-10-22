import { useEffect, type Dispatch, type SetStateAction } from "react";
import { getPostByUid } from "../../../api/postGet";
import likeImg from "../../../assets/posts/likeFilled.svg";

export default function AlarmCardLike({
  alarm,
  setPostData,
  post,
}: {
  alarm: Alarm;
  setPostData: Dispatch<SetStateAction<Post | null>>;
  post: Post | null;
}) {
  useEffect(() => {
    const getPost = async () => {
      const post = await getPostByUid(alarm.reference_id);
      setPostData(post);
    };

    getPost();
  }, [alarm.uid]);

  return (
    <>
      <p className="p-4.5 pb-0 text-[13px] underline text-[#d3cfcf] hover:text-[#bfbcbc]">
        {post?.post_title}
      </p>
      <p className="flex p-4.5 font-normal text-[11px]">
        <img className="mr-[5px]" src={likeImg} alt="likeImg" />
        해당 게시글의 좋아요가 {post?.like_count}개가 되었습니다!
      </p>
    </>
  );
}

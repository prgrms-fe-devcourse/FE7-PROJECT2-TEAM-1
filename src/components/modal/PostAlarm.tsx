import { createPortal } from "react-dom";
import PostCard from "../../pages/post/PostCard";

export default function PostAlarm({
  setOpenPost,
  post,
}: {
  setOpenPost: React.Dispatch<React.SetStateAction<boolean>>;
  post: Post | null;
}) {
  const modal = (
    <div className="fixed inset-0 z-[1000] bg-[rgb(132_124_124_/_0.3)] flex justify-center items-center font-normal">
      <div className="w-[1200px] bg-black border-2 border-[#FF8C00] flex justify-center items-center font-normal p-10 flex-col gap-10">
        {post && <PostCard post={post} />}
        <button
          className="hover:bg-[#FF8C00] hover:text-black cursor-pointer rounded-[5px] bg-[#AAAAAA] w-[150px] h-[50px] text-[25px] transition-all duration-250"
          onClick={() => setOpenPost(false)}
        >
          확인
        </button>
      </div>
    </div>
  );
  console.log(post);
  return createPortal(modal, document.body);
}

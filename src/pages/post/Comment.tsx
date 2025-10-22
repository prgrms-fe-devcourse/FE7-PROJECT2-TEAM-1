import kebabMenuIcon from "../../assets/posts/kebabMenuIcon.svg";

import trash from "../../assets/posts/trash.png";
import author_img from "../../assets/posts/author.png";
import report from "../../assets/posts/report.png";

import Badge from "./Badge";
import { Link } from "react-router";
import { Activity, useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import formatRelativeTime from "../../services/formatRelativeTime";

export default function Comment({
  comment,
  deleteCommentHandler,
}: {
  comment: CommentWithProfile;
  deleteCommentHandler: (uid: string) => Promise<void>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { profile } = useAuthStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutSide);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [menuOpen]);
  return (
    <div ref={menuRef} className="flex justify-between w-full min-h-[60px] px-3 py-2">
      <div className="flex ml-2 gap-2">
        {/* 프로필 이미지 */}
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden border border-[#FF8C00]/40 mr-4 mt-[10px]">
          <img
            src={comment.profiles?.profile_img ?? ""}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 오른쪽 텍스트 영역 */}
        <div className="flex flex-col justify-center flex-1">
          {/* username + 시간 */}
          <div className="flex items-center gap-4">
            <p className="text-white text-[14px] font-semibold">
              {comment.profiles?.username ?? "익명"}
            </p>
            <span className="text-[#999999] text-[12px] whitespace-nowrap">
              {formatRelativeTime(comment.created_at)}
            </span>
          </div>

          {/* 댓글 내용 */}
          <p className="text-white font-normal text-[14px] mt-1">{comment.comment_content}</p>
        </div>
      </div>
      <div className="relative flex my-auto gap-2 px-[10px]">
        <Badge post_id={comment.post_id} user_id={comment.user_id} />
        <img
          src={kebabMenuIcon}
          className="cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <Activity mode={menuOpen ? "visible" : "hidden"}>
          <div className="absolute top-5 -right-30 w-[160px]  border-1 border-[#ffffff30] rounded-[10px] mt-3 shadow-lg shadow-[#0A0A0A] overflow-x-hidden overflow-y-auto transition-all duration-200 z-50 backdrop-blur-lg">
            {comment.user_id === profile?.uid ? (
              <div
                className="flex items-center justify-center w-full h-[50px] font-normal text-[14px] cursor-pointer hover:bg-[#5d5757] "
                onClick={() => deleteCommentHandler(comment.uid)}
              >
                <img
                  className="w-[20px] h-[20px] translate-x-[-4px]"
                  src={trash}
                  alt="trash_logo"
                />
                <span className="h-[20px] ml-[5px] translate-x-[-4px]">삭제하기</span>
              </div>
            ) : (
              <>
                <Link to={`/profile/${comment.profiles?.handle}`}>
                  <div className="flex items-center justify-center w-full h-[50px] font-normal text-[14px] cursor-pointer hover:bg-[#5d5757]">
                    <img className="w-[20px] h-[20px]" src={author_img} alt="author_logo" />
                    <span className="h-[20px] ml-[6px]">프로필가기</span>
                  </div>
                </Link>
                <div className="flex items-center justify-center w-full h-[50px] font-normal text-[14px] cursor-pointer hover:bg-[#5d5757]">
                  <img
                    className="w-[20px] h-[20px] translate-x-[-6px]"
                    src={report}
                    alt="author_logo"
                  />
                  <span className="h-[20px] ml-[6px] translate-x-[-6px]">신고하기</span>
                </div>
              </>
            )}
          </div>
        </Activity>
      </div>
    </div>
  );
}

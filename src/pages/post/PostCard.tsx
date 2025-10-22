import kebabMenuIcon from "../../assets/posts/kebabMenuIcon.svg";
import likeIcon from "../../assets/posts/likeIcon.svg";
import likeFilledIcon from "../../assets/posts/likeFilled.svg";
import commentIcon from "../../assets/posts/commentIcon.svg";
import sendIcon from "../../assets/posts/paperPlane.svg";
import hourglass from "../../assets/posts/hourglass.svg";

import trash from "../../assets/posts/trash.png";
import author_img from "../../assets/posts/author.png";
import report from "../../assets/posts/report.png";

import PollCard from "../../components/PollCard";
import { addComment, deleteComment, submitVote, toggleLike } from "../../api/postActions";

import { Activity, useEffect, useRef, useState } from "react";
import supabase from "../../utils/supabase";
import { useAuthStore } from "../../stores/authStore";
import { getAuthorByPostId, getLikeStatusByPostId, getVotesByOptionId } from "../../api/postGet";
import { Link } from "react-router";
import Comments from "./Comments";
import Report from "../../components/modal/Report";
import formatRelativeTime from "../../services/formatRelativeTime";
import Comment from "./Comment";

export default function PostCard({
  post,
  onDeleteClick,
  searchTerm,
}: {
  post: Post;
  onDeleteClick: (uid: string) => void;
  searchTerm: string;
}) {
  const { profile } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
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

  const [author, setAuthor] = useState<Profile | null>(null);
  const [voteCounts, setVoteCounts] = useState<{ left: number; right: number }>({
    left: 0,
    right: 0,
  });
  const [initialSelected, setInitialSelected] = useState<OptionKey | null>(null);
  const [openReportModal, setOpenReportModal] = useState(false);
  const hasVoted = initialSelected !== null;

  const titleParts = post.post_title.split(new RegExp(`(${searchTerm})`, "gi"));
  const descParts = post.post_desc?.split(new RegExp(`(${searchTerm})`, "gi"));

  useEffect(() => {
    (async () => {
      if (!leftOption?.uid || !rightOption?.uid) return;

      const [leftCount, rightCount] = await Promise.all([
        getVotesByOptionId(leftOption.uid),
        getVotesByOptionId(rightOption.uid),
      ]);
      setVoteCounts({ left: leftCount, right: rightCount });

      if (!profile) {
        setInitialSelected(null);
        return;
      }

      const { data: existing } = await supabase
        .from("votes")
        .select("option_id")
        .eq("post_id", post.uid)
        .eq("user_id", profile.uid)
        .maybeSingle();

      if (existing?.option_id === leftOption.uid) setInitialSelected("left");
      else if (existing?.option_id === rightOption.uid) setInitialSelected("right");
      else setInitialSelected(null);
    })();
  }, [post.uid]);

  const [likeStatus, setLikeStatus] = useState(false);
  useEffect(() => {
    (async () => {
      setLikeStatus(await getLikeStatusByPostId(postId));
    })();
  }, [post.uid, profile?.uid]);

  const [likeCounts, setLikeCounts] = useState<number>(post.like_count ?? 0);
  const [commentCounts, setCommentsCounts] = useState<number>(post.comment_count ?? 0);
  const [commentsRefresh, setCommentsRefresh] = useState(0);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [pendingComment, setPendingComment] = useState<string | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [oldestComment, setOldestComment] = useState<CommentWithProfile | null>(null);
  useEffect(() => {
    (async () => {
      if (isCommentsOpen) {
        setOldestComment(null);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("comments")
          .select(
            "uid, user_id, post_id, comment_content, created_at, profiles(username, handle, profile_img)",
          )
          .eq("post_id", post.uid)
          .order("created_at", { ascending: true })
          .limit(1);
        if (error) throw error;
        setOldestComment(data && data.length > 0 ? (data[0] as any) : null);
      } catch (err) {
        console.error("댓글 프리뷰 불러오기 실패: ", err);
        setOldestComment(null);
      }
    })();
  }, [post.uid, hasVoted, isCommentsOpen, commentsRefresh]);

  const deleteSingleCommentHandler = async (uid: string) => {
    try {
      await deleteComment(uid);
      setCommentsCounts((c) => Math.max(0, c - 1));
      setCommentsRefresh((n) => n + 1);
      setOldestComment(null);
    } catch (error) {
      console.error(error);
    }
  };

  const postId = post.uid;

  // author
  useEffect(() => {
    (async () => {
      try {
        setAuthor(await getAuthorByPostId(post.uid));
      } catch (err) {
        console.error("작성자 불러오기 실패:", err);
      }
    })();
  }, [post.uid]);

  // Options
  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.from("options").select("*").eq("post_id", post.uid);
        if (error) throw error;
        setOptions(
          (data ?? []).map((option) => ({
            ...option,
            position: option.position === "left" ? "left" : "right",
          })),
        );
      } catch (err) {
        console.error("옵션 불러오기 실패:", err);
      }
    })();
  }, [post.uid]);

  const leftOption = options.find((option) => option.position === "left") as Option;
  const rightOption = options.find((option) => option.position === "right") as Option;

  useEffect(() => {
    (async () => {
      if (!leftOption?.uid || !rightOption?.uid) return;

      const [leftCount, rightCount] = await Promise.all([
        getVotesByOptionId(leftOption.uid),
        getVotesByOptionId(rightOption.uid),
      ]);
      setVoteCounts({ left: leftCount, right: rightCount });

      if (!profile) {
        setInitialSelected(null);
        return;
      }

      const { data: existing } = await supabase
        .from("votes")
        .select("option_id")
        .eq("post_id", post.uid)
        .eq("user_id", profile.uid)
        .maybeSingle();

      if (existing?.option_id === leftOption.uid) setInitialSelected("left");
      else if (existing?.option_id === rightOption.uid) setInitialSelected("right");
      else setInitialSelected(null);
    })();
  }, [post.uid, profile?.uid, leftOption?.uid, rightOption?.uid]);

  // Pending comment
  useEffect(() => {
    if (!pendingComment || !profile?.uid) return;
    (async () => {
      try {
        await addComment(post.uid, pendingComment, author?.uid || "");
        setCommentsCounts((c) => c + 1);
        setCommentsRefresh((n) => n + 1);
      } catch (err) {
        console.error(err);
      } finally {
        setPendingComment(null);
      }
    })();
  }, [pendingComment, profile?.uid, post.uid]);

  if (!author) return null;

  return (
    <div
      ref={menuRef}
      className="group w-[1098px] border-[2px] border-[#FF8C00]/30 rounded-[12px] mt-[30px] mx-auto transition-colors duration-300 hover:border-[#FF8C00]/60"
    >
      {/* --- 프로필 --- */}
      <div className="flex items-center justify-between h-[100px] border-b-[2px] border-[#FF8C00]/30 transition-colors duration-300 group-hover:border-[#FF8C00]/60">
        <div className="flex w-[1000px] justify-between ml-[51px]">
          <Link
            to={`/profile/${author.handle}`}
            className="flex cursor-pointer select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-[45px] h-[45px] rounded-full overflow-hidden border-[2px] border-[#FF8C00] mr-[11px]">
              {author?.profile_img && (
                <img
                  src={author.profile_img}
                  className="w-full h-full object-cover"
                  alt="profile"
                />
              )}
            </div>
            <div>
              <p className="text-white text-[16px]">{author?.username ?? "익명"}</p>
              <p className="text-[#999999] text-[14px]">@{author?.handle ?? "guest"}</p>
            </div>
          </Link>
          <div className="relative flex items-center">
            <img
              src={kebabMenuIcon}
              className="cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            <Activity mode={menuOpen ? "visible" : "hidden"}>
              <div className="absolute top-7 left-1 w-[160px]  border-1 border-[#ffffff30] rounded-[10px] mt-3 shadow-lg shadow-[#0A0A0A] overflow-x-hidden overflow-y-auto transition-all duration-200 z-50 backdrop-blur-lg">
                {author?.uid === profile?.uid ? (
                  <div
                    className="flex items-center justify-center w-full h-[50px] font-normal text-[14px] cursor-pointer hover:bg-[#5d5757]"
                    onClick={() => onDeleteClick(post.uid)}
                  >
                    <img
                      className="w-[20px] h-[20px] translate-x-[-4px]"
                      src={trash}
                      alt="trash_logo"
                    />
                    <span className="h-[20px] ml-[5px] translate-x-[-4px] text-white">
                      삭제하기
                    </span>
                  </div>
                ) : (
                  <>
                    <Link to={`/profile/${author.handle}`}>
                      <div className="flex items-center justify-center w-full h-[50px] font-normal text-[14px] cursor-pointer hover:bg-[#5d5757]">
                        <img className="w-[20px] h-[20px]" src={author_img} alt="author_logo" />
                        <span className="h-[20px] ml-[6px]">프로필가기</span>
                      </div>
                    </Link>
                    <div
                      onClick={() => setOpenReportModal(true)}
                      className="flex items-center justify-center w-full h-[50px] font-normal text-[14px] cursor-pointer hover:bg-[#5d5757]"
                    >
                      <img
                        className="w-[20px] h-[20px] translate-x-[-6px]"
                        src={report}
                        alt="author_logo"
                      />
                      <span className="h-[20px] ml-[6px] translate-x-[-6px]">신고하기</span>
                      <Activity mode={openReportModal ? "visible" : "hidden"}>
                        <Report
                          id={post.uid}
                          type={"post"}
                          setOpenReportModal={setOpenReportModal}
                        />
                      </Activity>
                    </div>
                  </>
                )}
              </div>
            </Activity>
          </div>
        </div>
      </div>
      {/* --- 본문 --- */}
      <div className="space-y-[30px]">
        <div className="ml-[51px]">
          <h2 className="mt-[30px] text-[20px] text-white">
            {titleParts.map((part, index) =>
              part.toLowerCase() === searchTerm.toLowerCase() ? (
                <span key={index} className="text-[#FF8C00] font-bold">
                  {part}
                </span>
              ) : (
                <span key={index} className="text-white">
                  {part}
                </span>
              ),
            )}
          </h2>
          <p
            style={{ fontWeight: "normal" }}
            className="w-[1000px] text-[16px] text-[#999999] whitespace-pre-wrap break-words"
          >
            {descParts?.map((part, index) =>
              part.toLowerCase() === searchTerm.toLowerCase() ? (
                <span key={index} className="text-[#FF8C00] font-bold">
                  {part}
                </span>
              ) : (
                <span key={index} className="text-white">
                  {part}
                </span>
              ),
            )}
          </p>
        </div>

        <PollCard
          left={{
            label: leftOption?.option_title ?? "왼쪽",
            img: leftOption?.option_img ?? "",
            optionId: leftOption?.uid,
          }}
          right={{
            label: rightOption?.option_title ?? "오른쪽",
            img: rightOption?.option_img ?? "",
            optionId: rightOption?.uid,
          }}
          initialCounts={voteCounts}
          initialSelected={initialSelected}
          onVote={async (choice) => {
            const optionId = choice === "left" ? leftOption?.uid : rightOption?.uid;
            if (!optionId) {
              ``;
              console.error("투표 실패: optionId가 비어있습니다.");
              return;
            }
            try {
              await submitVote(optionId);
              setInitialSelected(choice);
              console.log("투표 저장 완료");
            } catch (err) {
              console.error("투표 저장 실패:", err);
            }
          }}
        />

        {/* 좋아요 */}
        <div>
          <div className="flex items-center justify-between mx-auto w-[996px] h-[50px] border-b-[2px] border-[#FF8C00]/20">
            <div>
              <button
                onClick={async () => {
                  const { liked } = await toggleLike(postId);
                  setLikeStatus(liked);
                  try {
                    const { data } = await supabase
                      .from("posts")
                      .select("like_count")
                      .eq("uid", postId)
                      .single();
                    setLikeCounts(data?.like_count ?? 0);
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="transition-transform hover:scale-130"
              >
                <img
                  src={likeStatus ? likeFilledIcon : likeIcon}
                  className="ml-[13px] mr-[21px] w-[25px]"
                />
              </button>
              <span className="text-[14px]">{likeCounts}</span>
            </div>
            <div className="flex">
              <img src={hourglass} className="w-3.5" />
              <span className="text-[#999999] text-[12px] whitespace-nowrap p-2">
                {formatRelativeTime(post.created_at)}
              </span>
            </div>
          </div>

          {/* 댓글 */}
          <div
            onClick={() => {
              if (!hasVoted) return;
              setIsCommentsOpen((v) => !v);
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isCommentsOpen}
            aria-disabled={!hasVoted}
            className={[
              "flex items-center mx-auto w-[996px] h-[50px] mb-0 transition-colors duration-300 hover:bg-[#FF8C00]/20 focus:outline-none",
              hasVoted ? "hover:bg-[#FF8C00]/20 cursor-pointer" : "opacity-60 cursor-not-allowed",
            ].join(" ")}
          >
            <img src={commentIcon} className="ml-[13px] mr-[21px] w-[25px]" />
            <span className="text-[14px] text-[#FF8C00] mr-[3px]">comments</span>
            <span className="text-[14px] text-[#FF8C00]">({commentCounts})</span>
          </div>
          <div className="relative mx-auto w-[996px]">
            <div
              className={["transition-all", !hasVoted ? "pointer-events-none blur-sm" : ""].join(
                " ",
              )}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const text = commentText.trim();
                  if (!text) return;
                  setPendingComment(text);
                  setCommentText(""); // 입력창 비우기
                }}
                className={[
                  "mx-auto w-[996px] overflow-hidden transition-[max-height,opacity] duration-300",
                  isCommentsOpen ? "max-h-[180px] opacity-100" : "max-h-0 opacity-0",
                ].join(" ")}
              >
                <div className="flex items-center gap-3 py-3">
                  <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="댓글을 작성해보세요 ..."
                    className="flex-1 font-normal bg-transparent border border-[#FF8C00]/40 focus:border-[#FF8C00] rounded-md px-3 py-2 text-white outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-[#FF8C00] text-black font-bold hover:bg-[#FF8C00]/90 transition-colors"
                  >
                    <img src={sendIcon} />
                  </button>
                </div>
              </form>
              <div className="mx-auto flex justify-between w-[996px] border border-[#FF8C00]/40 rounded-[12px] mb-6">
                {!isCommentsOpen && oldestComment ? (
                  <Comment
                    comment={oldestComment}
                    deleteCommentHandler={deleteSingleCommentHandler}
                  />
                ) : (
                  <Comments
                    postUid={post.uid}
                    refresh={commentsRefresh}
                    onCountChange={(prev) => setCommentsCounts((c) => c + prev)}
                  />
                )}
              </div>
            </div>
            {!hasVoted && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-4 py-2   text-[#FF8C00] text-[20px]">
                  지금 투표하여 뜨거운 논쟁에 참여하세요!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

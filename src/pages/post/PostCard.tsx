import kebabMenuIcon from "../../assets/posts/kebabMenuIcon.svg";
import likeIcon from "../../assets/posts/likeIcon.svg";
import likeFilledIcon from "../../assets/posts/likeFilled.svg";
import commentIcon from "../../assets/posts/commentIcon.svg";
import sendIcon from "../../assets/posts/paperPlane.svg";
import profileImage2 from "../../assets/posts/profileImage2.svg";

import PollCard from "../../components/PollCard";
import { addComment, submitVote, toggleLike } from "../../api/postActions";

import { useEffect, useState } from "react";
import type { CommentDB, Option, Post } from "../../types/post";
import supabase from "../../utils/supabase";
import { useAuthStore } from "../../stores/authStore";
import { getAuthorByPostId, getCommentsByPostId } from "../../api/postGet";
// import type { Profile } from "../../types/profile";
import Comment from "./Comment";

export default function PostCard({ post }: { post: Post }) {
  const [author, setAuthor] = useState<Profile | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCounts, setLikeCounts] = useState<number>(post.like_count ?? 0);
  const [commentCounts, setCommentCounts] = useState<number>(post.comment_count ?? 0);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [pendingComment, setPendingComment] = useState<string | null>(null);
  const [options, setOptions] = useState<Option[]>([]);

  const { profile } = useAuthStore();

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

  // Pending comment
  useEffect(() => {
    if (!pendingComment || !profile?.uid) return;
    (async () => {
      try {
        await addComment(post.uid, pendingComment);
        setCommentCounts((c) => c + 1);
      } catch (err) {
        console.error(err);
      } finally {
        setPendingComment(null);
      }
    })();
  }, [pendingComment, profile?.uid, post.uid]);

  // Options
  useEffect(() => {
    const fetchOptions = async () => {
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
    };

    fetchOptions();
  }, [post.uid]);

  const leftOption = options.find((option) => option.position === "left");
  const rightOption = options.find((option) => option.position === "right");

  return (
    <div className="group w-[1098px] border-[2px] border-[#FF8C00]/30 rounded-[12px] mt-[30px] mx-auto transition-colors duration-300 hover:border-[#FF8C00]/60">
      {/* --- 프로필 --- */}
      <div className="flex items-center justify-between h-[100px] border-b-[2px] border-[#FF8C00]/30 transition-colors duration-300 group-hover:border-[#FF8C00]/60">
        <div className="flex justify-center ml-[51px]">
          <div className="w-[45px] h-[45px] rounded-full overflow-hidden border-[2px] border-[#FF8C00] mr-[11px]">
            <img src={author?.profile_img || ""} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-white text-[16px]">{author?.username ?? "익명"}</p>
            <p className="text-[#999999] text-[14px]">@{author?.handle ?? "guest"}</p>
          </div>
        </div>
        <img src={kebabMenuIcon} className="pr-[10px]" />
      </div>
      {/* --- 본문 --- */}
      <div className="space-y-[30px]">
        <div className="ml-[51px]">
          <h2 className="mt-[30px] text-[20px] text-white">{post.post_title}</h2>
          <p
            style={{ fontWeight: "normal" }}
            className="text-[16px] text-[#999999] whitespace-pre-wrap break-words"
          >
            {post.post_desc}
          </p>
        </div>

        <PollCard
          left={{ label: leftOption?.option_title ?? "왼쪽", img: leftOption?.option_img ?? "" }}
          right={{
            label: rightOption?.option_title ?? "오른쪽",
            img: rightOption?.option_img ?? "",
          }}
          initialCounts={{ left: 210, right: 90 }}
          onVote={async (optionId) => {
            await submitVote(optionId);
            console.log("투표 저장 완료");
          }}
        />

        {/* --- 좋아요, 댓글 --- */}
        <div>
          <div className="flex items-center mx-auto w-[996px] h-[50px] border-y-[2px] border-[#FF8C00]/20">
            <button
              onClick={async () => {
                const { liked } = await toggleLike(postId);
                setLiked(liked);
              }}
              className="transition-transform hover:scale-130"
            >
              <img
                src={liked ? likeFilledIcon : likeIcon}
                className="ml-[13px] mr-[21px] w-[25px]"
              />
            </button>
            <span className="text-[14px]">{likeCounts}</span>
          </div>
          <div
            onClick={() => setIsCommentOpen((v) => !v)}
            role="button"
            tabIndex={0}
            aria-expanded={isCommentOpen}
            className="flex items-center mx-auto w-[996px] h-[50px] mb-0 transition-colors duration-300 hover:bg-[#FF8C00]/20 focus:outline-none"
          >
            <img src={commentIcon} className="ml-[13px] mr-[21px] w-[25px]" />
            <span className="text-[14px] text-[#FF8C00] mr-[3px]">comments</span>
            <span className="text-[14px] text-[#FF8C00]">({commentCounts})</span>
          </div>
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
              isCommentOpen ? "max-h-[180px] opacity-100" : "max-h-0 opacity-0",
            ].join(" ")}
          >
            <div className="flex items-center gap-3 py-3">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your opinion..."
                className="flex-1 bg-transparent border border-[#FF8C00]/40 focus:border-[#FF8C00] rounded-md px-3 py-2 text-white outline-none"
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
            <Comment postUid={post.uid} />
          </div>
        </div>
      </div>
    </div>
  );
}

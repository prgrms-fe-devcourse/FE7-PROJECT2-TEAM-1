import categoryArrow from "../../assets/posts/categoryArrow.svg";
import newPost from "../../assets/posts/newPost.svg";
import profileImage from "../../assets/posts/profileImage.svg";
import kebabMenuIcon from "../../assets/posts/kebabMenuIcon.svg";
import chicken from "../../assets/posts/chicken.svg";
import pizza from "../../assets/posts/pizza.svg";
import likeIcon from "../../assets/posts/likeIcon.svg";
import likeFilledIcon from "../../assets/posts/likeFilled.svg";
import commentIcon from "../../assets/posts/commentIcon.svg";
import sendIcon from "../../assets/posts/paperPlane.svg";
import profileImage2 from "../../assets/posts/profileImage2.svg";

import PollCard from "../../components/PollCard";
import { useState } from "react";
import supabase from "../../utils/supabase";

export default function Posts() {
  const [liked, setLiked] = useState(false);
  const [likeCounts, setLikeCounts] = useState(0);
  const [commentCounts, setCommentCounts] = useState(0);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  // function addComment(postId: string, content: string) {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  //   if (!user) throw new Error("로그인이 필요합니다.");
  //   const { data, error } = await supabase
  //     .from("comments")
  //     .insert([
  //       {
  //         post_id: postId,
  //         user_id: user.id,
  //         comment_content: content,
  //       },
  //     ])
  //     .select("*")
  //     .single(); // 한줄 한줄
  //   if (error) throw error;
  //   return data;
  // }
  return (
    <div>
      <div className="border-b border-[#FF8C00]">
        <div className="flex items-center justify-between max-w-[1200px] mx-auto h-[85px] text-[#FF8C00] ">
          <div className="flex items-center">
            <img src={categoryArrow} className="w-[31px] h-[26px]" />
            <span className="text-[30px] ml-[20px]">우정</span>
          </div>
          <img src={newPost} className="mr-[51px]" />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto">
        <div className="group w-[1098px] border-[2px] border-[#FF8C00]/30 rounded-[12px] mt-[30px] mx-auto transition-colors duration-300 hover:border-[#FF8C00]/60">
          {/* --- 프로필 --- */}
          <div className="flex items-center justify-between h-[100px] border-b-[2px] border-[#FF8C00]/30 transition-colors duration-300 group-hover:border-[#FF8C00]/60">
            <div className="flex justify-center ml-[51px]">
              <div className="w-[45px] h-[45px] rounded-full overflow-hidden border-[2px] border-[#FF8C00] mr-[11px]">
                <img src={profileImage} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-white text-[16px]">김철수</p>
                <p className="text-[#999999] text-[14px]">@chulsoo_kim</p>
              </div>
            </div>
            <img src={kebabMenuIcon} className="pr-[10px]" />
          </div>
          {/* --- 본문 --- */}
          <div className="space-y-[30px]">
            <div className="ml-[51px]">
              <h2 className="mt-[30px] text-[20px] text-white">치킨 vs 피자, 당신의 선택은?</h2>
              <p style={{ fontWeight: "normal" }} className="text-[16px]  text-[#999999]">
                금요일 저녁, 친구들과 모였을 때 뭘 시켜먹을까요?
              </p>
            </div>

            <PollCard
              left={{ label: "치킨", img: chicken }}
              right={{ label: "피자", img: pizza }}
              initialCounts={{ left: 210, right: 90 }}
              onVote={async (choice) => {
                // fetch('')
              }}
            />

            {/* --- 좋아요, 댓글 --- */}
            <div>
              <div className="flex items-center mx-auto w-[996px] h-[50px] border-y-[2px] border-[#FF8C00]/20">
                <button
                  onClick={() => {
                    setLiked(!liked);
                    setLikeCounts((prev) => prev + (liked ? -1 : 1));
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
                onSubmit={async (e) => {
                  e.preventDefault();
                  const text = commentText.trim();
                  if (!text) return;

                  try {
                    const row = await addComment(postId, text);
                    setCommentCounts((c) => c + 1); // 등록 시 카운트 +1
                    setCommentText(""); // 입력창 비우기
                  } catch (err) {
                    console.error(err);
                  }
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
              <div className="mx-auto flex justify-between w-[996px] h-[70px] border border-[#FF8C00]/40 rounded-[12px] mb-6">
                <div className="flex items-center ml-[10px]">
                  <div className="w-[35px] h-[35px] rounded-full overflow-hidden border-[2px] border-[#FF8C00]">
                    <img src={profileImage2} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-[10px]">
                    <div>
                      <span className="text-white text-[14px] mr-[10px]">찬호박</span>
                      <span className="text-[#FF8C00] text-[14px]">@pumpkin_chan</span>
                      <span className="text-[#999999] text-[14px] ml-[10px]">Just now</span>
                    </div>
                    <p className="text-white text-[14px] font-normal">치킨 근본 갑</p>
                  </div>
                </div>
                <div className="mr-[10px] flex items-center">
                  <button className="bg-[#FFCD95] rounded-full px-2 text-black">치킨</button>
                  <img src={kebabMenuIcon} className="p-[10px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

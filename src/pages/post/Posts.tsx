import { Activity, useEffect, useState } from "react";
import categoryArrow from "../../assets/posts/categoryArrow.svg";
import newPost from "../../assets/posts/newPost.svg";
import logo from "../../assets/sign/hotpotato_logo.png";

import PostCard from "./PostCard";
import supabase from "../../utils/supabase";
import { useNavigate, useParams } from "react-router";
import { SLUG_TO_LABEL, type CategorySlug } from "../../constants/categories";
import { deletePostAPI } from "../../services/post";
import Toast from "../../components/toast/Toast";
import ChatButton from "../../components/chat/ChatButton";
import { useAuthStore } from "../../stores/authStore";
import Sure from "../../components/modal/Sure";
import NoResultHome from "./NoResultHome";

export default function Posts() {
  // const profile = useAuthStore((state) => state.profile);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { topic } = useParams<{ topic: string }>();
  const isCategorySlug = (v: string): v is CategorySlug => Object.hasOwn(SLUG_TO_LABEL, v);
  const displayLabel = topic && isCategorySlug(topic) ? SLUG_TO_LABEL[topic] : "전체";
  const notify = (message: string, type: ToastType) => Toast({ message, type });
  const [confirmingUid, setConfirmingUid] = useState<string | null>(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("is_visible", true) // 숨김 게시물 제외
          .eq("category", topic!)
          .order("created_at", { ascending: false }); // 최신순 정렬

        if (error) throw error;
        setPosts(data);
      } catch (err: any) {
        console.error("게시물 불러오기 실패:", err.message);
        setError("게시물을 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  const deletePostHandler = async (uid: string) => {
    try {
      await deletePostAPI(uid);
      setPosts((prev) => prev.filter((item) => item.uid !== uid));
      notify("포스트가 삭제되었습니다.", "SUCCESS");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRequest = (uid: string) => {
    setConfirmingUid(uid);
  };

  const handleConfirmYes = async () => {
    if (confirmingUid) {
      await deletePostHandler(confirmingUid);
      setConfirmingUid(null);
    }
  };

  const handleConfirmClose = () => {
    setConfirmingUid(null);
  };

  if (loading)
    return <div className="text-center text-[#FF8C00] mt-10">게시물을 불러오는 중...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  return (
    <div>
      <div className="border-b border-[#FF8C00]">
        <div className="flex items-center justify-between max-w-[1200px] mx-auto h-[85px] text-[#FF8C00] ">
          <div className="flex items-center">
            <img
              src={categoryArrow}
              className="w-[31px] h-[26px] cursor-pointer"
              onClick={() => {
                navigate(-1);
              }}
            />
            <span className="text-[30px] ml-[20px]">{displayLabel}</span>
          </div>
          <img
            src={newPost}
            className="mr-[51px] cursor-pointer"
            onClick={() => {
              navigate("/write", {
                state: {
                  option: displayLabel,
                },
              });
            }}
          />
        </div>
      </div>

      <Activity mode={profile ? "visible" : "hidden"}>
        <ChatButton category={topic!} />
      </Activity>
      {posts.length !== 0 ? (
        <div className="max-w-[1200px] mx-auto">
            {confirmingUid && <Sure onYes={handleConfirmYes} onClose={handleConfirmClose} />}
          {posts.map((post) => (
            <PostCard
              key={post.uid}
              post={post}
              onDeleteClick={handleDeleteRequest}
              searchTerm={" "}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <img src={logo} alt="logo" className="opacity-[25%] w-[630px] h-[680px] absolute mb-60" />
          <p className="text-[40px] text-[#FFE99C] mt-60">게시물이 없습니다</p>
          <p className="text-[30px] text-[#FF8C00] mt-10">첫 번째 게시물을 작성해보세요</p>
          <p className="text-[15px] text-[#999999] mt-40">Press any key to go back</p>
          <NoResultHome />
        </div>
      )}
    </div>
  );
}

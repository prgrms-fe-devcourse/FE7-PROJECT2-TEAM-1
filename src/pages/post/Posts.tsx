import { Activity, useCallback, useEffect, useRef, useState } from "react";
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
import PostsSkeleton from "../../components/loading/PostsSkeleton";
import Report from "../../components/modal/Report";

const limitLength = 1;

export default function Posts() {
  const [openReportModal, setOpenReportModal] = useState(false);
  const [reportTargetId, setReportTargetId] = useState<string | null>(null);
  const profile = useAuthStore((state) => state.profile);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [postLoadingMore, setPostLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { topic } = useParams<{ topic: string }>();
  const isCategorySlug = (v: string): v is CategorySlug => Object.hasOwn(SLUG_TO_LABEL, v);
  const displayLabel = topic && isCategorySlug(topic) ? SLUG_TO_LABEL[topic] : "전체";
  const notify = (message: string, type: ToastType) => Toast({ message, type });
  const [confirmingUid, setConfirmingUid] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (topic) {
      if (!Object.hasOwn(SLUG_TO_LABEL, topic)) navigate("/notFound", { replace: true });
    }
  }, [topic, navigate]);

  const fetchPosts = useCallback(
    async (newOffset: number) => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("is_visible", true)
          .eq("category", topic!)
          .order("created_at", { ascending: false })
          .range(newOffset, newOffset + limitLength - 1);

        if (error) throw error;
        return data ?? [];
      } catch (err: any) {
        console.error("게시물 불러오기 실패:", err.message);
        setError("게시물을 불러오는 중 문제가 발생했습니다.");
        return [];
      } finally {
        setLoading(false);
      }
    },
    [topic],
  );

  useEffect(() => {
    (async () => {
      const data = await fetchPosts(0);
      setPosts(data);
      setOffset(data.length);
      if (data.length < limitLength) setHasMore(false);
    })();
  }, [fetchPosts]);

  const isFetching = useRef(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isFetching.current && !loading) {
          isFetching.current = true;
          setPostLoadingMore(true);

          await new Promise((r) => setTimeout(r, 500)); // optional delay

          const data = await fetchPosts(offset);

          if (data.length > 0) {
            setPosts((prev) => [...prev, ...data]);
            setOffset((prev) => prev + data.length);
          } else {
            setHasMore(false);
          }

          setPostLoadingMore(false);
          isFetching.current = false;
        }
      },
      { threshold: 1.0, rootMargin: "0px 0px 300px 0px" },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchPosts, offset, hasMore, loading]);

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
              if (!profile) {
                notify("로그인이 필요합니다.", "INFO");
                return;
              }
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

      {openReportModal && reportTargetId && (
        <Report id={reportTargetId} type="post" setOpenReportModal={setOpenReportModal} />
      )}

      {!loading && posts.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <img src={logo} alt="logo" className="opacity-[25%] w-[630px] h-[680px] absolute mb-60" />
          <p className="text-[40px] text-[#FFE99C] mt-60">게시물이 없습니다</p>
          <p className="text-[30px] text-[#FF8C00] mt-10">첫 번째 게시물을 작성해보세요</p>
          <p className="text-[15px] text-[#999999] mt-40">Press any key to go back</p>
          <NoResultHome />
        </div>
      ) : (
        <>
          {confirmingUid && <Sure onYes={handleConfirmYes} onClose={handleConfirmClose} />}
          {posts.map((post) => (
            <PostCard
              key={post.uid}
              post={post}
              onDeleteClick={handleDeleteRequest}
              searchTerm={" "}
              onReportClick={(id) => {
                setReportTargetId(id);
                setOpenReportModal(true);
              }}
            />
          ))}

          {/* 무한스크롤 트리거 */}
          {hasMore && !loading && <div ref={observerRef} className="h-[1px]" />}

          {/* 로딩 시 스켈레톤 */}
          {postLoadingMore && (
            <div className="flex justify-center items-center py-5">
              <PostsSkeleton />
            </div>
          )}
        </>
      )}
    </div>
  );
}

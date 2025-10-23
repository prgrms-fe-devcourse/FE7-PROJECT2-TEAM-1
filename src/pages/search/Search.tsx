import search from "../../assets/search/search_search.svg";
import ghosts from "../../assets/search/search_ghosts.svg";
import { useState } from "react";
import supabase from "../../utils/supabase";
import type { Database } from "../../types/database";
import SearchUsers from "./SearchUsers";
import noGhost from "../../assets/search/search_no_ghost.svg";
import PostCard from "../post/PostCard";
import { deletePostAPI } from "../../services/post";
import Toast from "../../components/toast/Toast";
import PostsSkeleton from "../../components/loading/PostsSkeleton";
import SearchSkeleton from "../../components/loading/SearchSkeleton";
import Sure from "../../components/modal/Sure";
import Report from "../../components/modal/Report";

type Post = Database["public"]["Tables"]["posts"]["Row"];
export default function Search() {
  const [openReportModal, setOpenReportModal] = useState(false);
  const [reportTargetId, setReportTargetId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"posts" | "users">("posts");
  const [searchTerm, setSearchTerm] = useState("");
  const [postSearchResult, setPostSearchResult] = useState<Post[]>([]);
  const [profileSearchResult, setProfileSearchResult] = useState<Profile[]>([]);
  const [noSearch, setNoSearch] = useState(false);
  const [confirmingUid, setConfirmingUid] = useState<string | null>(null);
  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const [isLoading, setIsLoading] = useState(true);

  const handlePosts = () => {
    setSelectedCategory("posts");
    setPostSearchResult([]);
    setNoSearch(false);
  };

  const handleUsers = () => {
    setSelectedCategory("users");
    setProfileSearchResult([]);
    setNoSearch(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim() === "") {
      notify("검색어를 입력해주세요!", "INFO");
      setPostSearchResult([]);
      setProfileSearchResult([]);
      return;
    }

    if (selectedCategory === "users") {
      try {
        setIsLoading(true);
        const { data: profiles, error } = await supabase
          .from("profiles")
          .select("*")
          .or(`username.ilike.%${searchTerm}%,handle.ilike.%${searchTerm}%`)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setNoSearch(true);
        if (profiles) {
          setProfileSearchResult(profiles);
        }
      } catch (error) {
        console.error(error);
      } finally {
        const timer = setTimeout(() => setIsLoading(false), 700);
        return () => clearTimeout(timer);
      }
    } else {
      try {
        setIsLoading(true);
        const { data: posts, error } = await supabase
          .from("posts")
          .select("*")
          .or(`post_title.ilike.%${searchTerm}%,post_desc.ilike.%${searchTerm}%`)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setNoSearch(true);
        if (posts) {
          setPostSearchResult(posts);
        }
      } catch (error) {
        console.error(error);
      } finally {
        const timer = setTimeout(() => setIsLoading(false), 700);
        return () => clearTimeout(timer);
      }
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

  return (
    <div>
      <div className="fixed z-20 bg-black w-full flex justify-center border-b-2 border-[#FF8C00] h-[85px]">
        <form
          id="forSearch"
          className="ml-25 w-[1200px] flex items-center gap-4"
          onSubmit={handleSearch}
        >
          <button type="submit">
            <img src={search} alt="search-logo" className="w-[31px] h-[31px] cursor-pointer" />
          </button>

          <div className="flex items-center border border-[#FF8C00] rounded-[12px] w-[1047px] h-[45px] px-4 focus-within:shadow-[0_0_10px_4px_rgba(255,140,0,0.5)] transition-shadow duration-300">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 border-none outline-none bg-transparent"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <div className=" flex border border-[#FF8C00] rounded-[30px] text-[#FFFFFF]">
              <button
                type="button"
                onClick={handlePosts}
                className={`transition-colors rounded-l-[30px] flex justify-center items-center gap-1  cursor-pointer w-[77px] h-[26px] pl-6 pr-6 text-[12px] ${selectedCategory === "posts" ? "bg-[#FF8C00]" : ""}`}
              >
                POSTS
              </button>
              <button
                type="button"
                onClick={handleUsers}
                className={`transition-colors rounded-r-[30px] flex justify-center items-center gap-1  cursor-pointer w-[77px] h-[26px] pl-6 pr-6 text-[12px] ${selectedCategory === "users" ? "bg-[#FF8C00]" : ""}`}
              >
                USERS
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* {!noSearch && postSearchResult.length === 0 && profileSearchResult.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-111px)]">
          <p className="text-[28px]">무엇을 검색해볼까 . . .</p>
          <img src={ghosts} alt="ghosts" />
        </div>
      ) : noSearch && postSearchResult.length === 0 && profileSearchResult.length === 0 ? (
        <div className="gap-x-1.5 flex flex-row justify-center items-center min-h-[calc(100vh-111px)]">
          <img src={noGhost} alt="no-ghosts" className="w-[70px] h-[70px]" />
          <p className="text-[28px]">검색 결과가 없습니다 . . .</p>
          <img src={noGhost} alt="no-ghosts" className="w-[70px] h-[70px]" />
        </div>
      ) : selectedCategory === "posts" ? (
        postSearchResult.map((post) => (
          <PostCard
            key={post.uid}
            post={post}
            searchTerm={searchTerm}
            deletePostHandler={deletePostHandler}
          />
        ))
      ) : (
        profileSearchResult.map((user) => (
          <SearchUsers key={user.handle} result={user} searchTerm={searchTerm} />
        ))
      )} */}
      <div className="pt-25">
        {isLoading && noSearch ? (
          selectedCategory === "posts" ? (
            [...Array(4)].map((_, index) => <PostsSkeleton key={index} />)
          ) : (
            [...Array(4)].map((_, index) => <SearchSkeleton key={index} />)
          )
        ) : !noSearch && postSearchResult.length === 0 && profileSearchResult.length === 0 ? (
          <div className="flex flex-col justify-center items-center min-h-[calc(100vh-111px)]">
            <p className="text-[28px]">무엇을 검색해볼까 . . .</p>
            <img src={ghosts} alt="ghosts" />
          </div>
        ) : noSearch && postSearchResult.length === 0 && profileSearchResult.length === 0 ? (
          <div className="gap-x-1.5 flex flex-row justify-center items-center min-h-[calc(100vh-111px)]">
            <img src={noGhost} alt="no-ghosts" className="w-[70px] h-[70px]" />
            <p className="text-[28px]">검색 결과가 없습니다 . . .</p>
            <img src={noGhost} alt="no-ghosts" className="w-[70px] h-[70px]" />
          </div>
        ) : selectedCategory === "posts" ? (
          <div>
            {confirmingUid && <Sure onYes={handleConfirmYes} onClose={handleConfirmClose} />}
            {postSearchResult.map((post) => (
              <PostCard
                key={post.uid}
                post={post}
                searchTerm={searchTerm}
                onDeleteClick={handleDeleteRequest}
                onReportClick={(id) => {
                  setReportTargetId(id);
                  setOpenReportModal(true);
                }}
              />
            ))}
            {openReportModal && reportTargetId && (
              <Report id={reportTargetId} type="post" setOpenReportModal={setOpenReportModal} />
            )}
          </div>
        ) : (
          profileSearchResult.map((user) => (
            <SearchUsers key={user.handle} result={user} searchTerm={searchTerm} />
          ))
        )}
      </div>
    </div>
  );
}
function deletePostHandler(confirmingUid: string) {
  throw new Error("Function not implemented.");
}

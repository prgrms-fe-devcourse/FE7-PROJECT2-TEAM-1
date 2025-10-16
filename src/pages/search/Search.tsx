import search from "../../assets/search/search_search.svg";
import ghosts from "../../assets/search/search_ghosts.svg";
import { useState } from "react";
import supabase from "../../utils/supabase";
import type { Database } from "../../types/database";
import SearchPosts from "./SearchPosts";
import SearchUsers from "./SearchUsers";
import Sure from "../../components/modal/Sure";

type Post = Database["public"]["Tables"]["posts"]["Row"];
export default function Search() {
  const [selectedCategory, setSelectedCategory] = useState<"posts" | "users">("posts");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<Profile[] | Post[]>([]);
  const [report, setReport] = useState(false);

  const handleReport = () => {
    setReport(true);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim() === "") {
      alert("검색어를 입력해주세요!");
      setSearchResult([]);
      return;
    }

    if (selectedCategory === "users") {
      try {
        const { data: profiles, error } = await supabase
          .from("profiles")
          .select("*")
          .or(`username.ilike.%${searchTerm}%,handle.ilike.%${searchTerm}%`);
        if (error) throw error;
        if (profiles) {
          setSearchResult(profiles);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const { data: posts, error } = await supabase
          .from("posts")
          .select("*")
          .or(`username.ilike.%${searchTerm}%,handle.ilike.%${searchTerm}%`);
        if (error) throw error;
        if (posts) {
          setSearchResult(posts);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center border-b-2 border-[#FF8C00] h-[85px]">
        <form id="forSearch" className="w-[1200px] flex items-center gap-4" onSubmit={handleSearch}>
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
            <div className="flex border border-[#FF8C00] rounded-[30px] text-[#FFFFFF]">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("posts");
                }}
                className={`transition-colors rounded-l-[30px] flex justify-center items-center gap-1  cursor-pointer w-[80px] h-[34px] pl-6 pr-6 text-[12px] ${selectedCategory === "posts" ? "bg-[#FF8C00]" : ""}`}
              >
                POSTS
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("users");
                }}
                className={`transition-colors rounded-r-[30px] flex justify-center items-center gap-1  cursor-pointer w-[80px] h-[34px] pl-6 pr-6 text-[12px] ${selectedCategory === "users" ? "bg-[#FF8C00]" : ""}`}
              >
                USERS
              </button>
            </div>
          </div>
        </form>
      </div>
      {searchResult.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-111px)]">
          <p className="text-[28px]">무엇을 검색해볼까 . . .</p>
          <img src={ghosts} alt="ghosts" />
        </div>
      ) : selectedCategory === "posts" ? (
        // searchResult.map((post: Post) => <SearchUsers key={post.uid} result={post} />)
        ""
      ) : (
        (searchResult as Profile[]).map((user) => <SearchUsers key={user.handle} result={user} />)
      )}
      {/* <div className="flex flex-col justify-center items-center min-h-[calc(100vh-111px)]">
        <p className="text-[28px]">무엇을 검색해볼까 . . .</p>
        <img src={ghosts} alt="ghosts" />
      </div> */}
      <button className="cursor-pointer" onClick={handleReport}>
        신고하기
      </button>
      {report && <Sure />}
    </div>
  );
}

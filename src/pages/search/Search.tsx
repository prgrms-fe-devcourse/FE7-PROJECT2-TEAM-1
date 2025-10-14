import search from "../../assets/search/search_search.svg";
import ghosts from "../../assets/search/search_ghosts.svg";
import { useState } from "react";

export default function Search() {
  const [selectedCategory, setSelectedCategory] = useState<"posts" | "users">("posts");

  return (
    <div>
      <div className="w-full flex justify-center border-b-2 border-[#FF8C00] h-[85px]">
        <form className="w-[1200px] flex items-center gap-4">
          <button type="submit">
            <img src={search} alt="search-logo" className="w-[31px] h-[31px] cursor-pointer" />
          </button>

          <div className="flex items-center border border-[#FF8C00] rounded-[12px] w-[1047px] h-[45px] px-4 focus-within:shadow-[0_0_10px_4px_rgba(255,140,0,0.5)] transition-shadow duration-300">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 border-none outline-none bg-transparent"
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
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-111px)]">
        <p className="text-[28px]">무엇을 검색해볼까 . . .</p>
        <img src={ghosts} alt="ghosts" />
      </div>
    </div>
  );
}

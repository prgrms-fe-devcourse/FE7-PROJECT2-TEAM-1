import homeBanner from "../../assets/home/homeBanner.svg";
import FriendshipIcon from "../../assets/home/friendship.svg?react";
import LoveIcon from "../../assets/home/love.svg?react";
import FoodIcon from "../../assets/home/food.svg?react";
import LifeIcon from "../../assets/home/life.svg?react";
import WorkIcon from "../../assets/home/work.svg?react";
import HobbyIcon from "../../assets/home/hobby.svg?react";
import { useRef } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const categories = [
    { label: "우정", slug: "friendship", Icon: FriendshipIcon },
    { label: "연애", slug: "love", Icon: LoveIcon },
    { label: "음식", slug: "food", Icon: FoodIcon },
    { label: "생활", slug: "life", Icon: LifeIcon },
    { label: "직장", slug: "work", Icon: WorkIcon },
    { label: "취미", slug: "hobby", Icon: HobbyIcon },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollHandler = () => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const goToPostsHandler = (slug: string) => {
    // navigate("/posts");
    navigate(`/posts/${slug}`);
  };

  return (
    <>
      <main className="max-w-dvw min-h-dvh bg-black overflow-hidden">
        <div className="space-y-[60px] max-w-dvw">
          <section
            style={{ backgroundImage: `url(${homeBanner})`, backgroundPosition: "center" }}
            className=" h-[620px] w-[100vw] place-items-center space-y-[36px] whitespace-nowrap overflow-hidden text-clip"
          >
            <br />
            <p className="text-[#FF8C00] text-[80px] text-sm/23 mt-[108px] mb-[5px] ml-[20px] overflow-hidden text-shadow-[4px_4px_6px_rgba(255,_0,_0,_0.5)]">
              &nbsp;지금 선택할 순간,
            </p>
            <p className="text-[#FF8C00] text-[80px] text-sm/23 ml-[8px] text-shadow-[4px_4px_6px_rgba(255,_0,_0,_0.5)]">
              &nbsp;당신의 선택은?
            </p>
            <p className="text-white text-[28px] font-normal">
              "뜨거운 감자 같은 어려운 선택, 다른 사람들은 무엇을 골랐을까?"
            </p>
            <div
              className="relative border-[#FF8C00] border-[2px] rounded-[8px] w-[285px] h-[56px] flex items-center justify-center
              hover:scale-102 cursor-pointer group active:translate-y-1 transition-transform duration-200"
              onClick={scrollHandler}
            >
              <p className="text-[#FF8C00] text-[18px] group-hover:text-white">Choose a Topic</p>
            </div>
          </section>
          <section className="h-[525px] place-items-center" ref={scrollRef}>
            <div className="grid grid-cols-3 gap-6 justify-items-center">
              {categories.map(({ label, slug, Icon }) => (
                <button
                  key={label}
                  className="relative group transition-transform hover:scale-101 cursor-pointer
                  active:translate-y-1 duration-200"
                  onClick={() => goToPostsHandler(slug)}
                >
                  <Icon className="w-[383px] h-[191px] border-[#FF8C00] border-2 rounded-[12px] group-hover:bg-[rgba(218,218,218,0.33)]" />
                  <span className="absolute inset-0 flex items-center justify-center text-white text-[38px] opacity-70 group-hover:opacity-100 duration-300">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

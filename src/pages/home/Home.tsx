import homeBanner from "../../assets/home/homeBanner.svg";
import FriendshipIcon from "../../assets/home/friendship.svg?react";
import LoveIcon from "../../assets/home/love.svg?react";
import FoodIcon from "../../assets/home/food.svg?react";
import LifeIcon from "../../assets/home/life.svg?react";
import WorkIcon from "../../assets/home/work.svg?react";
import HobbyIcon from "../../assets/home/hobby.svg?react";

export default function Home() {
  const categories = [
    { label: "우정", Icon: FriendshipIcon },
    { label: "연애", Icon: LoveIcon },
    { label: "음식", Icon: FoodIcon },
    { label: "일상", Icon: LifeIcon },
    { label: "직장", Icon: WorkIcon },
    { label: "취미", Icon: HobbyIcon },
  ];
  return (
    <>
      <main className="max-w-dvw min-h-dvh bg-black overflow-hidden">
        <div className="space-y-[60px] max-w-dvw">
          <section
            style={{ backgroundImage: `url(${homeBanner})`, backgroundPosition: "center" }}
            className=" h-[620px] w-[100vw] place-items-center space-y-[36px] whitespace-nowrap overflow-hidden text-clip"
          >
            <br />
            <p className="text-[#FF8C00] text-[80px] text-sm/23 mt-[108px]">
              "지금 선택할 순간, <br /> &nbsp; 당신의 선택은?"
            </p>
            <p className="text-white text-[28px] ">
              "뜨거운 감자 같은 어려운 선택. 다른 사람들은 뭐를 골랐을까?"
            </p>
            <div className="relative border-[#FF8C00] border-[2px] rounded-[8px] w-[285px] h-[56px] flex items-center justify-center">
              <p className="text-[#FF8C00] text-[18px] ">Choose a Topic</p>
            </div>
          </section>
          <section className="h-[525px] place-items-center">
            <div className="grid grid-cols-3 gap-6 justify-items-center">
              {categories.map(({ label, Icon }) => (
                <button key={label} className="relative group transition-transform hover:scale-105">
                  <Icon className="w-[383px] h-[191px] border-[#FF8C00] border-2 rounded-[12px] group-hover:drop-shadow-[0_0_15px_#ff8c00]" />
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

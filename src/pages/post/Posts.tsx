import categoryArrow from "../../assets/posts/categoryArrow.svg";
import newPost from "../../assets/posts/newPost.svg";
import profileImage from "../../assets/posts/profileImage.svg";
import kebabMenuIcon from "../../assets/posts/kebabMenuIcon.svg";
import chicken from "../../assets/posts/chicken.svg";
import pizza from "../../assets/posts/pizza.svg";
import likeIcon from "../../assets/posts/likeIcon.svg";
import commentIcon from "../../assets/posts/commentIcon.svg";

export default function Posts() {
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
          <div className="space-y-[30px]">
            <div className="ml-[51px]">
              <h2 className="mt-[30px] text-[20px] text-white">치킨 vs 피자, 당신의 선택은?</h2>
              <p style={{ fontWeight: "normal" }} className="text-[16px]  text-[#999999]">
                금요일 저녁, 친구들과 모였을 때 뭘 시켜먹을까요?
              </p>
            </div>
            <div className="relative flex justify-between mx-[51px]">
              <div className="relative w-[488px] h-[406px] overflow-hidden rounded-[12px] border-[2px] border-[#FF8C00]/60 ">
                <img
                  src={chicken}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="overlay-gradient pointer-events-none" />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-[18px] ">
                  치킨
                </span>
              </div>
              <div className="relative w-[488px] h-[406px]  overflow-hidden rounded-[12px] border-[2px] border-[#FF8C00]/60">
                <img
                  src={pizza}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 "
                />
                <div className="overlay-gradient pointer-events-none" />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-[18px]">
                  피자
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center mx-auto w-[996px] h-[50px] border-y-[2px] border-[#FF8C00]/20">
                <img src={likeIcon} className="ml-[13px] mr-[21px] w-[25px]" />
                <span className="text-[14px]">45</span>
              </div>
              <div className="flex items-center mx-auto w-[996px] h-[50px] mb-[20px]">
                <img src={commentIcon} className="ml-[13px] mr-[21px] w-[25px]" />
                <span className="text-[14px] text-[#FF8C00] mr-[3px]">comments</span>
                <span className="text-[14px] text-[#FF8C00]">(0)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

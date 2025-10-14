import my from "../../assets/search/search_my.svg";
export default function SearchUsers() {
  return (
    <>
      <div className="flex justify-center items-center mt-12">
        <div className="w-[1094px] h-[104px] flex items-center border-2 border-[rgb(255_140_0_/_0.3)] rounded-[12px]">
          <button className="cursor-pointer flex gap-5 ml-5">
            <div className="overflow-hidden border-2 border-[rgb(255_140_0)] rounded-[30px]">
              <img src={my} alt="my" />
            </div>
            <p className="text-[16px] mt-1.5">김철수</p>
            <p className="text-[#FF8C00] text-[14px] mt-2">@chulsoo_kim</p>
          </button>
        </div>
      </div>
    </>
  );
}

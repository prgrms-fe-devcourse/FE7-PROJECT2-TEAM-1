export default function SearchSkeleton() {
  return (
    <>
      <div className=" flex justify-center items-center mt-7">
        <div className="w-[1094px] h-[104px] flex items-center border-2 border-[rgb(255_140_0_/_0.3)] rounded-[12px] hover:scale-101 hover:border-[rgb(255,140,0)]  transition-all duration-200  cursor-pointer">
          <button className="cursor-pointer flex gap-7 ml-5 animate-pulse">
            <div className="relative w-[50px] h-[50px] rounded-full bg-[#AAAAAA] p-1.5 flex-shrink-0"></div>
            <div className="flex items-center w-[510px] h-[45px] mt-[2px] rounded-[5px] bg-[#AAAAAA]"></div>
          </button>
        </div>
      </div>
    </>
  );
}

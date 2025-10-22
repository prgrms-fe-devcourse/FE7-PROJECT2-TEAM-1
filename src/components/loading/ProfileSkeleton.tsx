import PostsSkeleton from "./PostsSkeleton";

export default function ProfileSkeleton() {
  return (
    <>
      <main className="max-w-dvw min-h-dvh bg-black overflow-hidden pb-[50px]">
        <div className="flex flex-col items-center animate-pulse">
          <div className="relative w-[1098px] h-auto bg-[#0A0A0A] border-2 border-[#FF8C00] rounded-[12px] shadow-[0_1px_3px_#000000] m-auto mt-[33px] flex flex-col text-white">
            <div className="flex items-center gap-[20px] px-[40px] py-[30px] pb-[20px] mt-[35px]">
              <div className="relative w-[95px] h-[95px] rounded-full bg-[#AAAAAA] p-1.5 flex-shrink-0"></div>

              <div className="flex flex-col gap-[10px] w-[890px]">
                <div className="w-[140px] h-[40px] rounded-[5px] bg-[#AAAAAA]"></div>
                <div className="w-[190px] h-[22px] rounded-[5px] bg-[#AAAAAA]"></div>
                <div className="w-[510px] h-[22px] rounded-[5px] bg-[#AAAAAA]"></div>
                <div className="w-[250px] h-[22px] rounded-[5px] bg-[#AAAAAA]"></div>
              </div>
            </div>

            <div className="w-[996px] min-h-[98px] border-t border-[#FF8C00] m-auto mt-[30px] mb-[10px] flex justify-center gap-[220px] py-[20px]">
              <div className="flex flex-col items-center justify-center">
                <div className="w-[100px] h-[30px] rounded-[5px] bg-[#AAAAAA]"></div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-[100px] h-[30px] rounded-[5px] bg-[#AAAAAA]"></div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-[100px] h-[30px] rounded-[5px] bg-[#AAAAAA]"></div>
              </div>
            </div>
          </div>
          <div className="w-[1098px] h-auto text-left text-[24px] mt-[60px] mb-[5px]">
            작성한 게시글
          </div>
          <PostsSkeleton />
        </div>
      </main>
    </>
  );
}

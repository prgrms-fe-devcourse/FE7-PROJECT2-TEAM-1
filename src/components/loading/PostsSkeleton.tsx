export default function PostsSkeleton() {
  return (
    <>
      <div className="max-w-[1200px] mx-auto mb-[100px] mt-[10px]">
        <div className="group w-[1098px] border-[2px] border-[#FF8C00]/30 rounded-[12px] mt-[30px] mx-auto transition-colors duration-300 hover:border-[#FF8C00]/60 ">
          <div className="flex items-center justify-between h-[100px] border-b-[2px] border-[#FF8C00]/30 transition-colors duration-300 group-hover:border-[#FF8C00]/60 animate-pulse">
            <div className="flex w-[1000px] justify-between ml-[51px]">
              <div className="flex">
                <div className="w-[45px] h-[45px] rounded-full overflow-hidden bg-[#AAAAAA] mr-[11px]"></div>
                <div>
                  <div className="w-[100px] h-[20px] mb-[7px] rounded-[5px] bg-[#AAAAAA]"></div>
                  <div className="w-[100px] h-[20px] rounded-[5px] bg-[#AAAAAA]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-[30px] animate-pulse">
            <div className="ml-[51px] mt-[25px]">
              <div className="w-[200px] h-[30px] mb-[12px] rounded-[5px] bg-[#AAAAAA]"></div>
              <div className="w-[600px] h-[50px] rounded-[5px] bg-[#AAAAAA]"></div>
            </div>

            <div className="relative flex justify-between mx-[51px] gap-[28px]">
              <div className="relative w-[488px] h-[406px] overflow-hidden rounded-[12px] bg-[#AAAAAA]"></div>
              <div className="relative w-[488px] h-[406px] overflow-hidden rounded-[12px] bg-[#AAAAAA]"></div>
            </div>

            <div className="flex items-center mx-auto mb-[0px] w-[996px] h-[50px] border-y-[2px] border-[#FF8C00]/20">
              <div className="w-[80px] h-[30px] mt-[20px] mb-[20px] rounded-[5px] bg-[#AAAAAA]"></div>
            </div>
            <div className="flex items-center mx-auto mb-[10px] w-[996px] h-[50px] border-[#FF8C00]/20">
              <div className="w-[150px] h-[30px] mt-[12px] mb-[8px] rounded-[5px] bg-[#AAAAAA]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

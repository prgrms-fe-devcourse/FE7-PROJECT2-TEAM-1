export default function AlarmCardProfileSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-[10px] p-3.5">
        <div className="flex gap-[10px] text-left pt-1">
          <div className="relative w-[35px] h-[35px] rounded-full bg-[#AAAAAA] flex-shrink-0 animate-pulse"></div>
          <div>
            <div className="mb-[8px] w-[80px] h-[15px] rounded-[5px] bg-[#AAAAAA] animate-pulse"></div>
            <div className="w-[150px] h-[15px] rounded-[5px] bg-[#AAAAAA] animate-pulse"></div>
          </div>
        </div>
        <div className="p-1">
          <div className="mb-[8px] w-[120px] h-[15px] rounded-[5px] bg-[#AAAAAA] animate-pulse"></div>
          <div className="w-[250px] h-[15px] rounded-[5px] bg-[#AAAAAA] animate-pulse"></div>
        </div>
      </div>
    </>
  );
}

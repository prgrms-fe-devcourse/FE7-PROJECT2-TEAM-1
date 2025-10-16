import profile_default from "../../../assets/profile/profile_default.png";

export default function AlarmCardComment() {
  return (
    <>
      <div className="flex flex-col gap-[10px] p-3.5">
        <div className="flex gap-[10px] text-left pt-1">
          <div className="relative w-[35px] h-[35px] rounded-full  border-2 border-[#FF8C00] flex-shrink-0">
            <img
              src={profile_default}
              alt="profile_img"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <p className="font-normal text-[12px] mb-[2px]">김철수</p>
            <p className="font-normal text-[9px] mt-[3px]">@chulsoo_kim</p>
          </div>
        </div>
        <div className="p-1">
          <p className="font-normal text-[11px] text-[#d3cfcf] mb-[3px]">답글을 남기셨습니다.</p>
          <p className="font-normal text-[12px] underline" style={{ wordSpacing: "-5px" }}>
            치킨 근본 갑
          </p>
        </div>
      </div>
    </>
  );
}

import close from "../../assets/alarm/alarm_close.png";

export default function Alarm() {
  return (
    <>
      {/* <div className="absolute top-10 right-6 w-0 h-0 border-l-8 border-r-10 border-b-15 border-transparent border-b-[rgba(249,249,249,0.77)] z-50"></div> */}
      <div className="absolute top-9 right-1 w-[350px] min-h-[500px] max-h-[500px] border-1 border-[#ffffff30] rounded-[8px] mt-3 shadow-lg shadow-[#0A0A0A] overflow-x-hidden overflow-y-auto transition-all duration-200 z-50 backdrop-blur-2xl">
        {/* <div className="sticky top-0 min-h-[70px] text-[16px] text-[#efefef] font-normal flex items-center justify-center text-center z-10 backdrop-blur-sm">
          Notice
        </div> */}

        <div className="flex flex-col items-center gap-[9px] mt-7">
          <div className="relative w-[320px] min-h-[100px] bg-[rgba(218,218,218,0.33)] rounded-[12px] m-auto cursor-pointer transition-transform duration-300 hover:scale-101 hover:bg-[rgba(175,174,174,0.34)] active:scale-98 shadow-sm shadow-[#0A0A0A] backdrop-blur-sm">
            <img
              className="absolute right-2 top-2 transition-transform duration-200 hover:scale-105"
              src={close}
              alt="alarm_close"
            />
            <p className="p-4.5 pb-0 text-[13px] underline text-[#d3cfcf] hover:text-[#bfbcbc]">
              치킨 VS 피자 당신의 선택은?
            </p>
            <p className="p-4.5 font-normal text-[11px]">
              해당 게시물에서 "<span className="font-bold text-[#ff8c00cc]">치킨</span>" 선택지의
              투표 수가 우세하고 있습니다.
            </p>
          </div>
          <div className="relative w-[320px] min-h-[100px] bg-[rgba(218,218,218,0.33)] rounded-[12px] m-auto cursor-pointer transition-transform duration-300 hover:scale-101 hover:bg-[rgba(175,174,174,0.34)] active:scale-98 shadow-sm shadow-[#0A0A0A] backdrop-blur-sm">
            <img
              className="absolute right-2 top-2 transition-transform duration-200 hover:scale-105"
              src={close}
              alt="alarm_close"
            />
            <p className="p-4.5 pb-0 text-[13px] underline text-[#000000c2] hover:text-[#de7b18f6]">
              치킨 VS 피자 당신의 선택은?
            </p>
            <p className="p-4.5 font-normal text-[11px]">
              해당 게시물에서 "<span className="font-bold text-[#ff8c00cc]">김철수</span>" 님이
              댓글을 남기셨습니다
            </p>
          </div>
          <div className="relative w-[320px] min-h-[100px] bg-[rgba(218,218,218,0.33)] rounded-[12px] m-auto cursor-pointer transition-transform duration-300 hover:scale-101 hover:bg-[rgba(175,174,174,0.34)] active:scale-98 shadow-sm shadow-[#0A0A0A] backdrop-blur-sm">
            <img
              className="absolute right-2 top-2 transition-transform duration-200 hover:scale-105"
              src={close}
              alt="alarm_close"
            />
            <p className="p-4.5 pb-0 text-[13px] underline text-[#000000c2] hover:text-[#de7b18f6]">
              치킨 VS 피자 당신의 선택은?
            </p>
            <p className="p-4.5 font-normal text-[11px]">해당 게시물이 숨김 처리 되었습니다.</p>
          </div>
        </div>
      </div>
    </>
  );
}

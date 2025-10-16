export default function AlarmCardVote({ alarm }: { alarm: Alarm }) {
  // reference_id로 vote db 갖고와서 가공

  return (
    <>
      <p className="p-4.5 pb-0 text-[13px] underline text-[#d3cfcf] hover:text-[#bfbcbc]">
        치킨 VS 피자 당신의 선택은?
      </p>
      <p className="p-4.5 font-normal text-[11px]">
        해당 게시물에서 "<span className="font-bold text-[#ff8c00cc]">치킨</span>" 선택지의 투표
        수가 우세하고 있습니다.
      </p>
    </>
  );
}

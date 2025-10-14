export default function Write() {
  return (
    <>
      <div>
        <div>
          <span>(화살표)새 밸런스 게임 만들기</span>
        </div>

        <div className="w-300 h-248 border-2 border-[#FF8C00]">
          <div>
            <div>
              <p>주제 선택</p>
              <select className="w-50.5 h-9 border-2 border-[#FF8C00]">
                <option>주제를 선택하세요</option> {/* 선택 안 되도록 */}
                <option>우정</option>
                <option>연애</option>
                <option>음식</option>
                <option>생활</option>
                <option>취미</option>
                <option>일</option>
              </select>
            </div>
            <div>
              <p>제목</p>
              <input
                placeholder="예: 치킨 vs 피자, 당신의 선택은?"
                className="w-284.5 h-9 border-2 border-[#FF8C00]"
              ></input>
            </div>
            <div>
              <p>설명</p>
              <input
                placeholder="밸런스 게임에 대한 설명을 입력하세요"
                className="w-284.5 h-24 border-2 border-[#FF8C00]"
              ></input>
            </div>
          </div>

          <div className="grid justify-items-center">
            <div className="flex-1 border-t border-gray-400"></div>
            <p>선택지(양쪽으로 구분선)</p>
            <div className="flex-1 border-t border-gray-400"></div>
          </div>

          <div className="grid grid-cols-2 gap-5.13 justify-items-center">
            <div>
              <p>(아이콘)선택지 A</p>
              <input
                placeholder="선택지 텍스트"
                className="w-132 h-9 border-2 border-[#FF8C00]"
              ></input>
              <p className="w-132 h-80.5 border-2 border-dashed border-[#FF8C00]">(이미지업로드)</p>
            </div>
            <div>
              <p>(아이콘)선택지 B</p>
              <input
                placeholder="선택지 텍스트"
                className="w-132 h-9 border-2 border-[#FF8C00]"
              ></input>
              <p className="w-132 h-80.5 border-2 border-dashed border-[#FF8C00]">(이미지업로드)</p>
            </div>
          </div>

          <div className="grid justify-items-center">
            <button className="w-106.5 h-10.25" />
            게시하기
          </div>
        </div>
      </div>
    </>
  );
}

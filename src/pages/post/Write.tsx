export default function Write() {
  return (
    <>
      <div>
        <button />새 밸런스 게임 만들기
      </div>

      <div>
        <div>
          <div>
            <p>주제 선택</p>
            <select>
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
            <input placeholder="예: 치킨 vs 피자, 당신의 선택은?"></input>
          </div>
          <div>
            <p>설명</p>
            <input placeholder="밸런스 게임에 대한 설명을 입력하세요"></input>
          </div>
        </div>

        <div>
          <div className="flex-1 border-t border-gray-400"></div>
          <p>선택지(양쪽으로 구분선)</p>
          <div className="flex-1 border-t border-gray-400"></div>
        </div>

        <div>
          <div>
            <p>(아이콘)선택지 A</p>
            <input placeholder="선택지 텍스트"></input>
            <p>(이미지업로드)</p>
          </div>
          <div>
            <p>(아이콘)선택지 B</p>
            <input placeholder="선택지 텍스트"></input>
            <p>(이미지업로드)</p>
          </div>
        </div>

        <div>
          <button />
          게시하기
        </div>
      </div>
    </>
  );
}

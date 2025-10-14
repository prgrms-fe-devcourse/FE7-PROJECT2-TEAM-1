import uploadButton from "../../assets/write/upload_button.svg";

export default function Write() {
  return (
    <>
      <div>
        <div>
          <span>(화살표)새 밸런스 게임 만들기</span>
        </div>

        <div className="w-[1250px] h-[1150px] px-[59px] py-[35px] border-2 border-[#FF8C00]">
          <div>
            <p className="mb-[10px]">주제 선택</p>
            <select className="w-[202px] h-[36px] mb-[30px] border-2 border-[#FF8C00]">
              <option>주제를 선택하세요</option> {/* 선택 안 되도록 */}
              <option>우정</option>
              <option>연애</option>
              <option>음식</option>
              <option>생활</option>
              <option>취미</option>
              <option>일</option>
            </select>
            <p className="mb-[10px]">제목</p>
            <input
              placeholder="예: 치킨 vs 피자, 당신의 선택은?"
              className="w-[1138px] h-[36px] mb-[10px] border-2 border-[#FF8C00]"
            ></input>
            <p className="mb-[30px]">0/20</p>
            <p className="mb-[10px]">설명</p>
            <input
              placeholder="밸런스 게임에 대한 설명을 입력하세요"
              className="w-[1138px] h-[96px] mb-[10px] border-2 border-[#FF8C00]"
            ></input>
            <p className="mb-[46px]">0/200</p>
          </div>

          <div className="flex flex-cols-3 items-center mb-[42px]">
            <div className="w-[540px] h-[1px] bg-[#FF8C00]"></div>
            <p className="text-[#FF8C00]">선택지</p>
            <div className="w-[540px] h-[1px] bg-[#FF8C00]"></div>
          </div>

          <div className="grid grid-cols-2 gap-[82px] justify-items-center">
            <div>
              <div className="mb-[16px]">
                <p>(아이콘)선택지 A</p>
              </div>
              <input
                placeholder="선택지 텍스트"
                className="w-[528px] h-[36px] mb-[10px] border-2 border-[#FF8C00]"
              ></input>
              <p className="mb-[16px]">0/15</p>
              <img src={uploadButton} className=" w-[35px] h-[35px]" />
              <p className="w-[528px] h-[322px] mb-[60px] border-2 border-dashed border-[#FF8C00]">
                이미지업로드
              </p>
            </div>
            <div>
              <div className="mb-[16px]">
                <p>(아이콘)선택지 B</p>
              </div>
              <input
                placeholder="선택지 텍스트"
                className="w-[528px] h-[36px] mb-[10px] border-2 border-[#FF8C00]"
              ></input>
              <p className="mb-[16px]">0/15</p>
              <img src={uploadButton} className=" w-[35px] h-[35px]" />
              <p className="w-[528px] h-[322px]  mb-[60px] border-2 border-dashed border-[#FF8C00]">
                이미지업로드
              </p>
            </div>
          </div>

          <div className="grid justify-items-center">
            <button className="w-[426px] h-[41px] bg-[#FF8C00]">게시하기 </button>
          </div>
        </div>
      </div>
    </>
  );
}

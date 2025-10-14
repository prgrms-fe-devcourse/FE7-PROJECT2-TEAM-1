import uploadButton from "../../assets/write/upload_button.svg";
import categoryArrow from "../../assets/posts/categoryArrow.svg";

export default function Write() {
  return (
    <>
      <div>
        <div className="my-[35px] ml-[25px] flex gap-5 items-center ">
          <img src={categoryArrow} className="w-[31px] h-[26px] mt-[7px]" />
          <p className="w-[1000px] h-[30px] text-[#FF8C00] text-3xl">새 밸런스 게임 만들기</p>
        </div>
        <div className="w-[1250px] h-[1150px] px-[59px] py-[35px] border-2 border-[#FF8C00] rounded-xl">
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
              className="w-[1138px] h-[40px] mb-[10px] pl-[15px] border-2 border-[#FF8C00] rounded-md"
            ></input>
            <p className="mb-[30px] text-right">0/20</p>
            <p className="mb-[10px]">설명</p>
            <input
              placeholder="밸런스 게임에 대한 설명을 입력하세요"
              className="w-[1138px] h-[105px] mb-[10px] pl-[15px] pb-[60px] border-2 border-[#FF8C00] rounded-md"
            ></input>
            <p className="mb-[46px] text-right">0/200</p>
          </div>

          <div className="flex flex-cols-3 items-center mb-[42px]">
            <div className="w-[540px] h-[1px] bg-[#FF8C00]"></div>
            <p className="text-[#FF8C00]">선택지</p>
            <div className="w-[540px] h-[1px] bg-[#FF8C00]"></div>
          </div>

          <div className="grid grid-cols-2 gap-[82px] justify-items-center">
            <div>
              <div className="mb-[16px] flex items-center gap-[19px]">
                <div
                  className="w-[32px] h-[32px] border-2 rounded-[50%] border-[#FF8C00] text-[#FF8C00] bg-[#FF8C00]/30
                flex items-center justify-center"
                >
                  <p>A</p>
                </div>
                <p>선택지 A</p>
              </div>
              <input
                placeholder="선택지 텍스트"
                className="w-[528px] h-[40px] mb-[10px] pl-[15px] border-2 border-[#FF8C00] rounded-md"
              ></input>
              <p className="mb-[16px] text-right">0/15</p>

              <div
                className="w-[528px] h-[322px] mb-[50px] border-2 border-dashed border-[#FF8C00] rounded-lg
              flex flex-col items-center justify-center gap-[5px]"
              >
                <img src={uploadButton} className=" w-[35px] h-[35px]" />
                <p className="opacity-50">이미지업로드</p>
              </div>
            </div>
            <div>
              <div className="mb-[16px] flex items-center gap-[19px]">
                <div
                  className="w-[32px] h-[32px] border-2 rounded-[50%] border-[#FF8C00] text-[#FF8C00] bg-[#FF8C00]/30
                flex items-center justify-center"
                >
                  <p>B</p>
                </div>
                <p>선택지 B</p>
              </div>
              <input
                placeholder="선택지 텍스트"
                className="w-[528px] h-[40px] mb-[10px] pl-[15px] border-2 border-[#FF8C00] rounded-md"
              ></input>
              <p className="mb-[16px] text-right">0/15</p>
              <div
                className="w-[528px] h-[322px] mb-[50px] border-2 border-dashed border-[#FF8C00] rounded-lg
              flex flex-col items-center justify-center gap-[5px]"
              >
                <img src={uploadButton} className=" w-[35px] h-[35px]" />
                <p className="opacity-50">이미지업로드</p>
              </div>
            </div>
          </div>
          <div className="grid justify-items-center">
            <button className="w-[426px] h-[41px] bg-[#FF8C00] text-black rounded-md">
              게시하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

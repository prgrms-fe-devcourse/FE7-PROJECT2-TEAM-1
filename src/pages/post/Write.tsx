import uploadButton from "../../assets/write/upload_button.svg";
import categoryArrow from "../../assets/posts/categoryArrow.svg";

export default function Write() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[1200px] my-9 mx-auto flex gap-5 items-center">
          <img src={categoryArrow} className="w-[31px] h-[26px] mt-[7px]" />
          <p className="w-[1000px] text-[#FF8C00] text-3xl">새 밸런스 게임 만들기</p>
        </div>
        {/* 본문 컨테이너 */}
        <div className="max-w-[1200px] w-full h-auto min-h-[1200px] px-[59px] py-[35px] border-2 border-[#FF8C00] rounded-xl">
          <div className="flex flex-col space-y-2">
            <p className="mb-2.5">주제 선택</p>
            <select
              className="w-full max-w-[220px] my-1.5 pl-[10px] pb-[5px] outline-none
              h-[40px] mb-[45px] border-2 border-[#FF8C00]/60 rounded-md text-gray-70"
            >
              <option>주제를 선택하세요</option> {/* 선택 안 되도록 */}
              <option>우정</option>
              <option>연애</option>
              <option>음식</option>
              <option>생활</option>
              <option>취미</option>
              <option>일</option> {/*map*/}
            </select>

            <p className="mb-2.5">제목</p>
            <input
              type="text"
              placeholder="예: 치킨 vs 피자, 당신의 선택은?"
              className="w-full h-[45px] mb-2.5 pl-[15px] border-2 border-[#FF8C00]/60 rounded-md outline-none
              focus:border-[#FF8C00] focus:shadow-[0_0_10px_4px_rgba(255,140,0,0.5)] "
            ></input>
            <p className="mb-[30px] text-right">0/20</p>

            <p className="mb-[10px]">설명</p>
            <textarea
              placeholder="밸런스 게임에 대한 설명을 입력하세요"
              className="w-full h-auto min-h-[105px] mb-[10px] p-[15px] pt-[12px] border-2 border-[#FF8C00]/60 rounded-md outline-none
              focus:border-[#FF8C00] focus:shadow-[0_0_10px_4px_rgba(255,140,0,0.5)] "
            ></textarea>
            <p className="mb-[46px] text-right">0/200</p>
          </div>
          <div className="flex items-center mb-[42px]">
            <div className="flex-1 h-[1px] bg-[#FF8C00]"></div>
            <p className="text-[#FF8C00]">선택지</p>
            <div className="flex-1 h-[1px] bg-[#FF8C00]"></div>
          </div>
          <div className="w-full grid grid-cols-2 gap-[82px] justify-items-center">
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
                className="w-full h-[40px] mb-[10px] pl-[15px] border-2 border-[#FF8C00]/60 rounded-md outline-none focus:border-[#FF8C00]
                focus-within:shadow-[0_0_10px_4px_rgba(255,140,0,0.5)] "
              ></input>
              <p className="mb-[16px] text-right">0/15</p>

              <div
                className="w-[528px] h-auto min-h-[322px] mb-[50px] border-2 border-dashed border-[#FF8C00]/60 rounded-lg
              flex flex-col items-center justify-center gap-[5px] hover:border-[#FF8C00]"
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
                className="w-full h-[40px] mb-[10px] pl-[15px] border-2  border-[#FF8C00]/60 rounded-md outline-none focus:border-[#FF8C00]
                focus-within:shadow-[0_0_10px_4px_rgba(255,140,0,0.5)] "
              ></input>
              <p className="mb-[16px] text-right">0/15</p>
              <div
                className="w-[528px] h-auto min-h-[322px] mb-[50px] border-2 border-dashed border-[#FF8C00]/60 rounded-lg
              flex flex-col items-center justify-center gap-[5px] hover:border-[#FF8C00]
              "
              >
                <img src={uploadButton} className=" w-[35px] h-[35px]" />
                <p className="opacity-50">이미지업로드</p>
              </div>
            </div>
          </div>{" "}
          {/*map*/}
          <div className="grid justify-items-center">
            <button
              className="w-[426px] h-[41px] bg-[#FF8C00] text-black rounded-md
              hover:scale-105 hover:drop-shadow-[0_0_15px_#ff8c00]"
            >
              게시하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

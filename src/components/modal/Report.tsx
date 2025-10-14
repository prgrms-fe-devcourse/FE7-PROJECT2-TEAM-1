import yellowWaring from "../../assets/report/yellowWarning.svg";
import redLight from "../../assets/report/redLight.svg";
export default function Report() {
  return (
    <>
      <div className="bg-[rgb(132_124_124_/_0.3)] flex justify-center items-center h-screen font-normal">
        <div className="bg-black text-white border-2 border-[#FF8C00] w-[470px] h-[470px] flex flex-col items-center rounded-[12px]">
          <div className="flex flex-row mt-6">
            <img src={redLight} alt="redLight" />
            <p className="text-[20px]">신고하기</p>
            <img src={redLight} alt="redLight" />
          </div>

          <form className="flex flex-col">
            <p className="text-[14px] mt-7 mb-1">사유</p>
            <textarea className="text-black rounded-[10px] bg-white outline-none focus:border-2 focus:border-[#FF8C00] w-[400px] h-[200px]" />
            <div className="flex flex-row  mt-3">
              <img src={yellowWaring} alt="yellowWaring" />
              <p className="pl-1 text-[12px]">
                무분별한 신고는 커뮤니티 이용에 제제를 받을 수 있습니다.
              </p>
            </div>
            <div className="flex justify-center mt-10 gap-25">
              <button
                type="submit"
                className="hover:bg-[#FF8C00] hover:text-black cursor-pointer rounded-[5px] bg-[#AAAAAA] w-[100px] h-[34px]"
              >
                완료
              </button>
              <button
                type="button"
                className="hover:bg-[#FF8C00] hover:text-black cursor-pointer rounded-[5px] bg-[#AAAAAA] w-[100px] h-[34px]"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

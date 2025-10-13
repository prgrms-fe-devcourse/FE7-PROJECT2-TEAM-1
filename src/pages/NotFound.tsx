import logo from "../assets/header/header_logo.svg";

export default function NotFound() {
  return (
    <>
      <div className="bg-[#000000] flex items-center justify-center h-screen">
        <div className=" bg-[#0A0A0A] w-[1200px] h-[619px] border-2 border-[rgb(255_140_0_/_0.5)] rounded-[12px]  flex flex-col items-center justify-center">
          <img src={logo} className="w-[150px] h-[225px]" />
          <p className="text-[36px] text-[#FF8C00]">404 ERROR</p>
          <p className=" text-[16px] text-[#999999] mt-6">잘못된 접근입니다!</p>
        </div>
      </div>
    </>
  );
}

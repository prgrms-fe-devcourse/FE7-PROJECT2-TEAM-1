import background from "../../assets/sure/background.svg";

export default function Sure() {
  return (
    <>
      <div className="relative bg-[rgb(132_124_124_/_0.3)] flex justify-center items-center h-screen">
        <img src={background} alt="background" className="absolute" />
        <div className="relative text-[30px] text-white flex mt-27">
          <button className="mr-40 cursor-pointer hover:underline hover:decoration-[#FF8C00] hover:scale-110 hover:text-[#FF8C00] transition-transform duration-200">
            YES
          </button>
          <button className="ml-20 mr-7 cursor-pointer hover:underline hover:decoration-[#FF8C00] hover:scale-110 hover:text-[#FF8C00] transition-transform duration-200">
            NO
          </button>
        </div>
      </div>
    </>
  );
}

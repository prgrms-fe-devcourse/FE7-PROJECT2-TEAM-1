import { Link } from "react-router";
import footer_potato from "../assets/footer/footer_img.svg";

export default function Footer() {
  return (
    <>
      <div className="w-full flex gap-5 justify-center p-[30px]">
        <Link to="/" className="flex items-center pt-[10px]">
          <img src={footer_potato} className="w-[41px] h-[41px]" />
          <p className="text-[#7B7B7B] text-sm pb-[10px]">HOT POTATO</p>
        </Link>
        <div className="flex gap-5 items-center">
          <p className="text-[#7B7B7B] text-[10px]">© 2025</p>
          <a href="https://github.com/leehyunjun97" className="text-[#7B7B7B] text-sm pb-[3px]">
            이현준
          </a>
          <a href="https://github.com/mandububsa" className="text-[#7B7B7B] text-sm pb-[3px]">
            안수민
          </a>
          <a href="https://github.com/singilwon" className="text-[#7B7B7B] text-sm pb-[3px]">
            송주원
          </a>
          <a href="https://github.com/varYeon" className="text-[#7B7B7B] text-sm pb-[3px]">
            변수연
          </a>
          <p className="text-[#7B7B7B] text-[10px]">All rights reserved.</p>
        </div>
      </div>
    </>
  );
}

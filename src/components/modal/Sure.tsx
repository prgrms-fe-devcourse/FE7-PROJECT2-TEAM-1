import { useCallback, useEffect, useState } from "react";
import background from "../../assets/sure/background.svg";

type SureProps = {
  onYes: () => void;
  onClose: () => void;
};

export default function Sure({ onYes, onClose }: SureProps) {
  const [closing, setClosing] = useState(false);
  const [opening, setOpening] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setOpening(false);
    }, 10);
    return () => clearTimeout(t);
  }, []);

  const handleAnimation = useCallback(
    (callback: () => void) => {
      if (closing) return;
      setClosing(true);
      setTimeout(() => {
        callback();
      }, 350);
    },
    [closing],
  );
  return (
    <>
      <div className="fixed bg-[rgb(132_124_124_/_0.3)] flex justify-center items-center inset-0 z-[9999]">
        <div
          className={`flex justify-center items-center transition-all duration-300 ease-out w-[650px] h-[300px] ${closing ? "opacity-0 translate-y-10" : opening ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}
        >
          <img src={background} alt="background" className="absolute " />
          <div className="relative text-[30px] text-white flex mt-27">
            <button
              className="mr-40 cursor-pointer hover:underline hover:decoration-[#FF8C00] hover:scale-110 hover:text-[#FF8C00] transition-transform duration-200"
              onClick={() => handleAnimation(onYes)}
            >
              YES
            </button>
            <button
              className="ml-20 mr-7 cursor-pointer hover:underline hover:decoration-[#FF8C00] hover:scale-110 hover:text-[#FF8C00] transition-transform duration-200"
              onClick={() => handleAnimation(onClose)}
            >
              NO
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

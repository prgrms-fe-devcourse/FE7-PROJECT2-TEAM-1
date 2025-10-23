// Header.tsx
import header_logo from "../assets/header/header_logo.svg";
import header_name1 from "../assets/header/header_name1.svg";
import header_name2 from "../assets/header/header_name2.svg";
import header_search from "../assets/header/header_search.svg";
import header_user from "../assets/header/header_user.svg";
import header_alarm from "../assets/header/header_alarm.svg";
import { Link, useLocation } from "react-router";
import { useAuthStore } from "../stores/authStore";
import { Activity, useEffect, useRef } from "react";
import Alarm from "./alarm/Alarm";
import { useAlarmStore } from "../stores/alarmStore";
import { allReadAPI } from "../services/alarm";
import Toast from "./toast/Toast";

export default function Header() {
  const notify = (message: string, type: ToastType) => Toast({ message, type });
  const profile = useAuthStore((state) => state.profile);
  const { isOpen, setIsOpen, unReadCount, setUnReadCount, alarms } = useAlarmStore(
    (state) => state,
  );
  const alarmDivRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!profile) return;

    const handleClickOutside = (e: MouseEvent) => {
      const { openModal } = useAlarmStore.getState();
      if (openModal) return;
      if (alarmDivRef.current && !alarmDivRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const alarmClickHandler = async () => {
    if (!profile) {
      notify("로그인이 필요합니다.", "INFO");
      return;
    }

    if (isOpen && !!alarms.length && !!unReadCount) {
      try {
        await allReadAPI(profile.uid);
        console.log("호출");
        setUnReadCount(0);
      } catch (error) {
        console.error(error);
      } finally {
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 w-full h-[65px] z-50 bg-black shadow border-b-2 border-[#FF8C00]">
      <div
        className="
      max-w-[1200px] mx-auto
      grid items-center h-[65px]
      [grid-template-columns:repeat(24,minmax(0,1fr))]
    "
      >
        <Link to="/">
          <div className="flex items-center">
            <img src={header_logo} alt="header-logo" className="h-[40px] w-full pr-5" />
            <img
              src={header_name1}
              alt="header-name1"
              className="h-[65px] min-w-[90px] pr-5 object-contain"
            />
            <img
              src={header_name2}
              alt="header-name2"
              className="h-[65px] min-w-[160px] pr-5 object-contain"
            />
          </div>
        </Link>
        <Link to="/search" className="col-start-22 col-span-1 justify-self-start">
          <div className="w-[31px] h-[31px]">
            <img src={header_search} alt="header-search" />
          </div>
        </Link>
        <Link
          to={profile ? "/profile" : `/signin?url=${location.pathname}`}
          className="col-start-23 col-span-1 justify-self-start"
        >
          <div className="w-[31px] h-[31px]">
            <img src={header_user} alt="header-user" />
          </div>
        </Link>
        <div className="relative w-[31px] h-[35px]" ref={alarmDivRef}>
          <button className="cursor-pointer" onClick={alarmClickHandler}>
            <Activity mode={unReadCount ? "visible" : "hidden"}>
              <span className="absolute top-4 right-5 bg-red-600 text-white text-[10px] font-normal rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                {unReadCount}
              </span>
            </Activity>
            <img
              src={header_alarm}
              alt="header-alarm"
              className="col-start-24 col-span-1 justify-self-start"
            />
          </button>
          <Activity mode={isOpen ? "visible" : "hidden"}>
            <Alarm />
          </Activity>
        </div>
      </div>
    </header>
  );
}

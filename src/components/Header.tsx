// Header.tsx
import header_logo from "../assets/header/header_logo.svg";
import header_name1 from "../assets/header/header_name1.svg";
import header_name2 from "../assets/header/header_name2.svg";
import header_search from "../assets/header/header_search.svg";
import header_user from "../assets/header/header_user.svg";
import header_alarm from "../assets/header/header_alarm.svg";
import { Link } from "react-router";
import { useAuthStore } from "../stores/authStore";

export default function Header() {
  const profile = useAuthStore((state) => state.profile);

  return (
    <header
      className="
        max-w-[1200px] mx-auto
        grid items-center h-[65px]
        [grid-template-columns:repeat(24,minmax(0,1fr))]
      "
    >
      <Link to="/" className="col-start-1 col-span-1 justify-self-start">
        <img src={header_logo} alt="header-logo" className="h-[41px] w-[31px]" />
      </Link>

      <Link to="/" className="col-start-2 col-span-2 justify-self-start">
        <img src={header_name1} alt="header-name1" className="h-[25px] w-[75px]" />
      </Link>

      <Link to="/" className="col-start-4 col-span-4 justify-self-start">
        <img src={header_name2} alt="header-name2" className="h-[25px] w-[155px]" />
      </Link>
      <Link to="/search" className="col-start-22 col-span-1 justify-self-start">
        <img src={header_search} alt="header-search" className="w-[30px] h-[31px]" />
      </Link>
      <Link
        to={profile ? "/profile" : "/signin"}
        className="col-start-23 col-span-1 justify-self-start"
      >
        <img src={header_user} alt="header-user" className="w-[31px] h-[31px]" />
      </Link>
      <img
        src={header_alarm}
        alt="header-alarm"
        className="col-start-24 col-span-1 justify-self-start w-[28px] h-[34px]"
      />
    </header>
  );
}

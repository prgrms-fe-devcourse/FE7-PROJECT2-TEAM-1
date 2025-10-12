import { Outlet } from "react-router";
import Header from "../components/Header";

export default function Default() {
  return (
    <div className="bg-black text-white">
      <div className="border-b-2 border-[#FF8C00]">
        <Header />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

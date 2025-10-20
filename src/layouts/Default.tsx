import { Outlet } from "react-router";
import Header from "../components/Header";

export default function Default() {
  return (
    <div className="bg-black text-white">
      <div>
        <Header />
      </div>
      <main className="mt-[65px]">
        <Outlet />
      </main>
    </div>
  );
}

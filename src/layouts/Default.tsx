import { Outlet } from "react-router";
import Header from "../components/Header";
export default function Default() {
  return (
    <div className=" bg-black text-white">
      <div className="mx-auto bg-black border-b border-gray-800">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

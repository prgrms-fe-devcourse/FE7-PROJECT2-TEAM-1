import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Default() {
  return (
    <div className="bg-black text-white">
      <div>
        <Header />
      </div>
      <main className="pt-[65px]">
        <Outlet />
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}

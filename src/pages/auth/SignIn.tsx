import { Activity, useState } from "react";
import supabase from "../../utils/supabase";
import { Link, useNavigate, useSearchParams } from "react-router";
import hotPotato from "../../assets/sign/hotpotato_logo.png";
import google from "../../assets/sign/google_logo.png";
import Toast from "../../components/toast/Toast";
import { useAuthStore } from "../../stores/authStore";
import { googleLoginHandler } from "../../services/signIn";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(true);
  const hydrateFromAuth = useAuthStore((state) => state.hydrateFromAuth);

  const navigate = useNavigate();
  const [search] = useSearchParams();

  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setLoginStatus(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.status === 400) setLoginStatus(false);
      return;
    }
    const name = data.user?.user_metadata.username;

    notify(`${name}, 님 안녕하세요`, "SUCCESS");

    const query = search.get("url");
    hydrateFromAuth();
    if (query) {
      navigate(query ?? "/");
    }
  };

  return (
    <>
      <main className="max-w-dvw min-h-dvh bg-black overflow-hidden">
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="w-[1200px] min-h-[950px] bg-[#0A0A0A] border-2 border-[#FF8C00] rounded-[12px] m-auto mt-[38px] mb-[15px] flex flex-col items-center justify-center text-white">
            <div className="flex flex-col items-center gap-[45px]">
              <img src={hotPotato} alt="hotPotato_logo" />
              <div className="flex flex-col items-center gap-[5px]">
                <p className="w-[515px] text-[#FF8C00] font-bold text-[38px] text-center">
                  HOT POTATO
                </p>
                <p className="w-[515px] text-[#999999] font-bold text-[14px] text-center">
                  "지금 로그인하고, 선택의 순간을 함께하세요!"
                </p>
              </div>
              <div className="flex flex-col gap-[50px]">
                <div className="relative w-[528px] h-[48px]">
                  <label
                    htmlFor="email-input"
                    className="absolute top-[-30px] text-[14px] text-white font-bold"
                  >
                    Email
                  </label>
                  <input
                    id="email-input"
                    type="text"
                    placeholder="Enter your Email"
                    className="w-full h-full bg-[#0A0A0A] border border-[#FF8C00] rounded-[6px] text-white placeholder-[#999999] placeholder:font-bold shadow-[0_1px_2px_rgba(0,0,0,0.25)] px-3 focus:outline-none focus:shadow-[0_0_12px_2px_#FF8C00] transition-shadow duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative w-[528px] h-[48px]">
                  <label
                    htmlFor="password-input"
                    className="absolute top-[-30px] text-[14px] text-white font-bold"
                  >
                    Password
                  </label>
                  <input
                    id="password-input"
                    type="password"
                    placeholder="Enter password (min 6 characters)"
                    className="w-full h-full bg-[#0A0A0A] border border-[#FF8C00] rounded-[6px] text-white placeholder-[#999999] placeholder:font-bold shadow-[0_1px_2px_rgba(0,0,0,0.25)] px-3 focus:outline-none focus:shadow-[0_0_12px_2px_#FF8C00] transition-shadow duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* 에러(400) div 처리 */}
              <Activity mode={loginStatus ? "hidden" : "visible"}>
                <p className="w-[515px] text-[#c85c5c] font-bold text-[13px]">
                  아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.
                </p>
              </Activity>

              <div className="flex justify-between w-full">
                <button className="w-[465px] h-[48px] rounded-[6px] bg-[#FF8C00] text-[18px] text-black font-bold transition-shadow duration-200 cursor-pointer hover:shadow-[0_0_10px_#FF8C00] hover:scale-101 ">
                  Sign in
                </button>
                <button
                  className="flex items-center justify-center w-[50px] h-[48px] rounded-[6px] bg-[#ffffff] text-[18px] text-black  font-bold transition-shadow duration-200 cursor-pointer hover:shadow-[0_0_10px_#FF8C00] hover:scale-101"
                  type="button"
                  onClick={googleLoginHandler}
                >
                  <img className="w-[35px] h-[35px] p-auto" src={google} alt="google_logo" />
                </button>
              </div>

              <div className="flex flex-col items-center gap-[5px]">
                <p className="w-[515px] text-[#999999] font-bold text-[16px] text-center">
                  아직 계정이 없으신가요?
                </p>
                <Link
                  to={"/signup"}
                  className="w-[515px] text-[#FF8C00] font-bold text-[16px] text-center cursor-pointer hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            <hr className="w-[1132px] border-t border-[#FF8C00] border-[1px] mx-auto mt-[40px]" />
            <Link
              to={"/"}
              className="w-[515px] text-[#999999] duration-200 font-bold text-[14px] text-center mt-[15px] cursor-pointer hover:text-white"
            >
              홈으로 가기
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}

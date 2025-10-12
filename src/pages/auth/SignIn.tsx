import { useState } from "react";
import supabase from "../../utils/supabase";
import { Link } from "react-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(true);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.status === 400) setLoginStatus(false);
      console.error("로그인 실패:", error.message);
    }
  };

  return (
    <>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="w-[1200px] min-h-[964px] bg-[#0A0A0A] border-2 border-[#FF8C00] rounded-[12px] flex flex-col items-center justify-center text-white">
          <div className="flex flex-col items-center gap-[45px]">
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
            {!loginStatus && (
              <p className="w-[515px] text-[#c85c5c] font-bold text-[13px]">
                아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.
              </p>
            )}

            <button className="w-[528px] h-[48px] rounded-[6px] bg-[#FF8C00] text-[18px] text-black font-bold transition-shadow duration-200 cursor-pointer hover:shadow-[0_0_10px_#FF8C00] hover:scale-101 ">
              Sign in
            </button>

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
      {/* <form onSubmit={(e) => submitHandler(e)}>
        이메일: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />{" "}
        <br />
        패스워드:{" "}
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>고고</button>
      </form> */}
    </>
  );
}

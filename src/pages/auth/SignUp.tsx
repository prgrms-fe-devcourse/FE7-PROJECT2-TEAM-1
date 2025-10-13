import { useState } from "react";
import supabase from "../../utils/supabase";
import { Link, useNavigate } from "react-router";
import { checkEmailExists, checkHandleExists } from "../../services/signIn";

export default function SignUp() {
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({
    email: "",
    username: "",
    handle: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    handle: "",
    password: "",
    cofirmPassword: "",
    total: "",
  });

  // 포커스 벗어날 때 형식 확인
  const blurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setInputState((prev) => ({ ...prev, email: value.trim() }));
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setErrors((prev) => ({ ...prev, email: "이메일 형식이 올바르지 않습니다." }));
          return;
        }

        const checkEmail = await checkEmailExists(value);
        if (checkEmail) {
          setErrors((prev) => ({
            ...prev,
            email: "사용할 수 없는 이메일 입니다. 다른 이메일을 입력해주세요.",
          }));
          return;
        }

        setErrors((prev) => ({ ...prev, email: "" }));
        break;
      case "username":
        setInputState((prev) => ({ ...prev, username: value.trim() }));
        if (value.trim().length < 2) {
          setErrors((prev) => ({ ...prev, username: "이름은 최소 2자 이상이어야 합니다." }));
        } else {
          setErrors((prev) => ({ ...prev, username: "" }));
        }
        break;
      case "handle":
        setInputState((prev) => ({ ...prev, handle: value.trim() }));
        if (value.trim().length < 2) {
          setErrors((prev) => ({ ...prev, handle: "핸들은 최소 2자 이상이어야 합니다." }));
          return;
        }

        if (!/^[a-zA-Z0-9가-힣._]+$/.test(value)) {
          setErrors((prev) => ({ ...prev, handle: ". 또는 @ 기호만 사용 가능합니다." }));
          return;
        }

        const checkHandle = await checkHandleExists(value);
        if (checkHandle) {
          setErrors((prev) => ({
            ...prev,
            handle: "사용할 수 없는 핸들 입니다. 다른 핸들을 입력해주세요.",
          }));
          return;
        }

        setErrors((prev) => ({ ...prev, handle: "" }));
        break;
      case "password":
        setInputState((prev) => ({ ...prev, password: value.trim() }));
        if (value.trim().length < 6) {
          setErrors((prev) => ({ ...prev, password: "비밀번호는 최소 6자 이상이어야 합니다." }));
        } else {
          setErrors((prev) => ({ ...prev, password: "" }));
        }
        break;
      case "confirmPassword":
        setInputState((prev) => ({ ...prev, confirmPassword: value.trim() }));
        if (value !== inputState.password) {
          setErrors((prev) => ({ ...prev, confirmPassword: "비밀번호가 일치하지 않습니다." }));
        } else {
          setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }
        break;
      default:
        break;
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmptyErrors = Object.values(errors).some((item) => item !== "");
    if (isEmptyErrors) {
      setErrors((prev) => ({ ...prev, total: "회원가입 형식이 올바르지 않습니다." }));
      return;
    }

    const { email, password, username, handle } = inputState;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          handle,
          profile_img: null,
          bio: null,
        },
      },
    });

    if (error) {
      console.log("status code: ", error.code);
      alert("올바르지 않은 접근 방법입니다.");
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      <main className="max-w-dvw min-h-dvh bg-black overflow-hidden">
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="w-[1200px] min-h-[964px] bg-[#0A0A0A] border-2 border-[#FF8C00] rounded-[12px] m-auto flex flex-col items-center justify-center text-white">
            <div className="flex flex-col items-center gap-[45px]">
              <div className="flex flex-col items-center gap-[5px]">
                <p className="w-[515px] text-[#FF8C00] font-bold text-[38px] text-center">
                  HOT POTATO
                </p>
                <p className="w-[515px] text-[#999999] font-bold text-[14px] text-center">
                  "지금 가입하고, 선택의 순간을 함께하세요!"
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
                    name="email"
                    type="text"
                    placeholder="Enter your Email"
                    required
                    onBlur={(e) => blurHandler(e)}
                    className="w-full h-full bg-[#0A0A0A] border border-[#FF8C00] rounded-[6px] text-white placeholder-[#999999] placeholder:font-bold shadow-[0_1px_2px_rgba(0,0,0,0.25)] px-3 focus:outline-none focus:shadow-[0_0_12px_2px_#FF8C00] transition-shadow duration-200"
                    value={inputState.email}
                    onChange={(e) => setInputState((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="relative w-[528px] h-[48px]">
                  <label
                    htmlFor="username-input"
                    className="absolute top-[-30px] text-[14px] text-white font-bold"
                  >
                    Username
                  </label>
                  <input
                    id="username-input"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    required
                    onBlur={(e) => blurHandler(e)}
                    minLength={2}
                    className="w-full h-full bg-[#0A0A0A] border border-[#FF8C00] rounded-[6px] text-white placeholder-[#999999] placeholder:font-bold shadow-[0_1px_2px_rgba(0,0,0,0.25)] px-3 focus:outline-none focus:shadow-[0_0_12px_2px_#FF8C00] transition-shadow duration-200"
                    value={inputState.username}
                    onChange={(e) =>
                      setInputState((prev) => ({ ...prev, username: e.target.value }))
                    }
                  />
                </div>
                <div className="relative w-[528px] h-[48px]">
                  <label
                    htmlFor="handle-input"
                    className="absolute top-[-30px] text-[14px] text-white font-bold"
                  >
                    Handle
                  </label>
                  <input
                    id="handle-input"
                    name="handle"
                    type="text"
                    placeholder="Enter your handle"
                    required
                    onBlur={(e) => blurHandler(e)}
                    minLength={2}
                    className="w-full h-full bg-[#0A0A0A] border border-[#FF8C00] rounded-[6px] text-white placeholder-[#999999] placeholder:font-bold shadow-[0_1px_2px_rgba(0,0,0,0.25)] px-3 focus:outline-none focus:shadow-[0_0_12px_2px_#FF8C00] transition-shadow duration-200"
                    value={inputState.handle}
                    onChange={(e) => setInputState((prev) => ({ ...prev, handle: e.target.value }))}
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
                    name="password"
                    type="password"
                    placeholder="Enter password (min 6 characters)"
                    required
                    onBlur={(e) => blurHandler(e)}
                    minLength={6}
                    className="w-full h-full bg-[#0A0A0A] border border-[#FF8C00] rounded-[6px] text-white placeholder-[#999999] placeholder:font-bold shadow-[0_1px_2px_rgba(0,0,0,0.25)] px-3 focus:outline-none focus:shadow-[0_0_12px_2px_#FF8C00] transition-shadow duration-200"
                    value={inputState.password}
                    onChange={(e) =>
                      setInputState((prev) => ({ ...prev, password: e.target.value }))
                    }
                  />
                </div>

                <div className="relative w-[528px] h-[48px]">
                  <label
                    htmlFor="confirm-password"
                    className="absolute top-[-30px] text-[14px] text-white font-bold"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    required
                    onBlur={(e) => blurHandler(e)}
                    minLength={6}
                    className="w-full h-full bg-[#0A0A0A] border border-[#FF8C00] rounded-[6px] text-white placeholder-[#999999] placeholder:font-bold shadow-[0_1px_2px_rgba(0,0,0,0.25)] px-3 focus:outline-none focus:shadow-[0_0_12px_2px_#FF8C00] transition-shadow duration-200"
                    value={inputState.confirmPassword}
                    onChange={(e) =>
                      setInputState((prev) => ({ ...prev, confirmPassword: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* 에러 div 처리 */}
              <div className="flex flex-col items-center gap-[5px]">
                {Object.entries(errors).map(
                  ([key, message]) =>
                    message && (
                      <p key={key} className="w-[515px] text-[#c85c5c] font-bold text-[13px]">
                        {message}
                      </p>
                    ),
                )}
              </div>
              <button className="w-[528px] h-[48px] rounded-[6px] bg-[#FF8C00] text-[18px] text-black font-bold transition-shadow duration-200 cursor-pointer hover:shadow-[0_0_10px_#FF8C00] hover:scale-101 ">
                Sign Up
              </button>

              <div className="flex flex-col items-center gap-[5px]">
                <p className="w-[515px] text-[#999999] font-bold text-[16px] text-center">
                  이미 계정이 있으신가요?
                </p>
                <Link
                  to={"/signin"}
                  className="w-[515px] text-[#FF8C00] font-bold text-[16px] text-center cursor-pointer hover:underline"
                >
                  Sign in
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

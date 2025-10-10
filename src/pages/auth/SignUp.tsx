import { useState } from "react";
import supabase from "../../utils/supabase";
import { useNavigate } from "react-router";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
          profile_img: null,
          bio: null,
        },
      },
    });

    if (error) {
      if (error.status === 422) {
        alert("중복된 이메일 입니다.");
      } else {
        console.error("회원가입 실패:", error.message);
      }
    } else {
      console.log("회원가입 성공:", data.user);
      navigate("/signin");
    }
  };

  return (
    <>
      <h1>SignUp Component</h1>
      <form onSubmit={(e) => submitHandler(e)}>
        이메일: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />{" "}
        <br />
        유저네임:{" "}
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        패스워드:{" "}
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>고고</button>
      </form>
    </>
  );
}

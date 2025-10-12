import { useState } from "react";
import supabase from "../../utils/supabase";
import { useNavigate } from "react-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("로그인 실패:", error.message);
    } else {
      navigate("/auth-redirect");
    }
  };

  return (
    <>
      <h1>SignIn Component</h1>
      <form onSubmit={(e) => submitHandler(e)}>
        이메일: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />{" "}
        <br />
        패스워드:{" "}
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>고고</button>
      </form>
    </>
  );
}

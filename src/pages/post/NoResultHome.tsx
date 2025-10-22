import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function NoResultHome() {
  const navigate = useNavigate();

  useEffect(() => {
    const goToHome = () => {
      navigate("/");
    };
    window.addEventListener("keydown", goToHome);

    return () => {
      window.removeEventListener("keydown", goToHome);
    };
  }, [navigate]);
  return null;
}

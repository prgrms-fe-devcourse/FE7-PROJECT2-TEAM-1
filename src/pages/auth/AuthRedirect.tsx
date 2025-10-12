import { useEffect } from "react";
import supabase from "../../utils/supabase";
import type { Claims } from "../../types/user";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";

export default function AuthRedirect() {
  const navigate = useNavigate();

  const { setClaims, setProfile } = useAuthStore((state) => state);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase.auth.getClaims();

        if (error) throw error;
        const claims = data?.claims as Claims;
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("uid", claims?.sub || "")
          .single();

        if (profileError) throw profileError;

        // 분기처리
        if (profile) {
          setClaims(claims);
          setProfile(profile);
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        alert("잘못된 접근입니다.");
        navigate("/");
      }
    };
    fetchProfile();
  }, []);

  return null;
}

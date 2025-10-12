import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import supabase from "../utils/supabase";
import { useNavigate, useSearchParams } from "react-router";

export default function AuthBootstrap() {
  const hydrateFromAuth = useAuthStore((state) => state.hydrateFromAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();
  const [search] = useSearchParams();

  useEffect(() => {
    hydrateFromAuth();

    // supabase의 인증 상태가 변경될 때마다 실행
    const { data: sub } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_OUT") clearAuth();
      if (event === "SIGNED_IN") {
        hydrateFromAuth();
        const query = search.get("url");
        if (query) {
          navigate(query ?? "/");
        }
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [hydrateFromAuth, clearAuth]);

  return null;
}

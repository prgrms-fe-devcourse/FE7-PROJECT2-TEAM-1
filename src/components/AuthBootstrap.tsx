import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";
import supabase from "../utils/supabase";
import { useNavigate, useSearchParams } from "react-router";

export default function AuthBootstrap() {
  const hydrateFromAuth = useAuthStore((state) => state.hydrateFromAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();
  const [search] = useSearchParams();

  const [initialLoaded, setInitialLoaded] = useState(false);

  useEffect(() => {
    hydrateFromAuth();

    const { data: sub } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        clearAuth();
        return;
      }

      if (event === "INITIAL_SESSION") {
        setInitialLoaded(true);
        return;
      }
      if (!initialLoaded) return;
      else if (event === "SIGNED_IN" && session) {
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

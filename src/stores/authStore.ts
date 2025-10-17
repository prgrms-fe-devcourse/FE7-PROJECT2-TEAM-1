import { create } from "zustand";
import type { Claims } from "../types/user";
import supabase from "../utils/supabase";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

type AuthStore = {
  isLoading?: boolean;
  claims: Claims;
  profile: Profile | null;
  hydrateFromAuth: () => Promise<boolean>;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      immer<AuthStore>((set) => ({
        isLoading: true, // 데이터 패칭 로딩 여부
        claims: null, // JWTPayload
        profile: null, // profiles 테이블 데이터

        hydrateFromAuth: async () => {
          try {
            set({ isLoading: true });
            // (1) 클레임 가져오기
            const { data, error } = await supabase.auth.getClaims();
            if (error) {
              // 세션 없음 or 초기화전일 수 있음
              set({ claims: null, profile: null, isLoading: false });
              return false;
            }
            const claims = data?.claims as Claims;
            set({ claims: claims });

            // (2) 프로필 조회
            if (claims?.sub) {
              const { data: profiles, error: profilesError } = await supabase
                .from("profiles")
                .select("*")
                .eq("uid", claims.sub || "")
                .single();
              if (profilesError) {
                set({ claims: null, profile: null, isLoading: false });
              }
              set({ profile: profiles ?? null });
              return true;
            }
            return false;
          } catch (error) {
            return false;
          } finally {
            set({ isLoading: false });
          }
        },
        clearAuth: () =>
          set((state) => {
            state.isLoading = false;
            state.claims = null;
            state.profile = null;
          }),
      })),
      { name: "auth-store" },
    ),
  ),
);

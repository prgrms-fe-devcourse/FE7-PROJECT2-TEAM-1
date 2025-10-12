import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "../../stores/authStore";

// 로그인 한 사용자는 로그인, 회원가입 페이지 못 들어감
export default function PublicOnlyRoute() {
  const location = useLocation();
  const isLoading = useAuthStore((state) => state.isLoading);
  const claims = useAuthStore((state) => state.claims);
  if (isLoading) return null;
  if (claims) {
    const to = location.state?.from.pathname ?? "/";
    return <Navigate to={to} replace />;
  }
  return <Outlet />;
}

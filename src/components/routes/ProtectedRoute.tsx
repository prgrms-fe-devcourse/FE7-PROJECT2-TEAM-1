import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "../../stores/authStore";

// 로그인 한 사람만 접근 가능
export default function ProtectedRoutes() {
  const location = useLocation();
  const claims = useAuthStore((state) => state.claims);
  if (!claims) {
    return <Navigate to={"/signin"} replace state={{ from: location }} />;
  }
  return <Outlet />;
}

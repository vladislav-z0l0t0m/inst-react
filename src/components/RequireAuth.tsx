import { useUser } from "../hooks/useUser";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "./ui/Loader";
import { AppRoutes } from "../constants";

export const RequireAuth = () => {
  const { isAuthenticated, isLoading } = useUser();
  const location = useLocation();

  if (!isLoading) {
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        <Loader />
      </div>
    );
  }

  if (!isLoading && !isAuthenticated) {
    return <Navigate to={AppRoutes.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

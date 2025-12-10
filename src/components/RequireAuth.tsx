import { useUser } from "@/hooks/useUser";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "./ui/Loader";

export const RequireAuth = () => {
  const { user, isLoading, isError } = useUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        <Loader />
      </div>
    );
  }

  if (!user && !isError) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <Outlet />;
};

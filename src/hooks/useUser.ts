import { User } from "@/types/auth.types";
import { authApi } from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (): Promise<User> => {
  const { data } = await authApi.get<User>("/user/me");

  return data;
};

export const useUser = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    user: data || null,
    isLoading,
    isError,
    isAuthenticated: !!data && !isError,
  };
};

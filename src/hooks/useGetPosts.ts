import { PaginatedPosts } from "../types/posts.types";
import { baseApi } from "../api/baseApi";
import { useQuery } from "@tanstack/react-query";

const getPosts = async () => {
  const response = await baseApi.get<PaginatedPosts>("/posts");
  return response.data;
};

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });
};

import { useGetPosts } from "../hooks/useGetPosts";
import type { JSX } from "react";
import { Loader } from "./ui/Loader";
import { FormError } from "./FormError";
import { getErrorMessage } from "../utils/error";
import { useTranslation } from "react-i18next";
import PostCard from "./ui/PostCard";

const PostList = (): JSX.Element => {
  const { data, isPending, isError, error } = useGetPosts();
  const { t } = useTranslation(["common"]);

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <FormError message={getErrorMessage(error, t)} />;
  }

  return (
    <div className='flex-col w-full max-w-[630px] mt-4'>
      {/* TODO: add Stories list */}
      <div className='w-full'>
        {data?.posts?.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default PostList;

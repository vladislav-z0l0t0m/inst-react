import { PostResponse } from "../../types/posts.types";
import { JSX } from "react";
import PostImages from "./PostImage";
import { useRelativeTime } from "../../hooks/useRelativeTime";
import {
  FaEllipsisH,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import PostActions from "./PostActions";
import { ReactionsDisplay } from "./ReactionsDisplay";
import { useTranslation } from "react-i18next";
import { useUser } from "../../hooks/useUser";

interface PostCardProps {
  post: PostResponse;
}

const PostCard = ({ post }: PostCardProps): JSX.Element => {
  const { user, isAuthenticated } = useUser();
  const formatTime = useRelativeTime();
  const timeAgo = formatTime(new Date(post.createdAt));
  const { t } = useTranslation(["common"]);

  //TODO(add field on backend): && !post.author.isSubscribed
  const showSubscribe = isAuthenticated && user?.id !== post.author.id; 

  return (
    <div className='w-full max-w-[470px] pb-4 mb-5'>
      <div className='flex gap-2 items-center pt-0 pr-2.5 pb-3 pl-3.5'>
        <Link
          to={`/profile:${post.author.id}`}
          className='flex gap-3 items-center'
        >
          <div className='w-8 h-8 rounded-full bg-amber-50/30'></div>
          <span>{post.author.username}</span>
        </Link>
        <span className='text-gray-400'>&bull;</span>
        <span className='text-[#A8A8A8] text-sm'>{timeAgo}</span>
        {showSubscribe && (
          <>
            <span className='text-gray-400'>&bull;</span>
            <button type='button' className='p-1 hover:underline cursor-pointer decoration-[#A8B8FF] group'>
              <span className=' text-[#85A1FF] font-medium group-hover:text-[#A8B8FF]'>{t("common.subscribe")}</span>
            </button>
          </>
        )}
        <button
          type='button'
          className='ml-auto p-1 hover:opacity-70 transition-opacity cursor-pointer'
        >
          <FaEllipsisH/>
        </button>
      </div>

      <PostImages imageUrls={post.imageUrls} />

      <div className='flex-col items-center px-3 pt-2'>
        <PostActions postId={post.id} currentUserReaction={post.reactions.currentUserReaction} commentsCount={post.commentsCount} />
        <div className='flex items-center gap-2 mb-1'>
          <ReactionsDisplay counts={post.reactions.counts} currentUserReaction={post.reactions.currentUserReaction} />
        </div>
        <div className='flex items-center gap-2'>
          <Link to={`/profile:${post.author.id}`} className='text-sm font-bold'><span>{post.author.username}</span></Link>
          <span>{post.text}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

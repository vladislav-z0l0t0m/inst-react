import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseApi } from '../api/baseApi';
import { PaginatedPosts, PostResponse } from '../types/posts.types';
import { ReactionType } from '../types/reactions.types';

export const useSetReaction = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reactionType: ReactionType) => {
      const response = await baseApi.post(`/posts/${postId}/reactions`, { 
        type: reactionType 
      });
      return response.data;
    },

    onMutate: async (newReaction: ReactionType) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      const previousPosts = queryClient.getQueryData<PaginatedPosts>(['posts']);

      queryClient.setQueryData<PaginatedPosts>(['posts'], (old) => {
        if (!old || !old.posts) return old;

        return {
          ...old,
          posts: old.posts.map((post: PostResponse) => {
            if (post.id === postId) {
              const oldReaction = post.reactions.currentUserReaction;
              const isRemoving = oldReaction === newReaction;
              
              const newCounts = { ...post.reactions.counts };

              if (oldReaction && oldReaction !== newReaction) {
                newCounts[oldReaction] = Math.max(0, (newCounts[oldReaction] || 0) - 1);
              }

              if (isRemoving) {
                newCounts[newReaction] = Math.max(0, (newCounts[newReaction] || 0) - 1);
              } 
              else {
                newCounts[newReaction] = (newCounts[newReaction] || 0) + 1;
              }

              return {
                ...post,
                reactions: {
                  ...post.reactions,
                  currentUserReaction: isRemoving ? null : newReaction,
                  counts: newCounts,
                },
              };
            }
            return post;
          }),
        };
      });

      return { previousPosts };
    },

    onError: (_err, _newReaction, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    },
  });
};
import { ReactionType } from "./reactions.types";

export interface PostResponse {
  id: number;
  author: {
    id: number;
    username: string;
  };
  imageUrls: string[];
  hashtags: string[];
  text: string | null;
  location: string | null;
  isHidden: boolean;
  reactions: {
    counts: Record<ReactionType, number>;
    currentUserReaction: null | ReactionType;
  };
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedPosts {
  posts: PostResponse[];
  nextCursor: string | null;
}


export enum ReactionType {
  LIKE = "like",
  DISLIKE = "dislike",
  LOVE = "love",
  HAHA = "haha",
  WOW = "wow",
  SAD = "sad",
  ANGRY = "angry",
}

export const reactionsMap: Record<ReactionType, string> = {    
  [ReactionType.LOVE]: '❤️',
  [ReactionType.LIKE]: '👍',
  [ReactionType.DISLIKE]: '👎',
  [ReactionType.HAHA]: '😂',
  [ReactionType.WOW]: '😮',
  [ReactionType.SAD]: '😢',
  [ReactionType.ANGRY]: '😡'
};
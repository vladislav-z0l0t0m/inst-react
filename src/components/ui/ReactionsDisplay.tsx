import { JSX } from 'react';
import { ReactionType, reactionsMap } from '../../types/reactions.types';

interface ReactionsDisplayProps {
  counts: Record<ReactionType, number>;
  currentUserReaction: ReactionType | null;
}

export const ReactionsDisplay = ({ counts, currentUserReaction }: ReactionsDisplayProps): JSX.Element => {
  const reactionsWithCount = Object.entries(counts)
    .filter(([_, count]) => count > 0)
    .map(([type, count]) => ({
      type: type as ReactionType,
      count,
      emoji: reactionsMap[type as ReactionType],
    }))
    .sort((a, b) => b.count - a.count);

  if (reactionsWithCount.length === 0) {
    return <></>;
  }

  return (
    <div className='flex items-center gap-1.5 text-sm'>
      {reactionsWithCount.map(({ type, count, emoji }) => (
        <span key={type} className={`flex items-center gap-1 pb-1 px-2 rounded-2xl ${currentUserReaction === type ? 'bg-blue-500/80' : ''}`}>
          <span>{emoji}</span>
          <span className='text-gray-300 font-semibold'>{count}</span>
        </span>
      ))}
    </div>
  );
};

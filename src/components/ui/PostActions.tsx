import { JSX, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { FaHeart, FaRegBookmark, FaRegHeart, FaRegPaperPlane } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { useSetReaction } from "../../hooks/useSetReaction";
import { ReactionType } from "../../types/reactions.types";
import { ReactionPicker } from "./ReactionPicker";

interface PostActionsProps {
  postId: number;
  currentUserReaction: ReactionType | null;
  commentsCount: number;
}

const PostActions = ({ postId, currentUserReaction, commentsCount }: PostActionsProps): JSX.Element => {
  const [showPicker, setShowPicker] = useState(false);
  const { mutate: setReaction } = useSetReaction(postId);
  
  const onSelectReaction = (reaction: ReactionType) => {
      setReaction(reaction);
      setShowPicker(false);
    };

  return (
    <div className='flex items-center gap-3 w-full'>
      <div 
        className="relative"
        onMouseEnter={() => setShowPicker(true)}
        onMouseLeave={() => setShowPicker(false)}
      >
        <AnimatePresence>
          {showPicker && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 mb-1.5 z-100"
            >
              <ReactionPicker onSelect={onSelectReaction} />
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => onSelectReaction(ReactionType.LOVE)}
          className="w-10 h-10 flex items-center justify-center text-2xl hover:opacity-70  transition-opacity cursor-pointer"
        >
          {currentUserReaction ? (
             <FaHeart className="text-red-500 animate-in zoom-in duration-200" />
          ) : (
             <FaRegHeart className="hover:text-gray-400" />
          )}
        </button>
      </div>

      <button className="w-10 h-10 flex items-center justify-center gap-2 text-2xl hover:opacity-70 transition-opacity cursor-pointer">
        <FaRegMessage /> 
        {commentsCount > 0 && (<span className="text-sm font-medium mb-0.5">{commentsCount}</span> )}
      </button>

      <button className="w-10 h-10 flex items-center justify-center text-2xl hover:opacity-70 transition-opacity cursor-pointer">
        <FaRegPaperPlane />
      </button>

      <button className="w-10 h-10 flex items-center justify-center text-2xl hover:opacity-70 transition-opacity cursor-pointer ml-auto">
        <FaRegBookmark />
      </button>
    </div>
  );
};

export default PostActions;
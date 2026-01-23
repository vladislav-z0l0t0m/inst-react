import { motion, Variants } from 'framer-motion';
import { JSX } from 'react';
import { ReactionType, reactionsMap } from '../../types/reactions.types';


interface ReactionPickerProps {
  onSelect: (reaction: ReactionType) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      staggerChildren: 0.05
    }
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};



export const ReactionPicker = ({ onSelect }: ReactionPickerProps): JSX.Element => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex gap-2 py-1 px-2 bg-white rounded-full shadow-xl border border-gray-100"
      role="menu"
    >
      {(Object.entries(reactionsMap) as [ReactionType, string][]).map(([key, emoji]) => (
        <motion.button
          key={key}
          variants={itemVariants}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => onSelect(key)}
          className="text-1xl transition-filter duration-200 hover:drop-shadow-md focus:outline-none cursor-pointer"
          aria-label={`React with ${key}`}
          type="button"
        >
          {emoji}
        </motion.button>
      ))}
    </motion.div>
  );
};
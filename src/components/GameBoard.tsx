import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EmojiData } from '../types';
import { generateEmojis } from '../utils/gameUtils';

interface GameBoardProps {
  level: number;
  onCorrectClick: () => void;
  onTimeUp: () => void;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  score: number;
}

const GameBoard = ({
  level,
  score,
  onCorrectClick,
  onTimeUp,
  timeLeft,
  setTimeLeft,
}: GameBoardProps) => {
  const [emojis, setEmojis] = useState<EmojiData[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);

  useEffect(() => {
    setEmojis(generateEmojis(level));
    setIsCorrect(false);
    setSelectedEmoji(null);
  }, [level]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, setTimeLeft]);

  const handleEmojiClick = (index: number) => {
    if (isCorrect) return;

    setSelectedEmoji(index);

    if (emojis[index]?.isSpy) {
      setIsCorrect(true);
      setTimeout(() => {
        onCorrectClick();
      }, 800);
    }
  };

  const getGridCols = () => {
    if (level <= 2) return 'grid-cols-3';
    if (level <= 4) return 'grid-cols-4';
    if (level <= 6) return 'grid-cols-5';
    if (level <= 8) return 'grid-cols-6';
    if (level <= 10) return 'grid-cols-7';
    if (level <= 12) return 'grid-cols-8';
    return 'grid-cols-9';
  };

  const getEmojiSize = () => {
    if (level <= 2) return 'text-6xl md:text-7xl';
    if (level <= 4) return 'text-5xl md:text-6xl';
    if (level <= 6) return 'text-4xl md:text-5xl';
    if (level <= 8) return 'text-3xl md:text-4xl';
    if (level <= 10) return 'text-2xl md:text-3xl';
    if (level <= 12) return 'text-xl md:text-2xl';
    return 'text-lg md:text-xl';
  };

  return (
    <div className="flex flex-col items-center shadow-lg rounded-2xl p-8 bg-white">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center text-primary-700 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="mr-2">🦊</span> Emoji Spy
      </motion.h1>

      <div className="mb-6 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-[200px]">
          <div className="h-[40px] bg-red-100 rounded-t-lg">
            <motion.div
              className="h-full bg-red-600 rounded-l-lg"
              initial={{ width: '100%' }}
              animate={{ width: `${(timeLeft / 30) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <motion.div
          className="ml-4 text-2xl font-bold text-red-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {timeLeft}s
        </motion.div>
      </div>

      <div className={`grid ${getGridCols()} gap-1 sm:gap-4 p-6 rounded-xl`}>
        {emojis.map((emoji, index) => (
          <motion.button
            key={index}
            className={`
              ${getEmojiSize()} 
              p-3 rounded-lg hover:bg-primary-50 active:bg-primary-100 transition-all
              ${selectedEmoji === index && emoji.isSpy ? 'bg-green-100' : ''}
              ${selectedEmoji === index && !emoji.isSpy ? 'bg-red-100' : ''}
            `}
            onClick={() => handleEmojiClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              y: isCorrect && emoji.isSpy ? [0, -10, 0] : 0,
            }}
            transition={{
              delay: index * 0.03,
              duration: 0.4,
              type: 'spring',
              stiffness: 260,
              damping: 20,
              y: { repeat: 2, duration: 0.2 },
            }}
          >
            {emoji.emoji}
          </motion.button>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-12 p-4 w-full max-w-md">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-sm text-gray-500">Level</div>
          <div className="text-2xl font-bold text-primary-600">{level}</div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-sm text-gray-500">Score</div>
          <div className="text-2xl font-bold text-primary-600">{score}</div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameBoard;

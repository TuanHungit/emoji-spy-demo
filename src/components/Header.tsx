import { motion } from 'framer-motion';
import { GameStatus } from '../types';

interface HeaderProps {
  level: number;
  score: number;
  timeLeft: number;
  status: GameStatus;
}

const Header = ({ level, score, timeLeft, status }: HeaderProps) => {
  return (
    <header className="w-full max-w-4xl mb-8">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center text-primary-700 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="mr-2">🦊</span> Emoji Spy
      </motion.h1>

      {status !== 'start' && (
        <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-sm text-gray-500">Level</div>
            <div className="text-2xl font-bold text-primary-600">{level}</div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-sm text-gray-500">Score</div>
            <div className="text-2xl font-bold text-primary-600">{score}</div>
          </motion.div>

          {status === 'playing' && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-sm text-gray-500">Time Left</div>
              <div
                className={`text-2xl font-bold ${
                  timeLeft <= 5
                    ? 'text-red-500 animate-pulse'
                    : 'text-primary-600'
                }`}
              >
                {timeLeft}s
              </div>
            </motion.div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

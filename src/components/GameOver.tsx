import { motion } from 'framer-motion';

interface GameOverProps {
  score: number;
  level: number;
  onRestart: () => void;
}

const GameOver = ({ score, level, onRestart }: GameOverProps) => {
  const getMessage = () => {
    if (level >= 10) return 'Amazing spy skills!';
    if (level >= 6) return 'Great job, detective!';
    if (level >= 3) return 'Good effort!';
    return 'Keep practicing!';
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-2xl p-8 max-w-lg mx-auto text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-6xl mb-4">🦊</div>
      <h2 className="text-3xl font-bold text-primary-700 mb-3">Game Over!</h2>

      <div className="mb-6">
        <p className="text-xl text-gray-700 mb-2">{getMessage()}</p>
        <p className="text-gray-600">
          You reached{' '}
          <span className="font-bold text-primary-600">level {level}</span> and
          scored{' '}
          <span className="font-bold text-primary-600">{score} points</span>.
        </p>
      </div>

      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">Final Level</div>
            <div className="text-2xl font-bold text-primary-600">{level}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Final Score</div>
            <div className="text-2xl font-bold text-primary-600">{score}</div>
          </div>
        </div>
      </div>

      <motion.button
        className="btn-primary w-full py-3 text-lg"
        onClick={onRestart}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        Play Again
      </motion.button>
    </motion.div>
  );
};

export default GameOver;

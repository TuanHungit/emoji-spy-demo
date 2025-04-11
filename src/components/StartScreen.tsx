import { motion } from 'framer-motion';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-2xl p-8 max-w-lg mx-auto text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-6xl mb-4">🦊</div>
      <h2 className="text-3xl font-bold text-primary-700 mb-3">
        Welcome to Emoji Spy!
      </h2>
      <p className="text-gray-600 mb-6">
        Find the spy emoji that's slightly different from the others before time
        runs out! Each level gets progressively more challenging.
      </p>

      <div className="mb-8 flex flex-col gap-3 text-left">
        <div className="flex items-center">
          <span className="text-2xl mr-2">👁️</span>
          <span className="text-gray-700">Look carefully at all emojis</span>
        </div>
        <div className="flex items-center">
          <span className="text-2xl mr-2">⏱️</span>
          <span className="text-gray-700">Beat the timer</span>
        </div>
        <div className="flex items-center">
          <span className="text-2xl mr-2">🎯</span>
          <span className="text-gray-700">Click on the odd one out</span>
        </div>
      </div>

      <motion.button
        className="btn-primary w-full py-3 text-lg"
        onClick={onStart}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        Start Game
      </motion.button>
    </motion.div>
  );
};

export default StartScreen;

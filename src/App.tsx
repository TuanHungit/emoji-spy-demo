import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import GameOver from './components/GameOver';
import StartScreen from './components/StartScreen';
import { GameStatus } from './types';

function App() {
  const [status, setStatus] = useState<GameStatus>('start');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const startGame = () => {
    setStatus('playing');
    setLevel(1);
    setScore(0);
    setTimeLeft(30);
  };

  const nextLevel = () => {
    setLevel((prev) => prev + 1);
    setTimeLeft(Math.max(30 - level * 2, 10));
  };

  const endGame = () => {
    setStatus('gameOver');
  };

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col items-center justify-center">
      {status === 'start' && (
        <Header
          level={level}
          score={score}
          timeLeft={timeLeft}
          status={status}
        />
      )}

      <AnimatePresence mode="wait">
        {status === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StartScreen onStart={startGame} />
          </motion.div>
        )}

        {status === 'playing' && (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl"
          >
            <GameBoard
              level={level}
              score={score}
              onCorrectClick={() => {
                setScore((prev) => prev + level * 10);
                nextLevel();
              }}
              onTimeUp={endGame}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
            />
          </motion.div>
        )}

        {status === 'gameOver' && (
          <motion.div
            key="gameover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <GameOver score={score} level={level} onRestart={startGame} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

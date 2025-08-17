import {
  IonPage,
  IonContent,
  IonButton,
  IonText,
  IonImg,
} from '@ionic/react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MovingPicturePlay.css';

const imageUrls = [
  'https://source.unsplash.com/random/300x300?sig=1',
  'https://source.unsplash.com/random/300x300?sig=2',
  'https://source.unsplash.com/random/300x300?sig=3'
];

const MAX_MOVES = 25;
const MAX_ATTEMPTS = 5;
const WINS_TO_ADVANCE = 2;

const MovingPicturePlayGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [score, setScore] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [winCount, setWinCount] = useState(0);
  const [resultMessage, setResultMessage] = useState('');
  const [moving, setMoving] = useState(false);
  const [position, setPosition] = useState(0);
  const animationInterval = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setIsPlaying(true);
    setResultMessage('');
    setMoveCount(0);
    setImageIndex((prev) => (prev + 1) % imageUrls.length);
    setMoving(true);
  };

  const stopAnimation = () => {
    if (animationInterval.current) clearInterval(animationInterval.current);
    setMoving(false);
  };

  useEffect(() => {
    if (moving) {
      animationInterval.current = setInterval(() => {
        setPosition((prev) => prev + 10);
        setMoveCount((prev) => {
          if (prev + 1 >= MAX_MOVES) {
            stopAnimation();
            setAttemptsLeft((a) => a - 1);
            setResultMessage('Failed! Try Again.');
          }
          return prev + 1;
        });
      }, 200);
    }
    return () => {
      if (animationInterval.current) clearInterval(animationInterval.current);
    };
  }, [moving]);

  const handleTap = () => {
    if (!moving) return;
    stopAnimation();

    // Assume correct fit is between position 120 and 140 (you can adjust this range)
    if (position >= 120 && position <= 140) {
      setScore((s) => s + 1);
      setWinCount((w) => w + 1);
      setResultMessage('Perfect Fit! You win this round.');
    } else {
      setResultMessage('Missed! Try Again.');
    }
    setAttemptsLeft((a) => a - 1);
  };

  useEffect(() => {
    if (attemptsLeft === 0 || winCount >= WINS_TO_ADVANCE) {
      setIsPlaying(false);
      stopAnimation();
      if (winCount >= WINS_TO_ADVANCE) {
        setResultMessage('Congratulations! You advance to the next round.');
      } else {
        setResultMessage('Game Over. Better luck next time.');
      }
    }
  }, [attemptsLeft, winCount]);

  return (
    <IonPage>
      <IonContent className="game-bg" fullscreen>
        <div className="game-container" onClick={handleTap}>
          <div className="circle-target"></div>

          <AnimatePresence>
            {isPlaying && (
              <motion.img
                key={imageIndex}
                src={imageUrls[imageIndex]}
                className="moving-image"
                initial={{ y: 400 }}
                animate={{ y: position }}
                exit={{ opacity: 0 }}
                transition={{ ease: 'linear', duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          {!isPlaying && (
            <IonButton
              expand="block"
              color="primary"
              onClick={() => {
                setPosition(0);
                startGame();
              }}
            >
              Start Game
            </IonButton>
          )}

          <IonText className="result-message">{resultMessage}</IonText>

          <div className="stats">
            <IonText>Attempts Left: {attemptsLeft}</IonText>
            <IonText>Wins: {winCount}</IonText>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MovingPicturePlayGame;

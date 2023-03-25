import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Mole from '@/components/molegame/Mole';
import { randomInteger } from '@/utils';

type MoleType = {
  position: {
    x: number;
    y: number;
  };
};

function calculatePosition(fieldRef: React.RefObject<HTMLDivElement>): {
  x: number;
  y: number;
} {
  if (!fieldRef.current) {
    return {
      x: 0,
      y: 0,
    };
  }

  const fieldRect = fieldRef.current.getBoundingClientRect();

  console.log(fieldRect.width, fieldRect.height);

  const x = randomInteger(0, fieldRect.width - 100);
  const y = randomInteger(0, fieldRect.height - 100);

  return {
    x,
    y,
  };
}

interface GameBoardProps {
  handleGameEnd: (score: number, timeInGame: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ handleGameEnd }) => {
  const [activeMole, setActiveMole] = useState<MoleType | null>(null);
  const [score, setScore] = useState(0);
  const fieldRef = useRef<HTMLDivElement>(null);
  const [timeInGame, setTimeInGame] = useState(0);

  function handleTicks() {
    return setInterval(() => {
      setTimeInGame((prevTime) => prevTime + 1);
    }, 1000);
  }

  async function respawnMole() {
    while (true) {
      const position = calculatePosition(fieldRef);

      setActiveMole({
        position,
      });

      const time = randomInteger(2000, 4000);

      setTimeout(() => {
        setActiveMole(null);
      }, time);

      await new Promise((resolve) => setTimeout(resolve, time));
    }
  }

  useEffect(() => {
    setActiveMole(null);
    setScore(0);
    respawnMole().catch((e) => console.error(e));

    const interval = handleTicks();
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    return () => {
      setTimeInGame((time) => {
        if (time <= 0) {
          return time;
        }

        setScore((sc) => {
          if (sc <= 0) {
            return sc;
          }

          handleGameEnd(sc, time);
          return sc;
        });
        return time;
      });
    };
  }, []);

  const handleMoleClick = () => {
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">Score: {score}</Typography>
        <Typography variant="h4">Time In Game: {timeInGame}</Typography>
      </Box>
      <Box
        sx={{
          backgroundImage: `url("/grass.jpg")`,
          width: '100%',
          height: 600,
          position: 'relative',
          borderRadius: 1,
        }}
        ref={fieldRef}
      >
        {!!activeMole ? (
          <Mole position={activeMole.position} onClick={handleMoleClick} />
        ) : null}
      </Box>
    </Box>
  );
};

export default GameBoard;

import { useState, useRef, useCallback } from 'react';
import { createStage, isColliding } from './utils/gameHelpers';
// custom hooks
import { useInterval } from './hooks/useInterval';
import { usePlayer } from './hooks/usePlayer';
import { useStage } from './hooks/useStage';
import { useGameStatus } from './hooks/useGameStatus';

// Components
import Stage from './components/Stage/Stage';
import Display from './components/Display/Display';
import StartButton from './components/StartButton/StartButton';

// Variables
import { DROPTIME_NORMAL, DROPTIME_FAST } from './utils/setup';

// CSS
import classes from './App.module.css';

const App = () => {
  const [dropTime, setDroptime] = useState<number | null>(null); // to stop time intervall from falling elements
  const [gameOver, setGameOver] = useState<boolean>(true);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const { player, updatePlayerPosition, resetPlayer, playerRotate } = usePlayer();
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel } = useGameStatus(rowsCleared);

  // define how to move the current players position
  const movePlayer = (direction: number) => {
    // before updating players position (-> execution of move), check if there would be collision with this move
    // y=0 since move is only possible horizontally
    if (!isColliding(player, stage, { x: direction, y: 0 })) {
      updatePlayerPosition({ x: direction, y: 0, collided: false });
    }
  };

  const keyUp = ({ keyCode }: { keyCode: number }): void => {
    if (gameOver) return;

    // reset droptime speed when user relases down arrow (= 40)
    if (keyCode === 40) {
      setDroptime(DROPTIME_NORMAL / level + 200); // set speed with level weight
    }
  };

  const handleStartGame = (): void => {
    // need to focus game area with the key events on start of game
    if (gameAreaRef.current) gameAreaRef.current.focus();
    // reset game
    setStage(createStage());
    setDroptime(DROPTIME_NORMAL);
    resetPlayer();
    setScore(0);
    setLevel(1);
    setRows(0);
    setGameOver(false);
  };

  // define the move itself; repeat = if key is hold or not by user
  const move = ({ keyCode, repeat }: { keyCode: number; repeat: boolean }): void => {
    if (gameOver) return;

    // left arrow = 37; right arrow = 39; down arrow = 40; up arrow = 39
    if (keyCode === 37) {
      movePlayer(-1);
    } else if (keyCode === 39) {
      movePlayer(1);
    } else if (keyCode === 40) {
      if (repeat) return; // just call once even if key remains pressed
      setDroptime(DROPTIME_FAST); // define higher drop down time
    } else if (keyCode === 38) {
      // rotate element -> here: only in ONE direction
      playerRotate(stage);
    }
  };

  const drop = (): void => {
    // increase level + speed when player has cleared x rows (here: 10)
    if (rows > level * 10) {
      setLevel((prev) => prev + 1);
      setDroptime(DROPTIME_NORMAL / level + 200);
    }

    // first check possible collision when moving 1 cell down
    if (!isColliding(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false });
    } else {
      // game over
      if (player.position.y < 1) {
        console.log('Game over');
        setGameOver(true);
        setDroptime(null); // stop drop interval
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true });
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <div className={classes.app}>
      <div
        className={classes.wrapper}
        role='button'
        tabIndex={0}
        onKeyDown={move} // triggered when key is pressed
        onKeyUp={keyUp} // triggered when key is released
        ref={gameAreaRef}
      >
        <div className={classes.tetris}>
          <div className={classes.display}>
            {/* check if gameover */}
            {gameOver ? (
              <>
                <Display gameOver={gameOver} text='Game Over!' />
                <StartButton callback={handleStartGame} />
              </>
            ) : (
              <>
                <Display text={`Score: ${score}`} />
                <Display text={`Rows: ${rows}`} />
                <Display text={`Level: ${level}`} />
              </>
            )}
          </div>
          {/* stage is NOT responsive yet + actions with keyboard */}
          <Stage stage={stage} />
        </div>
      </div>
    </div>
  );
};

export default App;

// {
//   "name": "react-tetris-typescript",
//   "version": "0.1.0",
//   "private": true,
//   "dependencies": {
//     "react": "^17.0.2",
//     "react-dom": "^17.0.2",
//     "react-scripts": "5.0.0",
//     "styled-components": "^5.3.0"
//   },
//   "scripts": {
//     "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "eject": "react-scripts eject"
//   },
//   "eslintConfig": {
//     "extends": [
//       "react-app",
//       "react-app/jest"
//     ]
//   },
//   "browserslist": {
//     "production": [
//       ">0.2%",
//       "not dead",
//       "not op_mini all"
//     ],
//     "development": [
//       "last 1 chrome version",
//       "last 1 firefox version",
//       "last 1 safari version"
//     ]
//   },
//   "devDependencies": {
//     "@types/styled-components": "^5.1.23",
//     "@types/jest": "^27.4.0",
//     "@types/node": "^16.11.25",
//     "@types/react": "^17.0.39",
//     "@types/react-dom": "^17.0.11",
//     "@testing-library/jest-dom": "^5.16.2",
//     "@testing-library/react": "^12.1.3",
//     "@testing-library/user-event": "^13.5.0",
//     "typescript": "^4.5.5"
//   }
// }

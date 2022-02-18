import { useState, useRef } from 'react';
import { createStage } from './utils/gameHelpers';
// custom hooks
import { useInterval } from './hooks/useInterval';
import { usePlayer } from './hooks/usePlayer';
import { useStage } from './hooks/useState';

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

  const { player, updatePlayerPosition, resetPlayer } = usePlayer();
  const { stage, setStage } = useStage(player, resetPlayer);

  const handleStartGame = (): void => {
    // need to focus game area with the key events on start of game
    if (gameAreaRef.current) gameAreaRef.current.focus();
    // reset everything
    setStage(createStage());
    setDroptime(DROPTIME_NORMAL);
    resetPlayer();
    setGameOver(false);
  };

  // define how to move the current players position
  const movePlayer = (direction: number) => {
    // y=0 since move is only possible horizontally
    updatePlayerPosition({ x: direction, y: 0, collided: false });
  };

  const keyUp = ({ keyCode }: { keyCode: number }): void => {
    // reset droptime speed when user relases down arrow (= 40)
    if (keyCode === 40) {
      setDroptime(DROPTIME_NORMAL); // LATER: set a level weight -> setDroptime(1000 / level);
    }
  };

  // define the move itself; repeat = if key is hold or not by user
  const move = ({ keyCode, repeat }: { keyCode: number; repeat: boolean }): void => {
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
    }
  };

  const drop = (): void => {
    updatePlayerPosition({ x: 0, y: 1, collided: false });
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
                <Display text={`Score: `} />
                <Display text={`Rows: `} />
                <Display text={`Level: `} />
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

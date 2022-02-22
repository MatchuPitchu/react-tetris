import { useState, useRef } from 'react';
import { createStage, isColliding } from './utils/gameHelpers';
// custom hooks
import { useInterval } from './hooks/useInterval';
import { usePlayer } from './hooks/usePlayer';
import { useStage } from './hooks/useStage';
import { useGameStatus } from './hooks/useGameStatus';
// Components
import Stage from './components/Stage/Stage';
import Display from './components/Display/Display';
import Button from './components/Button/Button';
// Variables
import { DROPTIME_NORMAL, DROPTIME_FAST } from './utils/setup';
// CSS
import classes from './App.module.css';
import Garbage from './components/Garbage/Garbage';

const App = () => {
  const [dropTime, setDroptime] = useState<number | null>(null); // to stop time intervall from falling elements
  const [isPause, setIsPause] = useState<boolean>(false);
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

  const handlePauseGame = (): void => {
    !isPause ? setDroptime(null) : setDroptime(DROPTIME_NORMAL);
    setIsPause((prev) => !prev);
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

  let heading;
  if (gameOver) {
    heading = (
      <>
        <Display gameOver={gameOver} text='Game Over' />
        <Button callback={handleStartGame}>Start</Button>
      </>
    );
  } else {
    heading = (
      <>
        <Button callback={handleStartGame}>Neustart</Button>
        <Display text={`Score: ${score}`} />
        <Display text={`Rows: ${rows}`} />
        <Display text={`Level: ${level}`} />
        <Button callback={handlePauseGame}>{isPause ? 'Weiter' : 'Pause'}</Button>
      </>
    );
  }

  return (
    <div
      className={classes.wrapper}
      role='button'
      tabIndex={0}
      onKeyDown={move} // triggered when key is pressed
      onKeyUp={keyUp} // triggered when key is released
      ref={gameAreaRef}
    >
      <div className={classes.tetris}>
        <div className={classes.heading}>{heading}</div>
        {/* stage is NOT responsive yet + actions with keyboard */}
        <Stage stage={stage} />
        <Garbage />
      </div>
    </div>
  );
};

export default App;

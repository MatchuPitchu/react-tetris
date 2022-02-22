import type { Player } from '../hooks/usePlayer';
import type { StageType } from '../components/Stage/Stage';
import { STAGE_WIDTH, STAGE_HEIGHT } from './setup';
import { TETROMINOS } from './setup';

// function to create the tetris game stage
export const createStage = () => {
  // create a multi-dimensional array (like the shape in setup.ts for tetris elements)
  // 0 = no tetris element in grid cell; 'clear' = no tetris element is fixed in this grid cell
  return Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']));
};

// create random tetris element to come into the game
export const randomTetromino = (): typeof TETROMINOS[keyof typeof TETROMINOS] => {
  // take types of keys of TETROMINOS obj, const is an array
  const tetrominos = ['A', 'B', 'C', 'D'] as (keyof typeof TETROMINOS)[];
  // select random element
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};

export const isColliding = (
  player: Player,
  stage: StageType,
  { x: moveX, y: moveY }: { x: number; y: number }
) => {
  // Using for loops to be able to return (and break). Not possible with forEach
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      // 1. Check if player is on cell with tetris element
      if (player.tetromino[y][x] !== 0) {
        if (
          // 2. Check if move is inside game areas height (y) -> not bellow game area
          !stage[y + player.position.y + moveY] ||
          // 3. Check if move is inside game areas width (x)
          !stage[y + player.position.y + moveY][x + player.position.x + moveX] ||
          // 4. Check if target cell of current move is NOT set to clear (-> if it would "clear", than NO collision)
          stage[y + player.position.y + moveY][x + player.position.x + moveX][1] !== 'clear'
        ) {
          return true;
        }
      }
    }
  }

  // 5. if all checks above is false, then NO collision
  return false;
};

import { STAGE_WIDTH, STAGE_HEIGHT } from './setup';
import { TETROMINOS } from './setup';

// function to create the tetris game stage
export const createStage = () =>
  // create a multi-dimensional array (like the shape in setup.ts for tetris elements)
  // 0 = no tetris element in grid cell; 'clear' = no tetris element is fixed in this grid cell
  Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']));

// create random tetris element to come into the game
export const randomTetromino = (): typeof TETROMINOS[keyof typeof TETROMINOS] => {
  // take types of keys of TETROMINOS obj, const is an array
  const tetrominos = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'] as (keyof typeof TETROMINOS)[];
  // select random element
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};

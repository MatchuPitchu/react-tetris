import { useState, useEffect } from 'react';
import { createStage } from '../utils/gameHelpers';
import type { Player } from './usePlayer'; // type keyword is optional to precise that's an imported type
import type { StageCell } from '../components/Stage/Stage';
import type { StageType } from '../components/Stage/Stage';

export const useStage = (player: Player, resetPlayer: () => void) => {
  const [stage, setStage] = useState(createStage()); // create stage while first rendering

  useEffect(() => {
    // check if player exists
    if (!player.position) return;

    const updateStage = (prevStage: StageType): StageType => {
      // 1) CLEAR STATGE and REMOVE ALL TETRIS ITEMS IN CERTAIN CELL
      // if Cell has "clear" value, but NO "0" value, that means that it is the players move and should be cleared (for next moves)
      const newStage = prevStage.map(
        (row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)) as StageCell[]
      ); // type assertion with "as" keyword: tells TS to consider value as another type than the type the compiler infers the value to be

      // 2) LOOP OVER GAME STAGE to DRAW NEXT MOVE (-> how to position tetris element)
      // "forEach" can be changed to better for loop (for ... in OR for ...of -> CHECK)
      player.tetromino.forEach((row, y) => {
        row.forEach((cellValue, x) => {
          // if cell is NOT empty then you have a cell with a piece of tetris element
          if (cellValue !== 0) {
            // select the current position of this piece
            newStage[y + player.position.y][x + player.position.x] = [
              cellValue,
              `${player.collided ? 'merged' : 'clear'}`, // if player has collided with other tetris element, then it's "merged"
            ];
          }
        });
      });

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player.collided, player.position, player.tetromino]);

  return { stage, setStage };
};

import { useState, useEffect } from 'react';
import { createStage } from '../utils/gameHelpers';
import type { Player } from './usePlayer'; // type keyword is optional to precise that's an imported type
import type { StageCell } from '../components/Stage/Stage';
import type { StageType } from '../components/Stage/Stage';

export const useStage = (player: Player, resetPlayer: () => void) => {
  const [stage, setStage] = useState(createStage()); // create stage while first rendering
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    // check if player exists
    if (!player.position) return;

    setRowsCleared(0);

    const removeFullRows = (newStage: StageType): StageType => {
      return newStage.reduce((accumulator, row) => {
        // if NO 0, row is full
        const findCellWithZero = row.some((cell) => cell[0] === 0);
        if (!findCellWithZero) {
          // increase cleared rows
          setRowsCleared((prev) => prev + 1);
          // create new empty row at beginning of stage array to push tetrominos down
          // instead of returning cleared row
          accumulator.unshift(new Array(newStage[0].length).fill([0, 'clear'] as StageCell));
          return accumulator;
        }

        accumulator.push(row);
        return accumulator;
      }, [] as StageType);
    };

    const updateStage = (prevStage: StageType): StageType => {
      // 1) CLEAR STATGE and REMOVE ALL TETRIS ITEMS IN CERTAIN CELL
      // if Cell has "clear" value, but NO "0" value, that means that it is the players move and should be cleared (for next moves)
      const newStage = prevStage.map(
        (row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)) as StageCell[]
      ); // type assertion with "as" keyword: tells TS to consider value as another type than the type the compiler infers the value to be

      // 2) LOOP OVER GAME STAGE to DRAW NEXT MOVE (-> how to position tetris element)
      // "forEach" can be changed to better for loop (for ... in OR for ...of -> CHECK)
      player.tetromino.forEach((row, y) => {
        row.forEach((col, x) => {
          // if cell is NOT empty then you have a cell with a piece of tetris element
          if (col !== 0) {
            // select the current position of this piece
            newStage[y + player.position.y][x + player.position.x] = [
              col,
              `${player.collided ? 'merged' : 'clear'}`, // if player has collided with other tetris element, then it's "merged"
            ];
          }
        });
      });

      // trigger next tetris element
      if (player.collided) {
        resetPlayer();
        return removeFullRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player.collided, player.position, player.tetromino, resetPlayer]);

  return { stage, setStage, rowsCleared };
};

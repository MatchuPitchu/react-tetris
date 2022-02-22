import { useState, useEffect } from 'react';
import { createStage } from '../utils/gameHelpers';
import type { Player } from './usePlayer'; // type keyword is optional to precise that's an imported type
import type { CellType } from '../components/Stage/Stage';
import type { StageType } from '../components/Stage/Stage';

export const useStage = (player: Player, resetPlayer: () => void) => {
  const [stage, setStage] = useState(createStage()); // create stage while first rendering
  const [rowsSuccesCleared, setRowsSuccesCleared] = useState(0);
  const [rowsFailCleared, setRowsFailCleared] = useState(0);

  // TODO:
  // - Logik, wenn Mülleimer nicht getroffen wird

  useEffect(() => {
    // check if player exists
    if (!player.position) return;

    setRowsSuccesCleared(0);
    setRowsFailCleared(0);

    // CHECK FOR HIT IN GARBAGE AND REMOVE ALWAYS THIS ROW FROM STAGE
    const checkForPoints = (newStage: StageType): StageType => {
      return newStage.reduce((accumulator, row) => {
        const findCell = row.some((cell, index) => {
          return (
            (cell[0] === 'A' && index >= 2 && index <= 7) ||
            (cell[0] === 'B' && index >= 12 && index <= 17) ||
            (cell[0] === 'C' && index >= 32 && index <= 47) ||
            (cell[0] === 'D' && index >= 42 && index <= 47)
          );
        });

        const findFailedCell = row.some((cell, index) => {
          return (
            (cell[0] === 'A' && (index < 2 || index > 7)) ||
            (cell[0] === 'B' && (index < 12 || index > 17)) ||
            (cell[0] === 'C' && (index < 32 || index > 47)) ||
            (cell[0] === 'D' && (index < 42 || index > 47))
          );
        });

        if (findCell) {
          // increase cleared rows
          setRowsSuccesCleared((prev) => prev + 1);
          // create new empty row at beginning of stage array to push tetrominos down
          // instead of returning cleared row
          accumulator.unshift(new Array(newStage[0].length).fill([0, 'clear'] as CellType));
          return accumulator;
        }

        if (findFailedCell) {
          setRowsFailCleared((prev) => prev + 1);
          accumulator.unshift(new Array(newStage[0].length).fill([0, 'clear'] as CellType));
          return accumulator;
        }

        accumulator.push(row);
        return accumulator;
      }, [] as StageType);
    };

    const updateStage = (prevStage: StageType): StageType => {
      // 1) CLEAR STAGE and REMOVE ALL TETRIS ITEMS IN CERTAIN CELL
      // if Cell has "clear" value, but NO "0" value, that means that it is the players move and should be cleared (for next moves)
      const newStage = prevStage.map(
        (row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)) as CellType[]
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
        return checkForPoints(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player.collided, player.position, player.tetromino, resetPlayer]);

  return { stage, setStage, rowsSuccesCleared, rowsFailCleared };
};

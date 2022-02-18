import { useState, useCallback } from 'react';
import { STAGE_WIDTH } from '../utils/setup';
import { randomTetromino } from '../utils/gameHelpers';
import type { CellValue } from '../components/Stage/Stage';

export interface Player {
  position: {
    x: number;
    y: number;
  };
  tetromino: CellValue[][];
  collided: boolean; // to check if element collids with another element on playfield (-> is always one step ahead to check this)
}

export const usePlayer = () => {
  const [player, setPlayer] = useState({} as Player); // type assertions: "as Player"; if a state is initialized soon after setup and always has a value after

  const updatePlayerPosition = ({
    x,
    y,
    collided,
  }: {
    x: number;
    y: number;
    collided: boolean;
  }): void => {
    setPlayer((prev) => ({
      ...prev,
      position: {
        x: (prev.position.x += x),
        y: (prev.position.y += y),
      },
      collided,
    }));
  };

  // reset player for restart of game
  // it is used inside stage hook so use useCallback to avoid infinite loop
  const resetPlayer = useCallback((): void => {
    setPlayer({
      // position in the middle of playfield
      position: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      // create random element und take its shape
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return { player, updatePlayerPosition, resetPlayer };
};

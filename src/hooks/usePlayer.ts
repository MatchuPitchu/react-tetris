import { useState, useCallback } from 'react';
import { StageType } from '../components/Stage/Stage';
import { STAGE_WIDTH } from '../utils/setup';
import { randomTetromino, isColliding } from '../utils/gameHelpers';
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

  const rotate = (matrix: Player['tetromino']) => {
    // transpose rows to become cols
    // CHECK TO UNDERSTAND BETTER
    const transposedMatrix = matrix.map((_, index) => matrix.map((column) => column[index]));
    // reverse each row to get a rotated matrix
    return transposedMatrix.map((row) => row.reverse());
  };

  const playerRotate = (stage: StageType): void => {
    // clone current player -> NOT modifie state directly
    // can use JSON deep copy variant (bad performance!) since no incompatible values with JSON: https://dev.to/samanthaming/how-to-deep-clone-an-array-in-javascript-3cig
    const playerCopy = JSON.parse(JSON.stringify(player));
    playerCopy.tetromino = rotate(playerCopy.tetromino);

    // PREVENT ROTATION into game area borders OR other tetris elements that are merged (fixed) in the game area
    const positionX = playerCopy.position.x;
    let offset = 1;
    // when tetris elements collids during rotating, then move element away from collision object
    while (isColliding(playerCopy, stage, { x: 0, y: 0 })) {
      playerCopy.position.x += offset;
      // trial & error: changing offset to look if element continues to collide
      offset = -(offset + (offset > 0 ? 1 : -1));

      // check offset against length of row of tetris element
      if (offset > playerCopy.tetromino[0].length) {
        playerCopy.position.x = positionX; // reset to original position
        return;
      }
    }

    setPlayer(playerCopy);
  };

  const updatePlayerPosition = ({
    x,
    y,
    collided,
  }: {
    x: number;
    y: number;
    collided: boolean;
  }): void => {
    const newPlayer = {
      ...player,
      position: { x: (player.position.x += x), y: (player.position.y += y) },
      collided,
    };

    setPlayer(newPlayer);
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

  return { player, updatePlayerPosition, resetPlayer, playerRotate };
};

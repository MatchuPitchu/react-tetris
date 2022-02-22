import { useState, useEffect } from 'react';
import { ITEMPOINTS } from '../utils/setup';

export const useGameStatus = (rowsSuccesCleared: number, rowsFailCleared: number) => {
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [fails, setFails] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    if (rowsSuccesCleared !== 0) {
      // TODO:
      // - Gewichtung mit ITEMPOINTS für unterschiedliche schwer zu ordnende Items
      setScore((prev) => prev + ITEMPOINTS[rowsSuccesCleared - 1] * level);
      setHits((prev) => prev + 1);
    }
    if (rowsFailCleared !== 0) {
      setFails((prev) => prev + 1);
    }
  }, [rowsSuccesCleared, rowsFailCleared, level]); // ADD DEPENDENCIE TO TRIGGER POINT CALC GARBAGES

  return { score, setScore, hits, setHits, fails, setFails, level, setLevel };
};

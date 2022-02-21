export const STAGE_WIDTH = 20; // normal = 12
export const STAGE_HEIGHT = 20; // normal = 20
export const ROWPOINTS = [40, 100, 300, 1200]; // points when solving rows (1, 2, 3 or 4 rows together)
export const DROPTIME_NORMAL = 1000; // normal = 1000
export const DROPTIME_FAST = 30; // normal = 30

export const TETROMINOS: {
  [property: string | number]: {
    shape: (keyof typeof TETROMINOS)[][];
    color: string;
  };
} = {
  // blank space on grid
  0: { shape: [[0]], color: '0, 0, 0' },
  // different Tetris elements
  I: {
    shape: [
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
    ],
    color: '80, 227, 230',
  },
  J: {
    shape: [
      [0, 'J', 0],
      [0, 'J', 0],
      ['J', 'J', 0],
    ],
    color: '36, 95, 223',
  },
  L: {
    shape: [
      [0, 'L', 0],
      [0, 'L', 0],
      [0, 'L', 'L'],
    ],
    color: '223, 173, 36',
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O'],
    ],
    color: '223, 217, 36',
  },
  S: {
    shape: [
      [0, 'S', 'S'],
      ['S', 'S', 0],
      [0, 0, 0],
    ],
    color: '48, 211, 56',
  },
  T: {
    shape: [
      [0, 0, 0],
      ['T', 'T', 'T'],
      [0, 'T', 0],
    ],
    color: '132, 61, 198',
  },
  Z: {
    shape: [
      ['Z', 'Z', 0],
      [0, 'Z', 'Z'],
      [0, 0, 0],
    ],
    color: '227, 78, 78',
  },
};

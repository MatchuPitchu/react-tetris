export const STAGE_WIDTH = 50; // normal = 12
export const STAGE_HEIGHT = 20; // normal = 20
export const ITEMPOINTS = [40, 100, 300, 1200]; // points when solving rows (1, 2, 3 or 4 rows together)
export const DROPTIME_NORMAL = 1000; // normal = 1000
export const DROPTIME_FAST = 30; // normal = 30

export const TETROMINOS: {
  [property: string | number]: {
    shape: (keyof typeof TETROMINOS)[][];
    color: string;
  };
} = {
  // blank space on grid
  0: { shape: [[0]], color: '#cccccc50' },
  // different elements
  A: {
    shape: [['A']],
    color: '#D6C70C',
  },
  B: {
    shape: [['B']],
    color: '#3D88CC',
  },
  C: {
    shape: [['C']],
    color: '#744B37',
  },
  D: {
    shape: [['D']],
    color: '#1E2C39',
  },
};

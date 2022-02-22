import Cell from '../Cell/Cell';
import classes from './Stage.module.css';
import { STAGE_HEIGHT, STAGE_WIDTH, TETROMINOS } from '../../utils/setup';
import Garbage from '../Garbage/Garbage';

export type CellValue = keyof typeof TETROMINOS;
export type CellType = [CellValue, 'clear' | 'merged']; // see createStage fn => [0 | tetris element, 'clear']
export type StageType = CellType[][]; // [['test' | 1, 'hallo'], ['test' | 1, 'hallo'], ...]

type Props = {
  stage: StageType;
  fails: number;
};

const Stage: React.FC<Props> = ({ stage, fails }) => {
  return (
    <div
      className={classes.stage}
      style={{
        gridTemplateColumns: `repeat(${STAGE_WIDTH}, 1fr)`,
        gridTemplateRows: `repeat(${STAGE_HEIGHT}, 1fr)`,
      }}
    >
      {/* map through entire game stage that is a 2-dimensional array; x = x axis index */}
      {stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
      <Garbage fails={fails} />
    </div>
  );
};

export default Stage;

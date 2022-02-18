import Cell from '../Cell/Cell';
import { StyledStage } from './Stage.styles';
import { TETROMINOS } from '../../utils/setup';

export type CellValue = keyof typeof TETROMINOS;
export type StageCell = [CellValue, string]; // see createStage fn => [0 | tetris element, 'clear']
export type StageType = StageCell[][]; // [['test' | 1, 'hallo'], ['test' | 1, 'hallo'], ...]

type Props = {
  stage: StageType;
};

const Stage: React.FC<Props> = ({ stage }) => {
  return (
    <StyledStage>
      {/* map through entire game stage that is a 2-dimensional array; x = x axis index */}
      {stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StyledStage>
  );
};

export default Stage;

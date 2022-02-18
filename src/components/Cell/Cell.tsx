import { memo } from 'react';
import { StyledCell } from './Cell.styles';
import { TETROMINOS } from '../../utils/setup';

type Props = {
  type: keyof typeof TETROMINOS;
};

const Cell: React.FC<Props> = ({ type }) => {
  return <StyledCell type={type} color={TETROMINOS[type].color} />;
};

export default memo(Cell); // only rerender cell if prop (-> type) changes

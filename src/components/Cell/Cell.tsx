import { memo } from 'react';
import classes from './Cell.module.css';
import { TETROMINOS } from '../../utils/setup';

interface Props {
  type: keyof typeof TETROMINOS;
}

const Cell: React.FC<Props> = ({ type }) => {
  return (
    <div
      className={classes.cell}
      style={{
        backgroundColor: TETROMINOS[type].color,
      }}
    />
  );
};

export default memo(Cell); // only rerender cell if prop (-> type) changes

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
        background: `rgba(${TETROMINOS[type].color}, 0.8)`,
        border: '4px solid',
        borderBottomColor: `rgba(${TETROMINOS[type].color}, 0.1)`,
        borderRightColor: `rgba(${TETROMINOS[type].color}, 1)`,
        borderTopColor: `rgba(${TETROMINOS[type].color}, 1)`,
        borderLeftColor: `rgba(${TETROMINOS[type].color}, 0.3)`,
      }}
    />
  );
};

export default memo(Cell); // only rerender cell if prop (-> type) changes

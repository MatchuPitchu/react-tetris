import classes from './Display.module.css';

type Props = {
  gameOver?: boolean;
  text: string;
};

const Display: React.FC<Props> = ({ gameOver, text }) => {
  return (
    <div className={`${classes['game-status']} ${gameOver ? classes['game-status--over'] : ''}`}>
      {text}
    </div>
  );
};

export default Display;

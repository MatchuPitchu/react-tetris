import classes from './Button.module.css';

type Props = {
  callback: () => void;
};

const StartButton: React.FC<Props> = ({ callback }) => {
  return (
    <button className={classes.btn} onClick={callback}>
      Start
    </button>
  );
};

export default StartButton;

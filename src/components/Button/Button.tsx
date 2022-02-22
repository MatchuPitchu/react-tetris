import classes from './Button.module.css';

type Props = {
  callback: () => void;
};

const Button: React.FC<Props> = ({ callback, children }) => {
  return (
    <button className={classes.btn} onClick={callback}>
      {children}
    </button>
  );
};

export default Button;

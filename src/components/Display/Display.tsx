import { StyledDisplay } from './Display.styles';

type Props = {
  gameOver?: boolean;
  text: string;
};

const Display: React.FC<Props> = ({ gameOver, text }) => {
  // with styled components you can define css rules dynamically
  return <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>;
};

export default Display;

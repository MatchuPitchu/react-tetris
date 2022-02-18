import { StyledStartButton } from './StartButton.styles';

type Props = {
  callback: () => void;
};

const StartButton: React.FC<Props> = ({ callback }) => {
  return <StyledStartButton onClick={callback}>StartButton</StyledStartButton>;
};

export default StartButton;

import classes from './Garbage.module.css';
import { STAGE_HEIGHT, STAGE_WIDTH } from '../../utils/setup';

import garbageYellow from '../../assets/svg/garbage-yellow.svg';
import garbageBlue from '../../assets/svg/garbage-blue.svg';
import garbageBrown from '../../assets/svg/garbage-brown.svg';
import garbageGrey from '../../assets/svg/garbage-grey.svg';
import pile from '../../assets/svg/pile.svg';

const Garbage: React.FC = () => {
  return (
    <div className={classes.garbage}>
      <img src={garbageYellow} alt='garbage yellow' />
      <img src={garbageBlue} alt='garbage yellow' />
      <div>
        <img src={pile} alt='garbage yellow' />
      </div>
      <img src={garbageBrown} alt='garbage yellow' />
      <img src={garbageGrey} alt='garbage yellow' />
    </div>
  );
};

export default Garbage;

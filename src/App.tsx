import './App.css';
import classes from '.App.module.css';

function App() {
  return (
    <div className={classes.wrapper} role='button' tabIndex={0}>
      <div className={classes.tetris}>Start</div>
    </div>
  );
}

export default App;

import './App.css';
import CharacterSelector from './components/CharacterSelector.js'
import Button from '@material-ui/core/Button';
import PercentCalc from './components/percentCalc'
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <h1>E7 Kermit Score Calculator</h1>
        <PercentCalc/>
        <Typography variant="h3">*If gear score is 60 or above, Kermit recommends reforging <strong>right away</strong>!!!</Typography>
      </header>
    </div>
  );
}

export default App;

import './App.css';
import CharacterSelector from './components/CharacterSelector.js'
import Button from '@material-ui/core/Button';
import PercentCalc from './components/percentCalc'

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <h1>E7 Gear Calculator</h1>
        <PercentCalc/>
        <CharacterSelector />
      </header>
    </div>
  );
}

export default App;

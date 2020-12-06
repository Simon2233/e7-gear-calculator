import './App.css';
import CharacterSelector from './components/CharacterSelector.js'
import Button from '@material-ui/core/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ayoooo</h1>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
        <CharacterSelector />
      </header>
    </div>
  );
}

export default App;

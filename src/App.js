import './App.css';
import CharacterSelector from './components/CharacterSelector.js'
import Button from '@material-ui/core/Button';
import PercentCalc from './components/percentCalc'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
     document.title = "E7 Kermit Calculator"
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="md">
          <h1>E7 Kermit Score Calculator</h1>
          <PercentCalc/>
          <Typography variant="h5">*If gear score is 60 or above, Kermit recommends reforging <strong>right away</strong>!!!</Typography>
        </Container>
      </header>
    </div>
  );
}

export default App;

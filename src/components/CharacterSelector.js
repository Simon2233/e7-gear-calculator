import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import superagent from 'superagent'

export default function CharacterSelector(props) {
  const [heroes, setHeroes] = useState([])
  const [selectedHero, setSelectedHero] = useState()

  useEffect(async () => {
    async function getHeroes() {
      try {
        let response = await superagent.get('https://epic7x.com/characters/').set('Accept', 'text/html')
        
        let heroes = response.text.match("var CHARACTERS = (\\[.*\\])")[1];

        console.log("Heroes Response:");
        console.log(heroes);
        setHeroes(JSON.parse(heroes))
      } catch(err) {
        console.log("Failed request for heroes")
        throw err
      }
    }
    getHeroes()
  }, [])


  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        onChange={(event, hero) => {
          if (!hero) {
            props.onHeroDetailChange(0,0,0)
            setSelectedHero();
            return;
          }
          setSelectedHero(hero);

	      props.onHeroDetailChange(
	        hero.stats.health,
	        hero.stats.defense,
	        hero.stats.attack)
	      }}
        options={heroes}
        getOptionLabel={(hero) => hero.name}
        style={{ width: 300, margin: "auto"}}
        renderInput={(params) => <TextField {...params} label="Character" variant="outlined" error={props.error} helperText="Required if gear has flat stats" />}
      />
      {selectedHero &&
      	<div style={{'display': 'flex', 'justify-content': 'center', 'align-items': 'center'}}>
          <img src={selectedHero.icon} style={{'borderRadius': '50%', 'height': '100px'}}/>
          <div>
	          <div><b>HP</b>: {selectedHero.stats.health}</div>
	          <div><b>DEF</b>: {selectedHero.stats.defense}</div>
	          <div><b>ATK</b>: {selectedHero.stats.attack}</div>
          </div>
        </div>
      }
    </div>
  );
}
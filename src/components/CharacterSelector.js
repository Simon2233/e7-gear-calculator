import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import superagent from 'superagent'

export default function CharacterSelector(props) {
  const [heroes, setHeroes] = useState([])
  const [selectedHeroId, setSelectedHeroId] = useState()
  const [heroDetails, setHeroDetails] = useState()

  useEffect(async () => {
    async function getHeroes() {
      try {
        let response = await superagent.get('https://api.epicsevendb.com/hero')
        console.log("Heroes Response:")
        console.log(response)
        setHeroes(JSON.parse(response.text).results)
      } catch(err) {
        console.log("Failed request for heroes")
        throw err
      }
    }
    getHeroes()
  }, [])

  useEffect(async () => {
    async function getHeroDetails() {
      if (!selectedHeroId) return;

      try {
        let response = await superagent.get(`https://api.epicsevendb.com/hero/${selectedHeroId}`)
        let result = JSON.parse(response.text).results[0]
        console.log("Hero Details Response:")
        console.log(response)
        setHeroDetails(result)
        props.onHeroDetailChange(
          result.calculatedStatus.lv60SixStarFullyAwakened.hp,
          result.calculatedStatus.lv60SixStarFullyAwakened.def,
          result.calculatedStatus.lv60SixStarFullyAwakened.atk)
      } catch(err) {
        console.log("Failed request for hero", selectedHeroId)
        throw err
      }
    }

    getHeroDetails()
  }, [selectedHeroId])

  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        onChange={(event, hero) => {
          if (!hero) {
            props.onHeroDetailChange(0,0,0)
            setSelectedHeroId();
            setHeroDetails();
            return;
          }
          setSelectedHeroId(hero._id);
        }}
        options={heroes}
        getOptionLabel={(hero) => hero.name}
        style={{ width: 300, margin: "auto"}}
        renderInput={(params) => <TextField {...params} label="Character" variant="outlined" error={props.error} helperText="Required if gear has flat stats" />}
      />
      {heroDetails &&
        <img src={`https://assets.epicsevendb.com/_source/face/${heroDetails.id}_s.png`} />
      }
    </div>
  );
}
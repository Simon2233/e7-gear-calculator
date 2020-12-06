import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import superagent from 'superagent'

export default function CharacterSelector() {
  const [heroes, setHeroes] = useState([])
  const [selectedHero, setSelectedHero] = useState({name: ""})
  const [heroDetails, setHeroDetails] = useState({})

  useEffect(async () => {
    async function getHeroes() {
      try {
        let response = await superagent.get('https://api.epicsevendb.com/api/hero')
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
      if (selectedHero.name == "") return;

      try {
        let response = await superagent.get(`https://api.epicsevendb.com/api/hero/${selectedHero._id}`)
        console.log("Hero Details Response:")
        console.log(response)
        setHeroDetails(JSON.parse(response.text).results[0])
      } catch(err) {
        console.log("Failed request for hero", selectedHero._id)
        throw err
      }
    }

    getHeroDetails()
  }, [selectedHero.name])

  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        onChange={(event, newValue) => {
          setSelectedHero(newValue);
        }}
        options={heroes}
        getOptionLabel={(hero) => hero.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Character" variant="outlined" />}
      />
      <Typography variant="h1">{heroDetails.stats ? heroDetails.stats.lv60SixStarNoAwaken.hp : "Waiting"}</Typography>
    </div>
  );
}
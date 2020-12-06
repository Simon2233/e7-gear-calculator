import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import superagent from 'superagent'

export default function CharacterSelector() {
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
        console.log("Hero Details Response:")
        console.log(response)
        setHeroDetails(JSON.parse(response.text).results[0])
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
          if (!hero) return;
          setSelectedHeroId(hero._id);
        }}
        options={heroes}
        getOptionLabel={(hero) => hero.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Character" variant="outlined" />}
      />
      {heroDetails &&
      <>
        <img src={`https://assets.epicsevendb.com/_source/face/${heroDetails.id}_s.png`} />
        <Typography variant="h4">Lvl 60 six star awakened stats</Typography>
        <Typography variant="h5">HP: {heroDetails.calculatedStatus ? heroDetails.calculatedStatus.lv60SixStarNoAwaken.hp : "Waiting"}</Typography>
        <Typography variant="h5">SPD: {heroDetails.calculatedStatus ? heroDetails.calculatedStatus.lv60SixStarNoAwaken.spd : "Waiting"}</Typography>
        <Typography variant="h5">ATK: {heroDetails.calculatedStatus ? heroDetails.calculatedStatus.lv60SixStarNoAwaken.atk : "Waiting"}</Typography>
        <Typography variant="h5">DEF: {heroDetails.calculatedStatus ? heroDetails.calculatedStatus.lv60SixStarNoAwaken.def : "Waiting"}</Typography>
      </>
      }
    </div>
  );
}
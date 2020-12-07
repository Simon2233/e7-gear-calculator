import React, {Component, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CharacterSelector from './CharacterSelector.js'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function PercentCalc(){
  const classes = useStyles();

	const [result, setResult] = useState(0);
	const [stats, setStats] = useState({
			atkPercent: 0,
			hpPercent: 0,
			defPercent: 0,
			effPercent: 0,
			effresPercent: 0,
			speed: 0,
			critc: 0,
			critdmg: 0,
			flatAtk: 0,
			flatHp: 0,
			flatDef: 0
		}
	);
	const [baseHp, setBaseHp] = useState(0);
	const [baseDef, setBaseDef] = useState(0);
	const [baseAtk, setBaseAtk] = useState(0);

	const [error, setError] = useState(false);


	function setBase(hp, def, atk) {
		setBaseHp(hp);
		setBaseDef(def);
		setBaseAtk(atk);
	}

	function calculate() {
	  if ((stats.flatAtk || stats.flatDef || stats.flatHp) && !baseHp) {
	    setError(true);
	  } else {
	    setError(false);
	  }
//		console.log((stats.flatAtk / BaseAtk) * 100);
//		console.log((stats.flatDef / BaseDef) * 100);
//		console.log((stats.flatHp / BaseHP) * 100);
		setResult(Math.round(
		  (parseInt(stats.atkPercent) || 0) +
		  (parseInt(stats.hpPercent) || 0) +
		  (parseInt(stats.defPercent) || 0) +
		  (parseInt(stats.effPercent) || 0) +
		  (parseInt(stats.effresPercent) || 0) +
		  (parseInt(stats.speed)*2 || 0) +
		  (parseInt(stats.critc)*1.5 || 0) +
		  (parseInt(stats.critdmg) || 0) +
		  ((stats.flatAtk / baseAtk) * 100) +
		  ((stats.flatDef / baseDef) * 100) +
		  ((stats.flatHp / baseHp) * 100) || 0));
	}

	function handleChange(event) {
		const key = event.target.id
		setStats((prevState) => {return({...prevState, [key]: event.target.value})});
	}

	return (
		<div className="calculator">
			<form className={classes.root}>
				<TextField id="atkPercent" label=<span><img src="https://assets.epicsevendb.com/_source/img/cm_icon_stat_att.png"/>Atk %</span> variant="outlined" type="number" onChange={handleChange} />
				<TextField id="hpPercent" label=<span><img src="https://assets.epicsevendb.com/_source/img/cm_icon_stat_max_hp.png"/>HP %</span> variant="outlined" type="number" onChange={handleChange} />
				<TextField id="defPercent" label=<span><img src="https://assets.epicsevendb.com/_source/img/cm_icon_stat_def.png"/>Def %</span> variant="outlined" type="number" onChange={handleChange}/>

				<TextField id="flatAtk" label=<span><img src="https://assets.epicsevendb.com/_source/img/cm_icon_stat_att.png"/>Flat Atk</span> variant="outlined" type="number" onChange={handleChange} />
				<TextField id="flatHp" label=<span><img src="https://assets.epicsevendb.com/_source/img/cm_icon_stat_max_hp.png"/>Flat HP</span> variant="outlined" type="number" onChange={handleChange} />
				<TextField id="flatDef" label=<span><img src="https://assets.epicsevendb.com/_source/img/cm_icon_stat_def.png"/>Flat Def</span> variant="outlined" type="number" onChange={handleChange}/>

				<TextField id="effPercent" label=<span><img src="https://assets.epicsevendb.com/_source/img/cm_icon_stat_acc.png"/>Eff %</span> variant="outlined" type="number" onChange={handleChange}/>
				<TextField id="effresPercent" label=<span><img src="https://assets.epicsevendb.com/_source/img/cm_icon_stat_res.png"/>Eff Res %</span> variant="outlined" type="number" onChange={handleChange}/>
				<TextField id="speed" label=<span><img src="https://assets.epicsevendb.com/_source/img/cm_icon_stat_speed.png"/>Speed</span> variant="outlined" type="number" onChange={handleChange}/>
				<TextField id="critc" label=<span><img src="https://assets.epicsevendb.com/_source/img/cm_icon_stat_cri.png"/>Crit Chance</span> variant="outlined" type="number" onChange={handleChange}/>
				<TextField id="critdmg" label=<span><img src="https://assets.epicsevendb.com/_source/img/cm_icon_stat_cri_dmg.png"/>Crit Damage</span> variant="outlined" type="number" onChange={handleChange}/>
			</form>
      		<CharacterSelector onHeroDetailChange={setBase} error={error}/>
      		<Button onClick={calculate} variant="contained" size='large'>Calculate</Button>
			<Typography variant="h3" className="result">Gear Score = {result}</Typography>
		</div>
	);
}
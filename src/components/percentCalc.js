import React, {Component, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CharacterSelector from './CharacterSelector.js'

export default function PercentCalc(){
	const [result, setResult] = useState(0);
	const [stats, setStats] = useState({
			atkPercent: 0,
			hpPercent: 0,
			defPercent: 0,
			effPercent: 0,
			effresPercent: 0,
			speed: 0,
			critc: 0,
			critdmg: 0
		}
	);
	const [BaseHP, setBaseHP] = useState(0);
	const [BaseDef, setBaseDef] = useState(0);
	const [BaseAtk, setBaseAtk] = useState(0);

	function setBase(hp, def, atk) {
		setBaseHP(hp);
		setBaseDef(def);
		setBaseAtk(atk);
	}

	function calculate() {
		setResult((parseInt(stats.hpPercent) || 0) + (parseInt(stats.atkPercent) || 0) + (parseInt(stats.defPercent) || 0) + (parseInt(stats.effPercent) || 0) + (parseInt(stats.effresPercent) || 0) + (parseInt(stats.speed)*2 || 0) + (parseInt(stats.critc)*1.5 || 0) + (parseInt(stats.critdmg) || 0));
	}

	function handleChange(event) {
		const key = event.target.id
		setStats((prevState) => {return({...prevState, [key]: event.target.value})});
	}

	return (
		<div className="calculator">
			<form>
				<TextField id="atkPercent" label="Atk %" variant="outlined" type="number" onChange={handleChange} />
				<TextField id="hpPercent" label="Hp %" variant="outlined" type="number" onChange={handleChange} />
				<TextField id="defPercent" label="Def %" variant="outlined" type="number" onChange={handleChange}/>
				<TextField id="effPercent" label="Eff %" variant="outlined" type="number" onChange={handleChange}/>
				<TextField id="effresPercent" label="Eff Res %" variant="outlined" type="number" onChange={handleChange}/>
				<TextField id="speed" label="Speed" variant="outlined" type="number" onChange={handleChange}/>
				<TextField id="critc" label="Crit Chance" variant="outlined" type="number" onChange={handleChange}/>
				<TextField id="critdmg" label="Crit Damage" variant="outlined" type="number" onChange={handleChange}/>
				<Button onClick={calculate} variant="contained">Calculate</Button>
			</form>
			<div className="result">Gear Score = {result}</div>
			<CharacterSelector onHeroDetailChange={setBase}/>
		</div>
	);
}
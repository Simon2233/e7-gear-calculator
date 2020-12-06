import React, {Component, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function PercentCalc(){
	const [result, setResult] = useState(0);

	const [stats, setStats] = useState({
			atkPercent: 0,
			defPercent: 0,
			effPercent: 0,
			effresPercent: 0,
			speed: 0,
			critc: 0,
			critdmg: 0
		}
	);

	function calculate() {
		setResult(parseInt(stats.atkPercent) + parseInt(stats.defPercent) + parseInt(stats.effPercent) + parseInt(stats.effresPercent) + parseInt(stats.speed) + parseInt(stats.critc) + parseInt(stats.critdmg))
	}

	function handleChange(event) {
		const re = /^[0-9\b]+$/
		const key = event.target.id
		if (event.target.value === "" || re.test(event.target.value)) {
			setStats((prevState) => {return({...prevState, [key]: event.target.value})})
		}
	}

	return (
		<div className="calculator">
			<form>
				<TextField id="atkPercent" label="Atk %" variant="outlined" onChange={handleChange} />
				<TextField id="defPercent" label="Def %" variant="outlined" onChange={e => setStats((prevState) => {return({...prevState,defPercent: e.target.value})})}/>
				<TextField id="effPercent" label="Eff %" variant="outlined" onChange={e => setStats((prevState) => {return({...prevState,effPercent: e.target.value})})}/>
				<TextField id="effresPercent" label="Eff Res %" variant="outlined" onChange={e => setStats((prevState) => {return({...prevState,effresPercent: e.target.value})})}/>
				<TextField id="speed" label="Speed" variant="outlined" onChange={e => setStats((prevState) => {return({...prevState,speed: e.target.value})})}/>
				<TextField id="critc" label="Crit Chance" variant="outlined" onChange={e => setStats((prevState) => {return({...prevState,critc: e.target.value})})}/>
				<TextField id="critdmg" label="Crit Damage" variant="outlined" onChange={e => setStats((prevState) => {return({...prevState,critdmg: e.target.value})})}/>
				<Button onClick={calculate} variant="contained">Calculate</Button>
			</form>
			<div className="result">{result}</div>
		</div>
	);
}
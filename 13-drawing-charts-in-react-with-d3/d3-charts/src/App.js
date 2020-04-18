import React, { useEffect, useState } from 'react';
import './App.css';
import BarChart from './charts/BarChart';

const datas = [
	[10, 30, 40, 20],
	[10, 40, 30, 20, 50, 10],
	[60, 30, 40, 20, 30]
]
var i = 0;

function App() {
	const [data, setData] = useState([]);

	useEffect(() => {
		changeData();
	}, []);

	const changeData = () => {
		setData(datas[i++]);
		if(i === datas.length) i = 0;
	}


	return (
		<div className="App">
			<h2>Graphs with React</h2>
			<button onClick={changeData}>Change Data</button>
			<BarChart width={600} height={400} data={data} />
		</div>
	);
}

export default App;

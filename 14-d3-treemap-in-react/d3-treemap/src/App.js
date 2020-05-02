import React, { useState, useEffect } from 'react';
import './App.css';
import Treemap from './Treemap';

const dataset = {"children":[{"name":"boss1","children":[{"name":"mister_a","group":"A","value":28,"colname":"level3"},{"name":"mister_b","group":"A","value":19,"colname":"level3"},{"name":"mister_c","group":"C","value":18,"colname":"level3"},{"name":"mister_d","group":"C","value":19,"colname":"level3"}],"colname":"level2"},{"name":"boss2","children":[{"name":"mister_e","group":"C","value":14,"colname":"level3"},{"name":"mister_f","group":"A","value":11,"colname":"level3"},{"name":"mister_g","group":"B","value":15,"colname":"level3"},{"name":"mister_h","group":"B","value":16,"colname":"level3"}],"colname":"level2"},{"name":"boss3","children":[{"name":"mister_i","group":"B","value":10,"colname":"level3"},{"name":"mister_j","group":"A","value":13,"colname":"level3"},{"name":"mister_k","group":"A","value":13,"colname":"level3"},{"name":"mister_l","group":"D","value":25,"colname":"level3"},{"name":"mister_m","group":"D","value":16,"colname":"level3"},{"name":"mister_n","group":"D","value":28,"colname":"level3"}],"colname":"level2"}],"name":"CEO"};

function App() {
	const [data, setData] = useState(null);

	useEffect(() => {
		setData(dataset);
	}, []);

	function deepCopy(obj){
		return JSON.parse(JSON.stringify(obj));
	}

	const updateData1 = () => {
		var _data = deepCopy(data);
		
		_data["children"][0]["children"][0]["value"] = 50;
		_data["children"][0]["children"][1]["value"] = 10;
		_data["children"][0]["children"][2]["value"] = 30;

		_data["children"][1]["children"][0]["value"] = 4;
		_data["children"][1]["children"][1]["value"] = 8;

		setData(_data);
	}

	const updateData2 = () => {
		var _data = deepCopy(data);
		
		_data["children"][0]["children"].push({
			"name":"mister_p",
			"group":"C",
			"value":20,
			"colname":"level3"
		})

		_data["children"][2]["children"].splice(2,1);

		setData(_data);
	}

	const updateData3 = () => {
		var _data = deepCopy(data);

		_data["children"].push({
			"name": "boss4",
			"children": [{
				"name":"mister_z",
				"group":"E",
				"value":40,
				"colname":"level3"
			}]
		});

		setData(_data);
	}

	const updateData4 = () => {
		var _data = deepCopy(data);

		_data["children"].splice(1,1);

		setData(_data);
	}

	const resetData = () => {
		setData(dataset);
	}

	if(data === null) return <></>;

	return (
		<div className="App">
			<h2>Graphs with React</h2>
			<div className="btns">
				<button onClick={updateData1}>Change Child Data Values</button>
				<button onClick={updateData2}>Add/Remove Child Nodes</button>
				<button onClick={updateData3}>Add Parent Nodes</button>
				<button onClick={updateData4}>Remove Parent Nodes</button>
				<button onClick={resetData}>Reset</button>
			</div>
			<Treemap width={600} height={400} data={data} />
		</div>
	);
}

export default App;

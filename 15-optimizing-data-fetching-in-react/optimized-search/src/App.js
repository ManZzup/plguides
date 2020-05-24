import React, { useState } from 'react';
import './App.css';
import { Provider, useSelector, useDispatch } from 'react-redux'
import store from './store';
import Autocomplete from 'react-autocomplete';
import { search, debouncedSearch, throttledSearch } from './actions';

function SearchComponent(){
	const [query, setQuery] = useState("");
	const hits = useSelector(state => state.hits);
	const results = useSelector(state => state.searchResults);

	const dispatch = useDispatch();

	const onSearch = (query) => {
		setQuery(query);
		dispatch(throttledSearch(query));
	}

	return (
		<div>
			<div>API hits: {hits}</div>
			<Autocomplete
				getItemValue={(item) => item}
				items={results}
				renderItem={(item, isHighlighted) =>
					<div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
						{item}
					</div>
				}
				value={query}
				onChange={(e) => onSearch(e.target.value)}
			/>
		</div>
	)
}

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<h2>Auto-complete Search</h2>
				<SearchComponent />
			</div>
		</Provider>
	)
}

export default App;

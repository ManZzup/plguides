import React from 'react';
import SearchInputComponent from './SearchInputComponent';
import SearchResultComponent from './SearchResultComponent';

const listing = [
  "Product A",
  "React",
  "Java",
  "Table with chair"
]

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      results: listing,
      query: ""
    }

    this.childRef = React.createRef();
  }

  doSearch = (query) => {
    console.log(query);
    //come complex search goes here
  }

  onSearchClick = () => {
    const query = this.childRef.current.getInputValue();
    console.log(query);
  }

  render(){
    return (
      <div>
        <h2>Product Search</h2>
        <SearchInputComponent
          onInputChange={this.onQueryChange}
          ref={this.childRef}
        />
        <button
          onClick={this.onSearchClick}
        >Search</button>
        <SearchResultComponent
          results = {this.state.results}
        />
      </div>
    )
  }
}

export default App;

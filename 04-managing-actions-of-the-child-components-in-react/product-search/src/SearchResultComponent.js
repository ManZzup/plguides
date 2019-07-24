import React from 'react';

class SearchResultComponent extends React.Component{
  render(){
    return (
      <div>
        <ul>
            {this.props.results.map((result, i) => (
                <li key={i}>{result}</li>
            ))}
        </ul>
      </div>
    )
  }
}

export default SearchResultComponent;

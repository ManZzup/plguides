import React from 'react';

class SearchInputComponent extends React.Component{
  constructor(props){
      super(props);

      this.inputRef = React.createRef();
  }

  getInputValue(){
      return this.inputRef.current.value;
  }

  render(){
    return (
      <div>
        <input 
            type="text"
            ref={this.inputRef}
        />
      </div>
    )
  }
}

export default SearchInputComponent;

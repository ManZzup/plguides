import React, { Component } from 'react';

import { connect } from 'react-redux';
import { searchList } from '../actions';

class SearchComponent extends Component{
    state = {
        query: ""
    }

    onInputChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    onButtonClick = (e) => {
        this.props.searchList(this.state.query);
    }

    render(){
        return (
            <div className="search">
                <input type="text" 
                    value={this.state.query} 
                    onChange={this.onInputChange}
                    className="form-control"
                />
                <button onClick={this.onButtonClick} className="btn btn-primary">
                    Search
                </button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    searchList,
};

export default connect(null, mapDispatchToProps)(SearchComponent);

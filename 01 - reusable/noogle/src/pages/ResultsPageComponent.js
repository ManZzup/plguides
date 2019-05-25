import React, { Component } from 'react';
import ResultsListComponent from '../components/ResultsListComponent';
import { connect } from 'react-redux';
import SearchComponent from '../components/SearchComponent';

class ResultsPageComponent extends Component{
    render(){
        return (
            <div className="container resultspage">
                <h1>Results Page</h1>
                <SearchComponent />
                <ResultsListComponent results={this.props.results} />
            </div>            
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.results
    }
}

export default connect(mapStateToProps, null)(ResultsPageComponent);

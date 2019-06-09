import React, { Component } from 'react';
import SearchComponent from '../components/SearchComponent';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class HomePageComponent extends Component{

    shouldComponentUpdate(next, prev){
        if(next.hasResultsLoaded === true){
            this.props.history.push("/results");
            return false;
        }

        return true;
    }

    render(){
        return (
            <div className="container homepage">
                <h1>NOOGLE!</h1>
                <SearchComponent />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        hasResultsLoaded: state.hasResultsLoaded
    }
}

export default connect(mapStateToProps, null)(withRouter(HomePageComponent));

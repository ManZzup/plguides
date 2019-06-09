import React from 'react';

const ResultsListComponent = (props) => {
    return (
        <div className="result-list">
            {props.results.map((result, index) => (
                <div className="result" key={index}>
                    <div className="title">{result.title}</div>
                    <div className="url">{result.url}</div>
                </div>
            ))}
        </div>
    )
}

export default ResultsListComponent;

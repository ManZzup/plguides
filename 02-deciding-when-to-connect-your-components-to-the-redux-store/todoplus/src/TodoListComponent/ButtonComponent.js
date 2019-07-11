import React, { Component } from 'react';
import { connect } from 'react-redux'

class ButtonComponent extends Component {
    render() {
        const { itemId, deleteItem, printItem } = this.props;

        return (
            <div className="list-item-button">
                <button onClick={() => printItem(itemId)} className="btn btn-print">Print Item</button>
                <button onClick={() => deleteItem(itemId)} className="btn btn-del">Delete Item</button>
            </div>
        )
    }
}

export default ButtonComponent;
import React from 'react';
import { useDispatch } from 'react-redux'
import { deleteItem, printItem, togglCheck } from '../actions';

export default function ButtonComponent({ itemId }){
    const dispatch = useDispatch();
    return (
        <div className="list-item-button">
            <button onClick={() => dispatch(printItem(itemId))} className="btn btn-print">Print Item</button>
            <button onClick={() => dispatch(deleteItem(itemId))} className="btn btn-del">Delete Item</button>
        </div>
    )
}
import React from 'react';
import { useDispatch } from 'react-redux'
import { togglCheck } from '../actions';

export default function CheckComponent({itemId, itemText, isChecked}){
    const dispatch = useDispatch();

    return (
        <div className="list-item-text">
            <input 
                type="checkbox" 
                onChange={() => dispatch(togglCheck(itemId))} 
                checked={isChecked} 
            />
            <span>{itemText}</span>
        </div>
    )
}
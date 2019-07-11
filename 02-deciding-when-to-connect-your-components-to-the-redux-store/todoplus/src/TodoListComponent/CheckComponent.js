import React from 'react';

export default function CheckComponent({itemId, itemText, isChecked, toggleItem}){
    return (
        <div className="list-item-text">
            <input 
                type="checkbox" 
                onChange={() => toggleItem(itemId)} 
                checked={isChecked} 
            />
            <span>{itemText}</span>
        </div>
    )
}
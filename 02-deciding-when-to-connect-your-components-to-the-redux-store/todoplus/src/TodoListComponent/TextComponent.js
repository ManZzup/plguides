import React from 'react';

export default function TextComponent({ itemId, itemText }){
    return (
        <div className="list-item list-item-text">
            <span>{itemText}</span>
        </div>
    )
}
import React, { Component } from 'react';
import { connect } from 'react-redux'

import TextComponent from "./TextComponent";
import CheckComponent from './CheckComponent';
import { deleteItem, printItem } from '../actions';
import ButtonComponent from './ButtonComponent';

export default function TodoItemComponent({ itemId, item }){
    return (
        <div className="list-item">
            { item.isCheckItem ? (
                <CheckComponent
                    itemId={itemId}
                    itemText={item.label}
                    isChecked={item.isChecked}
                />
            ) : (
                <TextComponent 
                    itemId={itemId} 
                    itemText={item.label}    
                />
            )}
            {
                item.hasActions && (
                    <ButtonComponent 
                        itemId={itemId}
                    />
                )
            }
        </div>
    )    
}
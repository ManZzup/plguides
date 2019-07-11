import React, { Component } from 'react';
import { connect } from 'react-redux'

import TextComponent from "./TextComponent";
import CheckComponent from './CheckComponent';
import { deleteItem, printItem, togglCheck } from '../actions';
import ButtonComponent from './ButtonComponent';

class TodoItemComponent extends Component{
    render(){
        const  { itemId, item, togglCheck, deleteItem, printItem } = this.props;

        return (
            <div className="list-item">
                { item.isCheckItem ? (
                    <CheckComponent
                        itemId={itemId}
                        itemText={item.label}
                        isChecked={item.isChecked}
                        toggleItem={togglCheck}
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
                            printItem={printItem}
                            deleteItem={deleteItem}
                        />
                    )
                }
            </div>
        )
    }    
}

const mapDispatchToProps = {
  deleteItem,
  printItem,
  togglCheck
};

export default connect(null, mapDispatchToProps)(TodoItemComponent);
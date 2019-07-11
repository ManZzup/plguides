import React, { Component } from 'react';
import { connect } from 'react-redux'
import ToDoItemComponent from './ToDoItemComponent';

class TodoListComponent extends Component{
    render(){
        const { items } = this.props;

        return (
            <div className="todo-list">
                <h2>ToDo List</h2>
                {items.map((item, idx) => (
                    <ToDoItemComponent 
                        item={item} 
                        itemId={idx}
                        key={idx}
                    />
                ))}
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
      items: state.tasks
  }
}

export default connect(mapStateToProps, null)(TodoListComponent);


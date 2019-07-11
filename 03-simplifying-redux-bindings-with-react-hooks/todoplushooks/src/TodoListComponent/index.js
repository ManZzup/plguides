import React from 'react';
import { useSelector } from 'react-redux';
import ToDoItemComponent from './ToDoItemComponent';

export default function TodoListComponent(){
    const items = useSelector((state) => state.tasks);

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
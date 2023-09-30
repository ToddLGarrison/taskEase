import React from "react";

const ToDoListTile = props => {
    const { name, description } = props.toDoList

    return (
        <div className="ToDoListTile callout">
            <a href={`/toDoLists/${props.toDoList.id}`} >
                <h3>{name}</h3>
                <p className="todo-list-description">{description}</p>
            </a>
        </div>
    )
}

export default ToDoListTile
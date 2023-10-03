import React from "react";

const ToDoListTile = props => {
    const { name, description } = props.toDoList

    return (
        <div className="ToDoListTile callout">
            <a href={`/Lists/${props.toDoList.id}`} >
                <h3>{name}</h3>
            </a>
                <p className="todo-list-description">{description}</p>
        </div>
    )
}

export default ToDoListTile
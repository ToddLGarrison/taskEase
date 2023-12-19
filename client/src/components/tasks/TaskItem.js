import React, { useState } from "react";

const TaskItem = ({ task }) => {
    const [isDone, setIsDone] = useState(false)

    function handleClick() {
        setIsDone((prevValue) => {
            return !prevValue
        })
    }

    return (
        <div className="task-item" onClick={handleClick}>
            <li style={{ textDecoration: isDone ? "line-through" : "none"}}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
            </li>
        </div>
    )
}

export default TaskItem
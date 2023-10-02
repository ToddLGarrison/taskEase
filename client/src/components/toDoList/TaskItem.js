import React from "react";

const TaskItem = ({ task }) => {
    return (
        <div className="task-item">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
        </div>
    )
}

export default TaskItem
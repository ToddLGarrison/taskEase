import React, { useState } from "react";

const TaskItem = ({ task }) => {
    const [isDone, setIsDone] = useState(false)
    

    return (
        <div className="task-item" style={{ textDecoration: isDone ? "line-through" : "none"}}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
        </div>
    )
}

export default TaskItem
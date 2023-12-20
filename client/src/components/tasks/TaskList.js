import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks }) => {

    const taskList = tasks ? tasks.map((task) => {
        <TaskItem
            key={task.id}
            task={task}
            description={task.description}
        />
    }) : []

    return (
        <div className="task-box">
            <h4 className="task-title">Tasks</h4>
            {taskList}
        </div>
    )
}

export default TaskList
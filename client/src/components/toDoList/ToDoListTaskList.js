import React from "react"
import TaskItem from "../tasks/TaskItem";

const ToDoList = (props) => {
    const { tasks } = props;

    return (
        <div>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    )
}

export default ToDoList
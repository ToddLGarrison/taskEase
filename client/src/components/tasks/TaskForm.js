import React, { useState } from "react";
import ErrorList from "../layout/ErrorList";

const TaskForm = ({ postTask, errors }) => {
    const [newTask, setNewTask] = useState({
        task: "",
        description: "",
    })

    const handleChange = (event) => {
        setNewTask({
            ...newTask,
            [event.target.name] : event.target.value
        })    
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postTask(newTask)
        clearForm()
    }

    const clearForm = () => {
        setNewTask({
            task: "",
            description: "",
        })
    }

    return (
        <div className="callout task-form-box">
            <h4 className="form-title">Add A Task</h4>
            <ErrorList errors={errors} />
            <form onSubmit={handleSubmit}>
                <label>
                    Task:
                    <input type="text" name="task" onChange={handleChange} value={newTask.task} />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" onChange={handleChange} value={newTask.description} />
                </label>
                <div className="button-group">
                    <input className="button task-button" type="submit" value="Add Task" />
                </div>
            </form>
        </div>
    )

}

export default TaskForm
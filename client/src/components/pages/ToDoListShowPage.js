import React, { useState, useEffect } from "react"
import TaskForm from "../tasks/TaskForm"
import TaskList from "../tasks/TaskList"
import translateServerErrors from "../../services/translateServerErrors"
import { Redirect } from "react-router-dom"
import DeleteButton from "../editDelete/DeleteButton.js"

const ToDoListShowPage = (props) => {
    const [toDoList, setToDoList] = useState({
        name: "",
        description: "",
        tasks: []
    })

    const [errors, setErrors] = useState([])
    const [tasks, setTasks] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const postTask = async (newTask) => {
        try {
            const toDoListId = props.match.params.id;
            const response = await fetch(`/api/v1/lists/${toDoListId}/tasks`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(newTask),
            });
    
            if (!response.ok) {
                if (response.status === 422) {
                    const errorBody = await response.json();
                    const newErrors = translateServerErrors(errorBody.errors.data);
                    return setErrors(newErrors);
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`;
                    const error = new Error(errorMessage);
                    throw error;
                }
            } else {
                const body = await response.json();
                setErrors([]);
                setTasks([...tasks, body.task]);
            }
        } catch (error) {
            console.error(`Error in fetch ${error.message}`);
        }
    };

    const getToDoList = async () => {
        try {
            const toDoListId = props.match.params.id;
            console.log('ID!', toDoListId);
            const response = await fetch(`/api/v1/lists/${toDoListId}`);
            console.log('response!!!', response);
            
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw error;
            }
    
            const responseBody = await response.json();
            console.log('responseBody', responseBody);

            setToDoList(responseBody.toDoList);
            setTasks(responseBody.toDoList.tasks);
        } catch (error) {
            console.error(`Error in Fetch: ${error.message}`);
        }
    };

    useEffect(() => {
        getToDoList()
    }, [])

    let toDoListDescriptionSection
    if(toDoList.description) {
        toDoListDescriptionSection = <div className="to-do-list-form-description">
            <h3>{toDoList.description}</h3>
        </div>
    }

    let taskForm
    if (props.user) {
        taskForm = (
            <TaskForm
                postTask = {postTask}
                errors={errors} 
            />
        )
    }

    let tasksToDisplay = tasks

    let editButton

    const editToDoList = () => {
        setShouldRedirect({ status: true, newToDoListId: toDoList?.id })
    }

    if (props.user?.id === toDoList.userId){
        editButton = <button className="button edit-button" onClick={editToDoList}>Edit ToDo List</button>
    }

    if (shouldRedirect) {
        return <Redirect push to={`list/${shouldRedirect.newToDoListId}/edit`}/>
    }

    return (
        <div className="to-do-list-box">
            <div className="to-do-list-header-box">
                <h2 className="to-do-list-form-title">{toDoList.name}</h2>
                {toDoListDescriptionSection}
            </div>
            <div className="edit-todo-list-button">
                {editButton}
                <DeleteButton {...props} />
            </div>
            <div className="to-do-list-task-box">
                <TaskList tasks={tasksToDisplay} />
                    {taskForm}
            </div>
        </div>
    )
}

export default ToDoListShowPage
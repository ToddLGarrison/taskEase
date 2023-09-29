import React, { useState } from "react";
import ErrorList from "../layout/ErrorList"
import translateServerErrors from "../../services/translateServerErrors"
import { Redirect } from "react-router-dom";

const ToDoListForm = (props) => {
    const [errors, setErrors] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [newToDoList, setNewToDoList] = useState({
        name:"",
        description: ""
    })

    const handleInputChange = (event) => {
        setNewToDoList({
            ...newToDoList,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postToDoList(newToDoList)
    }

    const postToDoList = async (newToDoList) => {
        try {
            const response = await fetch(`/api/v1/lists`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(newToDoList)
            })
            if(!response.ok){
                if(response.status === 422) {
                    const errorBody= await response.json()
                    const newErrors = translateServerErrors(errorBody.error.data)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`
                    const error = new Error(errorMessage)
                    throw error
                }
            } else {
                const responseBody = await response.json()
                const updateToDoList = responseBody.newToDoLists
                setNewToDoList({...newToDoList, id: updateToDoList.id})
                setShouldRedirect(true)
            }
        }catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    if (shouldRedirect) {
        return <Redirect push to={`/lists/${newToDoList.id}`} />
    }

    return (
        <div className="callout form-box">
            <h2 className="form-title">Create New ToDo List</h2>
            <ErrorList errors={errors}/>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input 
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        value={newToDoList.name}
                        />
                </label>
                <label>
                    Description:
                    <input 
                        type="text"
                        name="description"
                        onChange={handleInputChange}
                        value={newToDoList.description}
                        />
                </label>
                <input className="button todo-list-button" type="submit" value="Create" />
            </form>
        </div>
    )
}

export default ToDoListForm;
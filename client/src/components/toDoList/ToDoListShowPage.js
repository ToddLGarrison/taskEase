import React, { useState, useEffect, useInsertionEffect } from "react"

const ToDoListShowPage = (props) => {
    const [toDoList, setToDoList] = useState({
        name: "",
        description: "",
        tasks: []
    })

    const getToDoList = async () => {
        try {
            const toDoListId = props.match.params.id
            const response = await fetch(`/api/v1/lists/${toDoListId}`)
            if (!response) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
            const responseBody = await response.json()
            setToDoList(responseBody.toDoList)
            //setTasks(responseBody.toDoList.tasks)
        } catch (error) {
            console.error(`Error in Fetch: ${error.message}`)
        }
    }

    useInsertionEffect(() => {
        getToDoList()
    }, [])

    return (
        <div className="to-do-list-box">
            <div className="to-do-list-header-box">
                <h2 className="to-do-list-form-title">{toDoList.name}</h2>
            </div>
        </div>
    )
}

export default ToDoListShowPage
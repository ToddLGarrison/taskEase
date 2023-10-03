import React, { useState, useEffect } from "react"

const ToDoListShowPage = (props) => {
    const [toDoList, setToDoList] = useState({
        name: "",
        description: "",
        tasks: []
    })

    const getToDoList = async () => {
        try {
            const toDoListId = props.match.params.id
            const response = await fetch(`/api/v1/Lists/${toDoListId}`)
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

    useEffect(() => {
        getToDoList()
    }, [])

    return (
        <div className="to-do-list-box">
            <div className="to-do-list-header-box">
                <h2 className="to-do-list-form-title">{toDoList.name}</h2>
                <h3 className="to-do-list-form-description">{toDoList.description}</h3>
            </div>
        </div>
    )
}

export default ToDoListShowPage
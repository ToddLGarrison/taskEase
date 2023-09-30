import React, { useState, useEffect } from "react";
import ToDoListTile from "./ToDoListTile";

const UserToDoList = (props) => {
    const [userToDoLists, setUserToDoLists] = useState([])

    const getUserToDoLists = async () => {
        try {
            const response = await fetch("/api/v1/users")
            if(!response) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
            const body = await response.json()
            console.log(`BODY`, body)
            console.log(`RESPONSE`, response)

            if(!body.toDoLists) {
                throw new Error("Invalid response format: missing 'toDoLists' property")
            }
            setUserToDoLists(body.toDoLists)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getUserToDoLists()
    }, [])

    const userToDoListItems = userToDoLists.map(toDoListObject => {
        return (
            <ToDoListTile
                key={toDoListObject.id}
                toDoList={toDoListObject}
            />
        )
    })

    return (
        <div className="to-do-list-user-page">
            <h2 className="form-title">Your ToDo Lists</h2>
            <div className="grid-x grid-margin-x">
                {userToDoListItems}
            </div>
        </div>
    )

}

export default UserToDoList
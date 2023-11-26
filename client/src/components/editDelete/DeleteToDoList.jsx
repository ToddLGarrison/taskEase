import React, { useState } from "react";
import translateServerErrors from "../../services/translateServerErrors.js";

const DeleteToDoList = async () => {
    const [errors, setErrors] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const listId = props.match.params.id

    try {
        const response = await fetch(`api/v1/lists/${listId}`, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
        })

        if(!response.ok) {
            if(response.status === 422) {
                const errorBody = await response.json
                const newErrors = translateServerErrors(errorBody.errors.data)
                return setErrors(newErrors)
            } else {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
        } else {
            const responseBody = await response.json()
            setShouldRedirect({ status: true, newListId})
        }
    } catch (error) {
        console.error(`Error in Fetch: `, error.message)
    }
}

export default DeleteToDoList
import React, { useState, useEffect } from "react";
import translateServerErrors from "../../services/translateServerErrors.js";

const DeleteToDoList = (props) => {
    const [errors, setErrors] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const listId = props.match.params.id

    const deleteList = async () => {
        try {
            const response = await fetch(`api/v1/lists/${listId}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
            })
    
            if(!response.ok) {
                if(response.status === 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors.data)
                    setErrors(newErrors)
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`
                    const error = new Error(errorMessage)
                    throw error
                }
            } else {
                const responseBody = await response.json()
                setShouldRedirect(true)
            }
        } catch (error) {
            console.error(`Error in Fetch: `, error.message)
        }
    }

    useEffect(() => {
        deleteList()
    }, [])

    return (
        <div>
            {shouldRedirect && <p>Deleting...</p>}
            {errors.length > 0 && (
                <div>
                    <p>Errors:</p>
                    <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default DeleteToDoList
import React from "react";
import DeleteToDoList from "./DeleteToDoList.js";
import { useHistory } from "react-router-dom";

const DeleteButton = () => {
    const history = useHistory()

    const onDelete = async () => {
        await DeleteToDoList(props)
        history.push('/lists')
    }

    return (
        <button onClick={onDelete} className='delete-button button'>
                Delete Task List
            </button>
    )
}

export default DeleteButton
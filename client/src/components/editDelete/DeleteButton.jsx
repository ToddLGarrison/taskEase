import React from "react";
import DeleteToDoList from "./DeleteToDoList.jsx";
import { useHistory } from "react-router-dom";

const DeleteButton = () => {
    const history = useHistory()

    const onDelete = async () => {
        await DeleteToDoList(props)
        history.push('/lists')
    }

    return (
        <button onClick={DeleteToDoList} className='delete-button'>
                Delete Task List
            </button>
    )
}

export default DeleteButton
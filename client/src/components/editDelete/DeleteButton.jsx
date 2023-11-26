import React from "react";
import DeleteToDoList from "./DeleteToDoList.jsx";

const DeleteButton = () => {
    return (
        <button 
            onClick={DeleteToDoList}
            className='delete-button'
            >
                Delete Task List
            </button>
    )
}

export default DeleteButton
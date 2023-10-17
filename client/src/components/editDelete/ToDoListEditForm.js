import React, { useState } from 'react';
import ErrorList from '../layout/ErrorList';

const ToDoListEditForm = () => {
    const [editData, setEditData] = useState({
        title: "",
        description: "",
    });

    const handleInputChange = (event) => {
        setEditData({
            ...editData,
            [event.target.name] : event.target.value
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className='callout form-box'>
            <h2 className='form-title'>Edit ToDo List</h2>
            <ErrorList errors={errors} />
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input 
                        type="text" 
                        name="title"
                        value={editData.title} 
                        onChange={handleInputChange} 
                    />
                </label>
                <label>
                    Description:
                    <input 
                        type="text" 
                        name="description"
                        value={editData.description} 
                        onChange={handleInputChange} 
                    />
                </label>
                <input
                    className='button todo-list-button'
                    type='submit'
                    value='Save Changes'
                />
            </form>
        </div>
    );
};

export default ToDoListEditForm
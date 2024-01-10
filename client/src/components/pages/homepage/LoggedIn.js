import React from 'react';

const LoggedIn = () => {
    return (
        <div className='home-action-container'>
            <div className="create-list-call home-action">
                <a href="/lists/new">Create a new list</a>
            </div>
            <div  className="go-to-list-call home-action">
                <a href="/lists">See your lists</a>
            </div>
        </div>
    )
}

export default LoggedIn;
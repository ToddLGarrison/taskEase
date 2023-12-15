import React from 'react';

const LoggedIn = () => {
    return (
        <div>
            <a href="/lists/new" className="create-list-call">Create a new list</a>
            <a href="/lists" className="go-to-list-call">See your lists</a>
        </div>
    )
}

export default LoggedIn;
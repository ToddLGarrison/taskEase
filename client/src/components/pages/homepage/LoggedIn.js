import React from 'react';

const LoggedIn = () => {
    return (
        <>
            <div className="create-list-call">
                <a href="/lists/new">Create a new list</a>
            </div>
            <div  className="go-to-list-call">
                <a href="/lists">See your lists</a>
            </div>
        </>
    )
}

export default LoggedIn;
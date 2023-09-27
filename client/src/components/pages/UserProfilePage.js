import React from 'react';

const UserProfilePage = (props) => {
    return (
    <>
        <div className="user-details">
            <h4>Account Details</h4>
            <h5>Username: {props.user.username}</h5>
            <h5>Email: {props.user.email}</h5>
        </div>
    </>
    )
}

export default UserProfilePage;
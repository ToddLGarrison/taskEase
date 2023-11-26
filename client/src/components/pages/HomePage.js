import React from "react";

const HomePage = (props) => {

    return (
        <div className="primary home-box">
            <div className="grid homepage">
                <h2 className="homepage-title">Conquer your todo's with TaskEase</h2>
                <div>
                    {props.user ? (
                        <div>
                            <a href="/lists/new" className="create-list-call">Create a new list</a>
                            <a href="/lists" className="go-to-list-call">See your lists</a>
                        </div>
                    ) : (
                        <div>
                            <p className="login-call">Please <a href="/user-sessions/new">login</a> to manage your lists</p>
                        </div>
                    ) }
                </div>
                <p className="developed-by-text">Developed by Todd Garrison</p>
            </div>

        </div>
    )
}

export default HomePage
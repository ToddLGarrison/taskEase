import React from "react";

const HomePage = (props) => {
    return (
        <div className="primary home-box">
            <div className="grid homepage">
                <h2 className="homepage-title">Conquer your todo's with TaskEase</h2>
                <p className="login-call">Please <a href="/user-sessions/new">login</a> to manage your lists</p>
                <p className="developed-by-text">Developed by Todd Garrison</p>
            </div>

        </div>
    )
}

export default HomePage
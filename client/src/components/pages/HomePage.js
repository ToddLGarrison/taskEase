import React from "react";
import LoggedIn from "./LoggedIn";
import Footer from "../layout/Footer";



const HomePage = (props) => {

    return (
        <div className="primary home-box">
            <div className="grid homepage">
                <h2 className="homepage-title">Conquer your todo's with TaskEase</h2>
                <div>
                    {props.user ? (
                        <LoggedIn />
                    ) : (
                        <div>
                            <p className="login-call">Please <a href="/user-sessions/new">login</a> to manage your lists</p>
                        </div>
                    ) }
                </div>
                <Footer />
            </div>

        </div>
    )
}

export default HomePage
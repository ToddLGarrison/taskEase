import React from "react";
import LoggedIn from "./LoggedIn";
import LogInCTA from "./LogInCTA";
import Footer from "../layout/Footer";



const HomePage = (props) => {
    console.log("props", props)
    return (
        <div className="primary home-box">
            <div className="grid homepage">
                <h2 className="homepage-title">Conquer your ToDo's with TaskEase</h2>
                <div>
                    {props.user ? (
                        <LoggedIn />
                    ) : (
                        <LogInCTA />
                    ) }
                </div>
                <Footer />
            </div>

        </div>
    )
}

export default HomePage
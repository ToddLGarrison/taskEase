import React, {useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown)
  };

  let newListLink;
  if (user) {
    newListLink = (
      <>
        <li className="menu-text">
          <Link to="/">Home</Link>
        </li>
        <li className="menu-text">
          <Link to="/lists/new">Create List</Link>
        </li>
        <li className="menu-text">
          <Link to="/lists">Your Lists</Link>
        </li>
      </>
    );
  }

  return (
    <div className="top-bar navbar-border">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="taskEase">TaskEase</li>
          {newListLink}
        </ul>
      </div>

      <div>
        {user ?(
          <div className="top-bar-right">
            <ul className="dropdown menu">
              <li>
                <div className="menu-text">
                  <button onClick={toggleDropDown} className="username user-greeting">
                      Hello {user?.username}!
                    <span className="hamburger-icon">&#9776;</span>
                  </button>
                  {showDropDown && (
                    <ul className="dropdown-menu">
                      <li className="menu-text">
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <a key="sign-out" className="sign-out-button"> <SignOutButton /></a>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="menu">
            <li className="menu-text">
              <Link to="/user-sessions/new">Sign In</Link>
            </li>
            <li className="menu-text">
              <Link to="/users/new">Sign Up</Link>
            </li>
          </ul>
        ) }
      </div>
    </div>
  );
};
export default TopBar;

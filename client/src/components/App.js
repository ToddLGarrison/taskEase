import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import HomePage from "./pages/homepage/HomePage";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import UserProfilePage from "./pages/UserProfilePage";
import ToDoListForm from "./toDoList/ToDoListForm";
import UserToDoList from "./pages/UserToDoListPage";
import ToDoListShowPage from "./pages/ToDoListShowPage";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  if(currentUser === undefined) {
    return <div>Loading....</div>
  }

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" render={(props) => <HomePage user={currentUser} {...props} />}/>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/profile" component={UserProfilePage} user={currentUser} />
        <AuthenticatedRoute exact path="/lists/new" component={ToDoListForm} user={currentUser} />
        <Route exact path="/lists" render={(props) => <UserToDoList user={currentUser} {...props}/>}  />
        <Route exact path="/lists/:id" render={(props) => <ToDoListShowPage user={currentUser} {...props}/>}  />
      </Switch>
    </Router>
  );
};

export default hot(App);

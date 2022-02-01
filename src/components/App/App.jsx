import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
// import for toast notifications see MeetingHistoryItem 
  // handleDeleteMeeting function for example
import { Toaster } from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import BottomNavBar from '../BottomNavBar/BottomNavBar';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import MessagesConvo from '../MessagesConvo/MessagesConvo';
import MessagesView from '../MessagesView/MessagesView';
import AddMeeting from '../AddMeeting/AddMeeting.jsx';
import EditUserProfile from '../EditUserProfile/EditUserProfile';
import MeetingHistory from '../MeetingHistory/MeetingHistory';
import MeetingNotes from '../MeetingNotes/MeetingNotes.jsx';
import SelectedMeeting from '../SelectedMeeting/SelectedMeeting';

import './App.css';
import SearchProfiles from '../SearchProfiles/SearchProfiles';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  // gets the location of where the user is in the app based on the url
  // splices it to work with the reducer set up
  // see BottomNavBar for other side of this code
  const locationToSend = window.location.hash.replace('#/', '');

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_ALL_PROFILES' });
    dispatch({ type: 'GET_MEETINGS' });
    dispatch({
      type: 'SET_WHERE',
      payload: locationToSend
    })
  }, [dispatch]);

  return (
    <Router>
      <div>
      <div><Toaster /></div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/searchProfiles"
          >
            <SearchProfiles />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/messages"
          >
            <MessagesView />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/messages/convo/:id"
          >
            <MessagesConvo />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact path="/edit/:id">
          <EditUserProfile />

          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/meeting/details"
          >
            <SelectedMeeting />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>
          <ProtectedRoute exact path="/meeting/add">
            <AddMeeting />
          </ProtectedRoute>
          <ProtectedRoute exact path="/meeting">
            <MeetingHistory />
          </ProtectedRoute>
          {/* TODO: useParams to route this to /meetingnotes/:id */}
          <ProtectedRoute exact path="/meeting/notes">
            <MeetingNotes />
          </ProtectedRoute>
          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>

        <BottomNavBar />

      </div>
    </Router>
  );
}

export default App;

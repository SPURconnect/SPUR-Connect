import React, { useEffect } from 'react';

import { HashRouter as Router, Redirect, Route, Switch,
  } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import BottomNavBar from '../BottomNavBar/BottomNavBar';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import UserPage from '../UserPage/UserPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import MessagesConvo from '../MessagesConvo/MessagesConvo';
import MessagesView from '../MessagesView/MessagesView';
import AddMeeting from '../AddMeeting/AddMeeting.jsx';
import EditUserProfile from '../EditUserProfile/EditUserProfile';
import MeetingHistory from '../MeetingHistory/MeetingHistory';
import MeetingNotes from '../MeetingNotes/MeetingNotes.jsx';
import MeetingPhotos from '../MeetingPhotos/MeetingPhotos.jsx';
import SelectedMeeting from '../SelectedMeeting/SelectedMeeting';
import SelectedMeetingEdit from '../SelectedMeetingEdit/SelectedMeetingEdit';

import './App.css';
import SearchProfiles from '../SearchProfiles/SearchProfiles';
import SearchProfilesDetails from '../SearchProfilesDetails/SearchProfilesDetails'


function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  // gets the location of where the user is in the app based on the url
    // splices it to work with the reducer set up
    // see BottomNavBar for other side of this code
  const locationToSend = window.location.hash.replace('#/', '');

  // fetches all the user information, as well as populating all the profiles, meetings, 
    // industries and updates the where reducer based on the hash in the url
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_ALL_PROFILES' });
    dispatch({ type: 'GET_MEETINGS' });
    dispatch({ type: 'FETCH_INDUSTRIES'});
    dispatch({
      type: 'SET_WHERE',
      payload: locationToSend
    })
  }, [dispatch]);

  return (
    <Router>
      <div>
        <div>
          <Toaster />
        </div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/user" />

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

          <ProtectedRoute exact path="/searchProfiles">
            <SearchProfiles />
          </ProtectedRoute>

          <ProtectedRoute exact path="/searchProfiles/:id">
            <SearchProfilesDetails />
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
            exact
            path="/user/edit/"
          >
            <EditUserProfile />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact

            path="/meeting/:id"
          >
            <SelectedMeeting />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/meeting/edit/:id"
          >
            <SelectedMeetingEdit />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <ProtectedRoute exact path="/meeting/add/:id">
            <AddMeeting />
          </ProtectedRoute>

          <ProtectedRoute exact path="/meeting">
            <MeetingHistory />
          </ProtectedRoute>

          <ProtectedRoute exact path="/meeting/notes/:id">
            <MeetingNotes />
          </ProtectedRoute>

          <ProtectedRoute exact path="/meeting/photos/:id">
            <MeetingPhotos />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {user.id ? (
          <BottomNavBar />
        ) : (
          <></>
        )}

      </div>
    </Router >
  );
}

export default App;

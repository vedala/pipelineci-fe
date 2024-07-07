import { useAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
 } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import SignupButton from './components/Signup';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import AuthenticationGuard from './components/AuthenticationGuard';
import CreateOrganization from './components/CreateOrganization';
import OrganizationHome from './components/OrganizationHome';
import CallbackEndpoint from './components/CallbackEndpoint';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <div className="App">
        { !isAuthenticated
          ? <>
              <LoginButton />
              <SignupButton />
            </>
          : <LogoutButton />
        }
        <Routes>
          <Route
            path="/"
            element={<Landing />}
          />
          <Route
            path="/home"
            element={<AuthenticationGuard component={Home} />}
          />
          <Route
            path="/organization-home/:organizationId"
            element={<AuthenticationGuard component={OrganizationHome} />}
          />
          <Route
            path="/create-organization"
            element={<AuthenticationGuard component={CreateOrganization} />}
          />
          <Route
            path="/callback-endpoint"
            element={<AuthenticationGuard component={CallbackEndpoint}/>}
          />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

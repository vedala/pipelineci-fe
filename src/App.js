import {
  BrowserRouter as Router,
  Routes,
  Route,
 } from 'react-router-dom';
import { useState } from "react";

import './App.css';
import Landing from './components/Landing';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import AuthenticationGuard from './components/AuthenticationGuard';
import CreateOrganization from './components/CreateOrganization';
import OrganizationHome from './components/OrganizationHome';
import CallbackEndpoint from './components/CallbackEndpoint';
import Projects from './components/Projects';
import Runs from './components/Runs';
import NavBar from './components/NavBar';

function App() {

  const [selectedOrg,   setSelectedOrg]   = useState({key: "", value: ""});

  return (
    <Router>
      <div className="App">
        <NavBar />
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
            path="/projects"
            element={<AuthenticationGuard component={Projects} selectedOrg={selectedOrg} setSelectedOrg={setSelectedOrg}/>}
          />
          <Route
            path="/show-project-runs/:projectId"
            element={<AuthenticationGuard component={Runs}/>}
          />
          <Route
            path="/callback-redirect-endpoint"
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

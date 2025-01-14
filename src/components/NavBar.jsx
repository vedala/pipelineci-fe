import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Signup from './Signup';

function NavBar() {

  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  const goToPath = (path) => {
    navigate(path);
  }

  return (
    <div className="navbar">
      <span className="title">PipelineCI</span>
      { !isAuthenticated && (
        <>
          <LoginButton />
          <Signup />
        </>
      )}
      { isAuthenticated && (
        <>
          <button onClick={() => goToPath('/home')}>Home</button>&nbsp;
          <button onClick={() => goToPath('/create-organization')}>Create Org</button>&nbsp;
          <button onClick={() => goToPath('/projects')}>Projects</button>&nbsp;
          <span className="logged-in-user">Logged in as: {user?.name}</span>
          <LogoutButton />
        </>
      )}
    </div>
  );
}

export default NavBar;

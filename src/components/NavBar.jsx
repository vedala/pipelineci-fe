import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Signup from './Signup';

function NavBar() {

  const { isAuthenticated, user } = useAuth0();

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
          <span className="logged-in-user">Logged in as: {user?.name}</span>
          <LogoutButton />
        </>
      )}
    </div>
  );
}

export default NavBar;

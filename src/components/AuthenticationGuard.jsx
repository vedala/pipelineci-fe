import { withAuthenticationRequired } from "@auth0/auth0-react";

function AuthenticatioGuard({ component }) {
  const Component = withAuthenticationRequired(component);

  return <Component />;
}

export default AuthenticatioGuard;

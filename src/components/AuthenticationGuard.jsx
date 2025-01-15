import { withAuthenticationRequired } from "@auth0/auth0-react";

function AuthenticatioGuard({ component, ...routeArgs }) {
  const Component = withAuthenticationRequired(component);

  return <Component {...routeArgs} />;
}

export default AuthenticatioGuard;

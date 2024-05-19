import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <>
      <h1>404: Page Not Found</h1>
      <Link to="/home">Go To App</Link>
    </>
  );
}

export default PageNotFound;

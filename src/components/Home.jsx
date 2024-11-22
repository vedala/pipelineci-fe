import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const PIPELINECI_API_URL = process.env.REACT_APP_PIPELINECI_API_URL;

function Home() {
  const { user, getAccessTokenSilently } = useAuth0();
console.log("user=", user);

  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessTokenSilently();

      let headersObj;
      if (process.env.NODE_ENV === "production") {
        headersObj = {
          'Authorization': `Bearer ${token}`,
        }
      } else {
        headersObj = {
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': '1',
        }
      }

      await axios.get(`${PIPELINECI_API_URL}/organizations?user=${user.name}`, {
        headers: headersObj
      })
      .then(res => {
        const orgData = res.data;
        setOrganizations(orgData);
      })
      .catch(err => { console.log(err); throw err; });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orgList = organizations.map((organization) => {
    return (
      <li key={organization.id}>
        <span>{organization.name}</span>
        <Link to={`/organization-home/${organization.id}`}>Details</Link>
      </li>
    );
  });

  return (
    <>
      <h1>PipelineCI Home Page</h1>
      <p>Logged in as: { user.name }</p>
      <Link to="/create-organization">Create Organization</Link>
      <ul>{orgList}</ul>
    </>
  );
}

export default Home;

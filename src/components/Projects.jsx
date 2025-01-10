import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const PIPELINECI_API_URL = process.env.REACT_APP_PIPELINECI_API_URL;

function Projects() {
  const { user, getAccessTokenSilently } = useAuth0();

  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg,   setSelectedOrg]   = useState("");

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
        setSelectedOrg(orgData[0].name);
      })
      .catch(err => { console.log(err); throw err; });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orgOptionList = organizations.map((organization) => {
    return (
      <option key={organization.id} value={organization.name}>{organization.name}</option>
    );
  });

  return (
    <>
      <h1>Projects</h1>
      <p>Logged in as: { user.name }</p>
      <label>
        Select an organization:
        <select
          value={selectedOrg}
          onChange={e => setSelectedOrg(e.target.value)}
        >
          {orgOptionList}
        </select>
      </label>
      <p>Selected Org: {selectedOrg}</p>
    </>
  );
}

export default Projects;

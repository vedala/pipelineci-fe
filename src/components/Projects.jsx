import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const PIPELINECI_API_URL = process.env.REACT_APP_PIPELINECI_API_URL;

function Projects() {
  const { user, getAccessTokenSilently } = useAuth0();

  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg,   setSelectedOrg]   = useState({key: "", value: ""});
  const [projects,      setProjects]      = useState([]);

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
        setSelectedOrg({key: orgData[0].id, value: orgData[0].value});
      })
      .catch(err => { console.log(err); throw err; });
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOrgChange = async (e) => {
    const selectedObject = {
      key: e.target.options[e.target.selectedIndex].dataset.key,
      value: e.target.value
    };

    setSelectedOrg(selectedObject);
  }

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

      await axios.get(`${PIPELINECI_API_URL}/projects?orgId=${selectedOrg.key}`, {
        headers: headersObj
      })
      .then(res => {
        const projectsData = res.data;
        setProjects(projectsData);
      })
      .catch(err => { console.log(err); throw err; });
    }

    fetchData();
  }, [selectedOrg, getAccessTokenSilently]);

  const orgOptionList = organizations.map((organization) => {
    return (
      <option key={organization.id} data-key={organization.id} value={organization.name}>{organization.name}</option>
    );
  });

  const projectList = projects.map((project) => {
    return (
      <li>{project.name}</li>
    )
  })

  return (
    <>
      <h1>Projects</h1>
      <p>Logged in as: { user.name }</p>
      <label>
        Select an organization:
        <select
          value={selectedOrg.value}
          onChange={handleOrgChange}
        >
          {orgOptionList}
        </select>
      </label>
      <p>Selected Org: {selectedOrg.value}</p>
      <label>
        Organization's projects:
        <ul>{projectList}</ul>
      </label>
    </>
  );
}

export default Projects;

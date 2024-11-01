import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const PIPELINECI_API_URL = process.env.REACT_APP_PIPELINECI_API_URL;

function CreateOrganization() {
  const [orgName, setOrgName] = useState("");

  const { getAccessTokenSilently } = useAuth0();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      await axios.post(`${PIPELINECI_API_URL}/organizations`, {
        orgName
      }, {
        headers: { 'Authorization': `Bearer ${token}`}
      });
      window.location.href = "https://github.com/apps/pipelineci2024/installations/new";
    } catch(err) {
      console.error("Error on form submit: ", err);
      throw err;
    }
  }

  function handleChange(e) {
    setOrgName(e.target.value);
  }

  return (
    <>
      <h1>Create Organization</h1>

      <form onSubmit={handleSubmit}>
        <label>
          <p>Organization Name</p>
          <input
            name="name"
            value={orgName}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Next</button>
      </form>
    </>
  );
}

export default CreateOrganization;

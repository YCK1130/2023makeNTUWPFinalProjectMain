import axios from "axios";
import qs from "qs";

const errorHandling = (error) => {
  console.log("error", error);
  if (error.response.status === 403) window.location.replace("/");
  if (error.response.status === 404) window.location.replace("/");
  // window.location.replace("/");
};

export const SessionAPI = {
  getSession: () => axios.get(`/api/session`),
  postSession: (teamID, password) =>
    axios.post(
      `/api/session`,
      qs.stringify({
        teamID,
        password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ),
  deleteSession: () => axios.delete(`/api/session`),
};

export const MachineAPI = {
  getMachines: () => axios.get(`/api/machines`),
  postMachine: (name, time) => {
    axios.post(`/api/machines`, qs.stringify({ name, time }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  postPeople2Machine: (machineID, teamID) => {
    axios.post(`/api/people2machine`, qs.stringify({ machineID, teamID }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  clearAllMachine: () =>
    axios.delete(`/api/machines`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }),
  deleteMachine: (machineID) =>
    axios.delete(`/api/machines/${machineID}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }),
};

export const TeamAPI = {
  getTeam: () => axios.get(`/api/teams`),
  getOneTeam: (teamID) => axios.get(`/api/teams/${teamID}`),
  postTeam: (teamID, teamName, status) => {
    axios.post(`/api/teams`, qs.stringify({ teamID, teamName, status }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  deleteTeam: (teamID) =>
    axios.delete(`/api/teams/${teamID}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }),
  deleteTeams: () =>
    axios.delete(`/api/teams`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }),
  updateTeam: (teamID, teamName, status) => {
    axios.post(
      `/api/teams/${teamID}`,
      qs.stringify({ teamID, teamName, status }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  },
};

export const TeamDataAPI = {
  getTeamData: () =>
    axios
      .get(`/api/users`, {
        params: {
          teamName: 1,
          authority: 1,
          myCards: 1,
          requests: 1,
        },
      })
      .catch((error) => errorHandling(error)),
  postTeamData: (teams) =>
    axios.post(`/api/users`, teams).catch((error) => errorHandling(error)),
  deleteTeamData: (ids) =>
    axios
      .delete(`/api/users`, { data: [...ids] })
      .catch((error) => errorHandling(error)),
  putTeamData: (team) =>
    axios.put(`/api/users`, team).catch((error) => errorHandling(error)),
};

export const PasswordAPI = {
  putPassword: (passwords) =>
    axios
      .put(`/api/password`, passwords)
      .catch((error) => errorHandling(error)),
};

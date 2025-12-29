const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const api = {
  // Users
  getUsers: () => fetch(`${API_BASE_URL}/users/`).then(res => res.json()),
  getUser: (id) => fetch(`${API_BASE_URL}/users/${id}/`).then(res => res.json()),
  createUser: (data) => fetch(`${API_BASE_URL}/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  getLeaderboard: () => fetch(`${API_BASE_URL}/users/leaderboard/`).then(res => res.json()),

  // Activities
  getActivities: () => fetch(`${API_BASE_URL}/activities/`).then(res => res.json()),
  getUserActivities: (userId) => fetch(`${API_BASE_URL}/activities/user_activities/?user_id=${userId}`).then(res => res.json()),
  createActivity: (data) => fetch(`${API_BASE_URL}/activities/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),

  // Teams
  getTeams: () => fetch(`${API_BASE_URL}/teams/`).then(res => res.json()),
  getTeam: (id) => fetch(`${API_BASE_URL}/teams/${id}/`).then(res => res.json()),
  createTeam: (data) => fetch(`${API_BASE_URL}/teams/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  addTeamMember: (teamId, userId) => fetch(`${API_BASE_URL}/teams/${teamId}/add_member/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId })
  }).then(res => res.json()),
  getTeamLeaderboard: () => fetch(`${API_BASE_URL}/teams/leaderboard/`).then(res => res.json()),

  // Workouts
  getWorkouts: () => fetch(`${API_BASE_URL}/workouts/`).then(res => res.json()),
  getPersonalizedWorkouts: (userId) => fetch(`${API_BASE_URL}/workouts/personalized/?user_id=${userId}`).then(res => res.json()),
  createWorkout: (data) => fetch(`${API_BASE_URL}/workouts/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
};

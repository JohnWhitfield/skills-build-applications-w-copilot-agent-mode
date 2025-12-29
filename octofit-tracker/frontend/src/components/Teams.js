import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    created_by: '',
    goal: ''
  });

  useEffect(() => {
    loadTeams();
    loadUsers();
  }, []);

  const loadTeams = async () => {
    try {
      const data = await api.getTeams();
      setTeams(data.results || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading teams:', error);
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data.results || []);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createTeam(formData);
      setShowForm(false);
      setFormData({
        name: '',
        description: '',
        created_by: '',
        goal: ''
      });
      loadTeams();
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="container mt-5"><p>Loading...</p></div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Team Management</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create New Team'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Create New Team</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Team Name</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Created By</label>
                <select className="form-select" name="created_by" value={formData.created_by} onChange={handleChange} required>
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Team Goal</label>
                <textarea className="form-control" name="goal" value={formData.goal} onChange={handleChange} rows="2"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Create Team</button>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {teams.map(team => (
          <div key={team.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">
                  {team.description && <>{team.description}<br /></>}
                  <strong>Created by:</strong> {team.created_by_username}<br />
                  <strong>Members:</strong> {team.member_count}<br />
                  <strong>Total Points:</strong> <span className="badge bg-primary">{team.total_points}</span><br />
                  {team.goal && <><strong>Goal:</strong> {team.goal}</>}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;

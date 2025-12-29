import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

function Leaderboard() {
  const [userLeaderboard, setUserLeaderboard] = useState([]);
  const [teamLeaderboard, setTeamLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    loadLeaderboards();
  }, []);

  const loadLeaderboards = async () => {
    try {
      const [users, teams] = await Promise.all([
        api.getLeaderboard(),
        api.getTeamLeaderboard()
      ]);
      setUserLeaderboard(users);
      setTeamLeaderboard(teams);
      setLoading(false);
    } catch (error) {
      console.error('Error loading leaderboards:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="container mt-5"><p>Loading...</p></div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Leaderboard</h2>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Individual Rankings
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'teams' ? 'active' : ''}`}
            onClick={() => setActiveTab('teams')}
          >
            Team Rankings
          </button>
        </li>
      </ul>

      {activeTab === 'users' && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Top Students</h5>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>User Type</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {userLeaderboard.map((user, index) => (
                    <tr key={user.id}>
                      <td>
                        {index === 0 && <span className="badge bg-warning">🥇</span>}
                        {index === 1 && <span className="badge bg-secondary">🥈</span>}
                        {index === 2 && <span className="badge bg-danger">🥉</span>}
                        {index > 2 && <span>{index + 1}</span>}
                      </td>
                      <td>{user.first_name} {user.last_name} ({user.username})</td>
                      <td>
                        <span className={`badge ${user.user_type === 'student' ? 'bg-info' : 'bg-success'}`}>
                          {user.user_type}
                        </span>
                      </td>
                      <td><strong>{user.total_points}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'teams' && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Top Teams</h5>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Team Name</th>
                    <th>Members</th>
                    <th>Total Points</th>
                  </tr>
                </thead>
                <tbody>
                  {teamLeaderboard.map((team, index) => (
                    <tr key={team.id}>
                      <td>
                        {index === 0 && <span className="badge bg-warning">🥇</span>}
                        {index === 1 && <span className="badge bg-secondary">🥈</span>}
                        {index === 2 && <span className="badge bg-danger">🥉</span>}
                        {index > 2 && <span>{index + 1}</span>}
                      </td>
                      <td>{team.name}</td>
                      <td>{team.member_count}</td>
                      <td><strong>{team.total_points}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;

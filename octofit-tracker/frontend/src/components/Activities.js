import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    user: '',
    activity_type: 'running',
    duration_minutes: '',
    distance_km: '',
    calories_burned: '',
    notes: '',
    activity_date: new Date().toISOString().slice(0, 16)
  });

  useEffect(() => {
    loadActivities();
    loadUsers();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await api.getActivities();
      setActivities(data.results || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading activities:', error);
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
      await api.createActivity(formData);
      setShowForm(false);
      setFormData({
        user: '',
        activity_type: 'running',
        duration_minutes: '',
        distance_km: '',
        calories_burned: '',
        notes: '',
        activity_date: new Date().toISOString().slice(0, 16)
      });
      loadActivities();
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="container mt-5"><p>Loading...</p></div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Activity Tracking</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Log New Activity'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Log New Activity</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">User</label>
                  <select className="form-select" name="user" value={formData.user} onChange={handleChange} required>
                    <option value="">Select User</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.username}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Activity Type</label>
                  <select className="form-select" name="activity_type" value={formData.activity_type} onChange={handleChange} required>
                    <option value="running">Running</option>
                    <option value="walking">Walking</option>
                    <option value="cycling">Cycling</option>
                    <option value="swimming">Swimming</option>
                    <option value="strength">Strength Training</option>
                    <option value="yoga">Yoga</option>
                    <option value="sports">Sports</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Duration (minutes)</label>
                  <input type="number" className="form-control" name="duration_minutes" value={formData.duration_minutes} onChange={handleChange} required />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Distance (km)</label>
                  <input type="number" step="0.1" className="form-control" name="distance_km" value={formData.distance_km} onChange={handleChange} />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Calories Burned</label>
                  <input type="number" className="form-control" name="calories_burned" value={formData.calories_burned} onChange={handleChange} />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Date & Time</label>
                  <input type="datetime-local" className="form-control" name="activity_date" value={formData.activity_date} onChange={handleChange} required />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Notes</label>
                  <textarea className="form-control" name="notes" value={formData.notes} onChange={handleChange} rows="2"></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Log Activity</button>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {activities.map(activity => (
          <div key={activity.id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{activity.user_username} - {activity.activity_type}</h5>
                <p className="card-text">
                  <strong>Duration:</strong> {activity.duration_minutes} minutes<br />
                  {activity.distance_km && <><strong>Distance:</strong> {activity.distance_km} km<br /></>}
                  {activity.calories_burned && <><strong>Calories:</strong> {activity.calories_burned}<br /></>}
                  <strong>Points Earned:</strong> <span className="badge bg-success">{activity.points_earned}</span><br />
                  <strong>Date:</strong> {new Date(activity.activity_date).toLocaleString()}<br />
                  {activity.notes && <><strong>Notes:</strong> {activity.notes}</>}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;

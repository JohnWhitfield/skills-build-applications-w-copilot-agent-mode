import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    activity_type: 'running',
    difficulty_level: 'beginner',
    duration_minutes: '',
    estimated_calories: '',
    instructions: '',
    created_by: '',
    is_public: true
  });

  useEffect(() => {
    loadWorkouts();
    loadUsers();
  }, []);

  const loadWorkouts = async () => {
    try {
      const data = await api.getWorkouts();
      // Handle both paginated and non-paginated responses
      setWorkouts(Array.isArray(data) ? data : (data.results || []));
      setLoading(false);
    } catch (error) {
      console.error('Error loading workouts:', error);
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
      await api.createWorkout(formData);
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        activity_type: 'running',
        difficulty_level: 'beginner',
        duration_minutes: '',
        estimated_calories: '',
        instructions: '',
        created_by: '',
        is_public: true
      });
      loadWorkouts();
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const getDifficultyBadge = (level) => {
    const colors = {
      beginner: 'success',
      intermediate: 'warning',
      advanced: 'danger'
    };
    return colors[level] || 'secondary';
  };

  if (loading) return <div className="container mt-5"><p>Loading...</p></div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Workout Suggestions</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create New Workout'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Create New Workout Suggestion</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="2" required></textarea>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Activity Type</label>
                  <select className="form-select" name="activity_type" value={formData.activity_type} onChange={handleChange} required>
                    <option value="running">Running</option>
                    <option value="walking">Walking</option>
                    <option value="cycling">Cycling</option>
                    <option value="swimming">Swimming</option>
                    <option value="strength">Strength Training</option>
                    <option value="yoga">Yoga</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Difficulty Level</label>
                  <select className="form-select" name="difficulty_level" value={formData.difficulty_level} onChange={handleChange} required>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Duration (minutes)</label>
                  <input type="number" className="form-control" name="duration_minutes" value={formData.duration_minutes} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Estimated Calories</label>
                  <input type="number" className="form-control" name="estimated_calories" value={formData.estimated_calories} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Created By</label>
                  <select className="form-select" name="created_by" value={formData.created_by} onChange={handleChange} required>
                    <option value="">Select User</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.username}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Instructions</label>
                  <textarea className="form-control" name="instructions" value={formData.instructions} onChange={handleChange} rows="4" required></textarea>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="is_public" checked={formData.is_public} onChange={handleChange} id="isPublic" />
                    <label className="form-check-label" htmlFor="isPublic">
                      Make this workout public
                    </label>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Create Workout</button>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {workouts.map(workout => (
          <div key={workout.id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <div className="mb-2">
                  <span className={`badge bg-${getDifficultyBadge(workout.difficulty_level)} me-2`}>
                    {workout.difficulty_level}
                  </span>
                  <span className="badge bg-info">{workout.activity_type}</span>
                </div>
                <p className="card-text">{workout.description}</p>
                <p className="card-text">
                  <strong>Duration:</strong> {workout.duration_minutes} minutes<br />
                  {workout.estimated_calories && <><strong>Estimated Calories:</strong> {workout.estimated_calories}<br /></>}
                  <strong>Created by:</strong> {workout.created_by_username || 'System'}
                </p>
                <details>
                  <summary className="btn btn-sm btn-outline-primary">View Instructions</summary>
                  <p className="mt-2">{workout.instructions}</p>
                </details>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;

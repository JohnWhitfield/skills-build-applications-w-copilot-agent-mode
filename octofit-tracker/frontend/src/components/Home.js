import React from 'react';

function Home() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <img src="/octofitapp-small.png" alt="OctoFit Tracker" className="mb-4" style={{maxWidth: '300px'}} />
          <h1 className="display-4">Welcome to OctoFit Tracker</h1>
          <p className="lead">
            Track your fitness journey, compete with friends, and achieve your goals!
          </p>
          <hr className="my-4" />
          <p>
            OctoFit Tracker is designed for students and gym teachers at Mergington High School 
            to monitor fitness progress, create teams, and stay motivated through friendly competition.
          </p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Track Activities</h5>
              <p className="card-text">Log your daily workouts and monitor progress</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Join Teams</h5>
              <p className="card-text">Create or join teams to achieve goals together</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Compete</h5>
              <p className="card-text">Climb the leaderboard and earn recognition</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Get Suggestions</h5>
              <p className="card-text">Receive personalized workout recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

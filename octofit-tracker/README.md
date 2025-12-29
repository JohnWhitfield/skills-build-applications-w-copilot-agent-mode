# OctoFit Tracker

A multi-tier fitness tracking application designed for students and gym teachers at Mergington High School to monitor fitness progress, create teams, and stay motivated through friendly competition.

![OctoFit Tracker Logo](docs/octofitapp-small.png)

## Features

### User Profiles
- Support for both students and gym teachers
- Track personal fitness goals
- Earn points for activities
- View individual progress

### Activity Tracking
- Log various types of activities (running, walking, cycling, swimming, strength training, yoga, sports)
- Automatic points calculation based on activity type and duration
- Track distance, calories burned, and duration
- Add notes to activities

### Team Management
- Create and join teams
- Collaborative fitness goals
- Team point aggregation
- Add and remove team members

### Leaderboards
- Individual rankings by total points
- Team rankings by combined points
- Medal system (🥇🥈🥉) for top performers
- Switch between individual and team views

### Workout Suggestions
- Browse workout recommendations
- Filter by difficulty level (beginner, intermediate, advanced)
- Personalized workout suggestions
- Detailed instructions for each workout
- Created by teachers for students

## Technology Stack

### Backend
- **Python 3.12**
- **Django 4.1.7** - Web framework
- **Django REST Framework 3.14.0** - API framework
- **MongoDB 5.0** - Database (via Docker)
- **djongo 1.3.6** - MongoDB connector for Django
- **django-cors-headers** - CORS support

### Frontend
- **React 18** - UI framework
- **React Router DOM** - Client-side routing
- **Bootstrap 5** - CSS framework
- **Fetch API** - HTTP client

## Setup Instructions

### Prerequisites
- Python 3.12+
- Node.js 14+ and npm
- Docker (for MongoDB)
- Git

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd octofit-tracker/backend
   ```

2. **Create and activate Python virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start MongoDB using Docker:**
   ```bash
   docker run -d --name mongodb -p 27017:27017 mongo:5.0
   ```

5. **Run database migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the Django development server:**
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

   The backend API will be available at `http://localhost:8000/api/`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd octofit-tracker/frontend
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

## API Endpoints

### Users
- `GET /api/users/` - List all users
- `POST /api/users/` - Create a new user
- `GET /api/users/{id}/` - Get user details
- `GET /api/users/leaderboard/` - Get user leaderboard
- `GET /api/users/{id}/update_points/` - Update user's total points

### Activities
- `GET /api/activities/` - List all activities
- `POST /api/activities/` - Log a new activity
- `GET /api/activities/{id}/` - Get activity details
- `GET /api/activities/user_activities/?user_id={id}` - Get user's activities

### Teams
- `GET /api/teams/` - List all teams
- `POST /api/teams/` - Create a new team
- `GET /api/teams/{id}/` - Get team details
- `POST /api/teams/{id}/add_member/` - Add member to team
- `POST /api/teams/{id}/remove_member/` - Remove member from team
- `GET /api/teams/leaderboard/` - Get team leaderboard

### Workouts
- `GET /api/workouts/` - List all workout suggestions
- `POST /api/workouts/` - Create a new workout suggestion
- `GET /api/workouts/{id}/` - Get workout details
- `GET /api/workouts/by_difficulty/?difficulty={level}` - Filter by difficulty
- `GET /api/workouts/personalized/?user_id={id}` - Get personalized workouts

## Project Structure

```
octofit-tracker/
├── backend/
│   ├── venv/                      # Python virtual environment
│   ├── octofit_tracker/           # Django project settings
│   │   ├── settings.py            # Django configuration
│   │   ├── urls.py                # Main URL routing
│   │   └── wsgi.py
│   ├── users/                     # User profiles app
│   │   ├── models.py              # UserProfile model
│   │   ├── serializers.py         # User serializers
│   │   ├── views.py               # User views
│   │   └── admin.py               # User admin
│   ├── activities/                # Activity tracking app
│   │   ├── models.py              # Activity model
│   │   ├── serializers.py         # Activity serializers
│   │   ├── views.py               # Activity views
│   │   └── admin.py               # Activity admin
│   ├── teams/                     # Team management app
│   │   ├── models.py              # Team model
│   │   ├── serializers.py         # Team serializers
│   │   ├── views.py               # Team views
│   │   └── admin.py               # Team admin
│   ├── workouts/                  # Workout suggestions app
│   │   ├── models.py              # WorkoutSuggestion model
│   │   ├── serializers.py         # Workout serializers
│   │   ├── views.py               # Workout views
│   │   └── admin.py               # Workout admin
│   ├── manage.py                  # Django management script
│   └── requirements.txt           # Python dependencies
└── frontend/
    ├── public/
    │   ├── index.html
    │   └── octofitapp-small.png   # App logo
    ├── src/
    │   ├── components/
    │   │   ├── Home.js            # Home page
    │   │   ├── Navigation.js       # Navigation bar
    │   │   ├── Activities.js       # Activity tracking
    │   │   ├── Teams.js            # Team management
    │   │   ├── Leaderboard.js      # Leaderboards
    │   │   └── Workouts.js         # Workout suggestions
    │   ├── services/
    │   │   └── api.js              # API service layer
    │   ├── App.js                  # Main app component
    │   └── index.js                # React entry point
    ├── package.json                # Node dependencies
    └── README.md                   # React app README
```

## Usage Guide

### For Students

1. **Create an account** as a student
2. **Log activities** using the Activities page
3. **Join teams** created by your gym teacher
4. **Track progress** on the Leaderboard
5. **Browse workouts** for personalized fitness suggestions

### For Gym Teachers

1. **Create an account** as a gym teacher
2. **Create teams** for your students
3. **Add students** to teams
4. **Create workout suggestions** tailored to different skill levels
5. **Monitor student progress** through leaderboards

## Points System

Activities earn points based on duration and type:
- **High intensity** (running, swimming, strength training): 1.5x base points
- **Medium intensity** (cycling, sports): 1.2x base points
- **Low intensity** (walking, yoga, other): 1x base points

Base points = duration in minutes

## Development

### Running in Development Mode

Both servers support hot-reload for development:

**Backend:**
```bash
cd octofit-tracker/backend
source venv/bin/activate
python manage.py runserver
```

**Frontend:**
```bash
cd octofit-tracker/frontend
npm start
```

### Admin Interface

Access the Django admin interface at `http://localhost:8000/admin/` to:
- Manage users, activities, teams, and workouts
- View database records
- Perform bulk operations

## Troubleshooting

### MongoDB Connection Issues
- Ensure Docker is running
- Check if MongoDB container is running: `docker ps`
- Restart MongoDB: `docker restart mongodb`

### Port Already in Use
- Backend (8000): Stop any process using port 8000
- Frontend (3000): Stop any process using port 3000
- MongoDB (27017): Stop any MongoDB instances

### CORS Issues
- Ensure `django-cors-headers` is installed
- Check `CORS_ALLOW_ALL_ORIGINS` in `settings.py`
- Verify frontend is accessing the correct backend URL

## Future Enhancements

- User authentication and login system
- Real-time notifications
- Activity photos and media uploads
- Social features (comments, likes)
- Mobile app version
- Data visualization and analytics
- Achievement badges and rewards
- Integration with fitness trackers

## Contributing

This is an educational project for Mergington High School. Contributions are welcome!

## License

MIT License - See LICENSE file for details

## Authors

- **Paul Octo** - PE Teacher at Mergington High School
- **Jessica Cat** - IT Department Head

## Acknowledgments

- Built with guidance from the OctoFit Tracker instructions and prompts
- Designed for students and teachers at Mergington High School
- Powered by modern web technologies and best practices

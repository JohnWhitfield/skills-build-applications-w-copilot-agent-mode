from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class UserProfile(AbstractUser):
    """
    Extended user model for both students and gym teachers
    """
    USER_TYPE_CHOICES = [
        ('student', 'Student'),
        ('teacher', 'Gym Teacher'),
    ]
    
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='student')
    age = models.IntegerField(null=True, blank=True)
    grade_level = models.CharField(max_length=20, null=True, blank=True)
    fitness_goal = models.TextField(blank=True)
    bio = models.TextField(blank=True)
    avatar_url = models.URLField(blank=True, null=True)
    total_points = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-total_points', 'username']

    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"

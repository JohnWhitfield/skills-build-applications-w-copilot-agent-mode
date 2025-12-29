from django.db import models
from django.conf import settings

# Create your models here.

class WorkoutSuggestion(models.Model):
    """
    Model for personalized workout suggestions
    """
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    activity_type = models.CharField(max_length=20)
    difficulty_level = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    duration_minutes = models.IntegerField()
    estimated_calories = models.IntegerField(null=True, blank=True)
    instructions = models.TextField()
    target_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='workout_suggestions', blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_workouts', null=True)
    is_public = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.get_difficulty_level_display()})"

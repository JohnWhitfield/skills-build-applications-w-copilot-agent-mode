from django.db import models
from django.conf import settings

# Create your models here.

class Team(models.Model):
    """
    Model for team creation and management
    """
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_teams')
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='teams', blank=True)
    total_points = models.IntegerField(default=0)
    goal = models.TextField(blank=True, help_text="Team fitness goal")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-total_points', 'name']

    def update_total_points(self):
        """Calculate total points from all team members"""
        from users.models import UserProfile
        total = 0
        for member in self.members.all():
            total += member.total_points
        self.total_points = total
        self.save()

    def __str__(self):
        return f"{self.name} ({self.members.count()} members)"

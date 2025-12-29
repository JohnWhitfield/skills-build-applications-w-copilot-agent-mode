from django.db import models
from django.conf import settings

# Create your models here.

class Activity(models.Model):
    """
    Model to track fitness activities
    """
    ACTIVITY_TYPE_CHOICES = [
        ('running', 'Running'),
        ('walking', 'Walking'),
        ('cycling', 'Cycling'),
        ('swimming', 'Swimming'),
        ('strength', 'Strength Training'),
        ('yoga', 'Yoga'),
        ('sports', 'Sports'),
        ('other', 'Other'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=20, choices=ACTIVITY_TYPE_CHOICES)
    duration_minutes = models.IntegerField(help_text="Duration in minutes")
    distance_km = models.FloatField(null=True, blank=True, help_text="Distance in kilometers")
    calories_burned = models.IntegerField(null=True, blank=True)
    points_earned = models.IntegerField(default=0)
    notes = models.TextField(blank=True)
    activity_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-activity_date']
        verbose_name_plural = "Activities"

    def save(self, *args, **kwargs):
        # Calculate points based on duration and activity type
        if not self.points_earned:
            base_points = self.duration_minutes
            if self.activity_type in ['running', 'swimming', 'strength']:
                self.points_earned = int(base_points * 1.5)
            elif self.activity_type in ['cycling', 'sports']:
                self.points_earned = int(base_points * 1.2)
            else:
                self.points_earned = base_points
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.get_activity_type_display()} ({self.duration_minutes} min)"

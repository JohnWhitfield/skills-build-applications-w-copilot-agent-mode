from django.contrib import admin
from .models import WorkoutSuggestion

# Register your models here.

@admin.register(WorkoutSuggestion)
class WorkoutSuggestionAdmin(admin.ModelAdmin):
    list_display = ['title', 'activity_type', 'difficulty_level', 'duration_minutes', 'is_public', 'created_at']
    list_filter = ['difficulty_level', 'activity_type', 'is_public', 'created_at']
    search_fields = ['title', 'description']
    ordering = ['-created_at']
    filter_horizontal = ['target_users']


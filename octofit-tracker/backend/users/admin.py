from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserProfile

# Register your models here.

@admin.register(UserProfile)
class UserProfileAdmin(UserAdmin):
    list_display = ['username', 'email', 'user_type', 'total_points', 'created_at']
    list_filter = ['user_type', 'created_at']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering = ['-total_points']
    
    fieldsets = UserAdmin.fieldsets + (
        ('Profile Information', {'fields': ('user_type', 'age', 'grade_level', 'fitness_goal', 'bio', 'avatar_url', 'total_points')}),
    )


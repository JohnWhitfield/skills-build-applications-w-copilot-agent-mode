from django.contrib import admin
from .models import Team

# Register your models here.

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_by', 'total_points', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'description']
    ordering = ['-total_points']
    filter_horizontal = ['members']


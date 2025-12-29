from django.contrib import admin
from .models import Activity

# Register your models here.

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['user', 'activity_type', 'duration_minutes', 'points_earned', 'activity_date']
    list_filter = ['activity_type', 'activity_date']
    search_fields = ['user__username', 'notes']
    ordering = ['-activity_date']


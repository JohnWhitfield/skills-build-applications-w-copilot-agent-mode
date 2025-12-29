from rest_framework import serializers
from .models import WorkoutSuggestion

class WorkoutSuggestionSerializer(serializers.ModelSerializer):
    """
    Serializer for WorkoutSuggestion model
    """
    id = serializers.SerializerMethodField()
    created_by_id = serializers.SerializerMethodField()
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)
    
    class Meta:
        model = WorkoutSuggestion
        fields = ['id', 'title', 'description', 'activity_type', 'difficulty_level', 
                  'duration_minutes', 'estimated_calories', 'instructions', 
                  'target_users', 'created_by', 'created_by_id', 'created_by_username', 
                  'is_public', 'created_at']
        read_only_fields = ['created_at']

    def get_id(self, obj):
        """Convert ObjectId to string"""
        return str(obj.id)

    def get_created_by_id(self, obj):
        """Convert creator ObjectId to string"""
        if obj.created_by:
            return str(obj.created_by.id)
        return None

from rest_framework import serializers
from .models import Activity

class ActivitySerializer(serializers.ModelSerializer):
    """
    Serializer for Activity model
    """
    id = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField()
    user_username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Activity
        fields = ['id', 'user', 'user_id', 'user_username', 'activity_type', 
                  'duration_minutes', 'distance_km', 'calories_burned', 
                  'points_earned', 'notes', 'activity_date', 'created_at']
        read_only_fields = ['points_earned', 'created_at']

    def get_id(self, obj):
        """Convert ObjectId to string"""
        return str(obj.id)

    def get_user_id(self, obj):
        """Convert user ObjectId to string"""
        return str(obj.user.id)

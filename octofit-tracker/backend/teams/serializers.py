from rest_framework import serializers
from .models import Team

class TeamSerializer(serializers.ModelSerializer):
    """
    Serializer for Team model
    """
    id = serializers.SerializerMethodField()
    created_by_id = serializers.SerializerMethodField()
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)
    member_count = serializers.SerializerMethodField()
    member_ids = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'created_by', 'created_by_id', 
                  'created_by_username', 'members', 'member_ids', 'member_count', 
                  'total_points', 'goal', 'created_at', 'updated_at']
        read_only_fields = ['total_points', 'created_at', 'updated_at']

    def get_id(self, obj):
        """Convert ObjectId to string"""
        return str(obj.id)

    def get_created_by_id(self, obj):
        """Convert creator ObjectId to string"""
        return str(obj.created_by.id)

    def get_member_count(self, obj):
        """Get total number of team members"""
        return obj.members.count()

    def get_member_ids(self, obj):
        """Convert member ObjectIds to strings"""
        return [str(member.id) for member in obj.members.all()]

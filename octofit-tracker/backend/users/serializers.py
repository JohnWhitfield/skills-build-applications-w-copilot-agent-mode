from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for UserProfile model
    """
    id = serializers.SerializerMethodField()
    
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'user_type', 
                  'age', 'grade_level', 'fitness_goal', 'bio', 'avatar_url', 
                  'total_points', 'created_at', 'updated_at']
        read_only_fields = ['total_points', 'created_at', 'updated_at']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def get_id(self, obj):
        """Convert ObjectId to string"""
        return str(obj.id)

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = UserProfile.objects.create(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

class UserProfileCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating new users with password
    """
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 
                  'user_type', 'age', 'grade_level', 'fitness_goal', 'bio']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = UserProfile.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

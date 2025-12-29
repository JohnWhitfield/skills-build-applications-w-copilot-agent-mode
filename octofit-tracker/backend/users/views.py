from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from .models import UserProfile
from .serializers import UserProfileSerializer, UserProfileCreateSerializer

# Create your views here.

class UserProfileViewSet(viewsets.ModelViewSet):
    """
    ViewSet for UserProfile model
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return UserProfileCreateSerializer
        return UserProfileSerializer

    @action(detail=False, methods=['get'])
    def leaderboard(self, request):
        """
        Get leaderboard of users by total points
        """
        users = UserProfile.objects.all().order_by('-total_points')[:10]
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def update_points(self, request, pk=None):
        """
        Update user's total points based on activities
        """
        user = self.get_object()
        total_points = user.activities.aggregate(total=Sum('points_earned'))['total'] or 0
        user.total_points = total_points
        user.save()
        serializer = self.get_serializer(user)
        return Response(serializer.data)


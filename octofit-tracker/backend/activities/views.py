from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from .models import Activity
from .serializers import ActivitySerializer

# Create your views here.

class ActivityViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Activity model
    """
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

    def perform_create(self, serializer):
        """
        Override to update user points after creating activity
        """
        activity = serializer.save()
        # Update user's total points
        user = activity.user
        total_points = user.activities.aggregate(total=Sum('points_earned'))['total'] or 0
        user.total_points = total_points
        user.save()

    @action(detail=False, methods=['get'])
    def user_activities(self, request):
        """
        Get activities for a specific user
        """
        user_id = request.query_params.get('user_id')
        if user_id:
            activities = Activity.objects.filter(user_id=user_id)
            serializer = self.get_serializer(activities, many=True)
            return Response(serializer.data)
        return Response({"error": "user_id parameter is required"}, status=status.HTTP_400_BAD_REQUEST)


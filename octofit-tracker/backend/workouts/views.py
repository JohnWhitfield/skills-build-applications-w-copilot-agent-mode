from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import WorkoutSuggestion
from .serializers import WorkoutSuggestionSerializer

# Create your views here.

class WorkoutSuggestionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for WorkoutSuggestion model
    """
    queryset = WorkoutSuggestion.objects.all()
    serializer_class = WorkoutSuggestionSerializer
    pagination_class = None  # Disable pagination to work around djongo limitations

    @action(detail=False, methods=['get'])
    def by_difficulty(self, request):
        """
        Get workout suggestions by difficulty level
        """
        difficulty = request.query_params.get('difficulty')
        if difficulty:
            workouts = WorkoutSuggestion.objects.filter(difficulty_level=difficulty)
            serializer = self.get_serializer(workouts, many=True)
            return Response(serializer.data)
        return Response({"error": "difficulty parameter is required"})

    @action(detail=False, methods=['get'])
    def personalized(self, request):
        """
        Get personalized workout suggestions for a user
        """
        user_id = request.query_params.get('user_id')
        if user_id:
            workouts = WorkoutSuggestion.objects.filter(target_users__id=user_id)
            serializer = self.get_serializer(workouts, many=True)
            return Response(serializer.data)
        return Response({"error": "user_id parameter is required"})


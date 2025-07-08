from rest_framework import generics
from .models import Planeta
from .serializers import PlanetaSerializer

class PlanetaListCreate(generics.ListCreateAPIView):
    queryset = Planeta.objects.all()
    serializer_class = PlanetaSerializer

class PlanetaRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Planeta.objects.all()
    serializer_class = PlanetaSerializer
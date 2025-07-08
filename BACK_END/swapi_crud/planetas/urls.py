from django.urls import path
from .views import PlanetaListCreate, PlanetaRetrieveUpdateDestroy

urlpatterns = [
    path('planetas/', PlanetaListCreate.as_view(), name='planeta-list'),
    path('planetas/<int:pk>/', PlanetaRetrieveUpdateDestroy.as_view(), name='planeta-detail'),
]
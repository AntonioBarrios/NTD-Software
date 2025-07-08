from rest_framework import serializers
from .models import Planeta

class PlanetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Planeta
        fields = '__all__'
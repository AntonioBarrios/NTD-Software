from django.db import models

class Planeta(models.Model):
    nombre = models.CharField(max_length=100)
    poblacion = models.BigIntegerField(null=True, blank=True)
    terrenos = models.JSONField(default=list)
    climas = models.JSONField(default=list)
    
    def __str__(self):
        return self.nombre
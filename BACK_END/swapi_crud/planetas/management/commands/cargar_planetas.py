from django.core.management.base import BaseCommand
import requests
from planetas.models import Planeta
import urllib3

# Deshabilitar advertencias de SSL (opcional)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

class Command(BaseCommand):
    help = 'Carga datos de planetas desde SWAPI (API REST)'
    
    def handle(self, *args, **options):
        try:
            url = 'https://swapi.dev/api/planets/'
            count = 0
            
            while url:
                self.stdout.write(f'Obteniendo datos de: {url}')
                
                response = requests.get(
                    url,
                    timeout=10,
                    verify=False  # ← Esto deshabilita la verificación SSL
                )
                
                if response.status_code != 200:
                    self.stdout.write(self.style.ERROR(f'Error HTTP: {response.status_code}'))
                    break
                
                data = response.json()
                
                for planeta_data in data['results']:
                    # Procesamiento de datos (igual que antes)
                    poblacion = planeta_data['population']
                    try:
                        poblacion = int(poblacion) if poblacion and poblacion != 'unknown' else None
                    except (ValueError, TypeError):
                        poblacion = None
                    
                    terrenos = [t.strip() for t in planeta_data['terrain'].split(',') if t.strip()]
                    climas = [c.strip() for c in planeta_data['climate'].split(',') if c.strip()]
                    
                    Planeta.objects.update_or_create(
                        nombre=planeta_data['name'],
                        defaults={
                            'poblacion': poblacion,
                            'terrenos': terrenos,
                            'climas': climas
                        }
                    )
                    count += 1
                    self.stdout.write(f'Procesado: {planeta_data["name"]}')
                
                url = data['next']
            
            self.stdout.write(self.style.SUCCESS(f'✅ Se cargaron {count} planetas correctamente'))
            
        except requests.exceptions.RequestException as e:
            self.stdout.write(self.style.ERROR(f'🔌 Error de conexión: {str(e)}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'⚠️ Error inesperado: {str(e)}'))
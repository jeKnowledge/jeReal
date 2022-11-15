from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# exemplo de dados para um post
class Post(models.Model):
    descricao = models.CharField(max_length=100)
    foto = models.ImageField(default='default.jpg', upload_to='')
    tempo = models.DateTimeField(default=timezone.now)
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
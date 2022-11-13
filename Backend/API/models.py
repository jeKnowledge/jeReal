from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User as AuthUser
import uuid
from datetime import datetime
from django.utils import timezone
# Create your models here.


User = get_user_model()

class NewUser(models.Model):
    id_token = models.CharField(max_length=150, primary_key=True, unique=True)
    username = models.CharField(max_length=150)
    email = models.EmailField(max_length=150)
    password = models.CharField(max_length=150)



class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_user = models.IntegerField()
    description = models.TextField(blank = True)
    profileImg = models.ImageField(upload_to='profileImg', blank = True, null = True, default = None)
    date_joined = models.DateTimeField(default=timezone.now)

class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.CharField(max_length=100)
    image = models.ImageField(upload_to='postImg')
    description = models.TextField(max_length = 500, blank = True)


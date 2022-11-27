from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User as AuthUser
import uuid
from datetime import datetime
from django.utils import timezone
# Create your models here.



class NewUser(models.Model):
    #id_token = models.CharField(max_length=150, primary_key=True, unique=True)
    #id = models.UUIDField(primary_key=True, unique=True, editable=False)
    username = models.CharField(max_length=150)
    email = models.EmailField(max_length=150, unique=True)


class Profile(models.Model):
    user = models.ForeignKey(NewUser, on_delete=models.CASCADE)
    description = models.TextField(blank = True)
    profileImg = models.ImageField(upload_to='profileImg', blank = True, null = True, default = '../assets/defaultImage.png')
    date_joined = models.DateTimeField(default=timezone.now)

class Post(models.Model):
    user = models.ForeignKey(NewUser, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='postImg')
    description = models.TextField(max_length = 500, blank = True)
    creationTime = models.DateTimeField(default=timezone.now)
    lateTime = models.IntegerField(default=0)
    
class Comment(models.Model):
    author = models.ForeignKey(NewUser, on_delete=models.CASCADE)
    postID = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.TextField(max_length = 500, blank = False)


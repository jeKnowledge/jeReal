from django.contrib import admin

# Register your models here.
from .models import Profile, Post, Comment, NewUser

admin.site.register(Profile)
admin.site.register(Post)
admin.site.register(NewUser)
admin.site.register(Comment)


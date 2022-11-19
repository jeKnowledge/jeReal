from django.shortcuts import render
from .models import Post
from django.http import JsonResponse
from rest_framework import status
from .serializers import PostSerializer

def home(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts)
    return JsonResponse(serializer)

def makepost(request):
    return JsonResponse({'title': 'Post'})


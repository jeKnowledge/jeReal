from django.shortcuts import render
from .models import Post
from django.http import JsonResponse
from rest_framework import status
from .serializers import PostSerializer, NewPostSerializer, DeletePostSerializer
from django.views.generic import DetailView

def home(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts)
    return JsonResponse(serializer)

def post(request):
    detail_post = Post.objects.pk
    serializer = PostSerializer(detail_post)
    return JsonResponse(serializer)

def delete(request):
    delete_post = Post.objects.pk
    serializer = DeletePostSerializer(delete_post)
    return JsonResponse(serializer)

def makepost(request):
    posts = Post.objects.all()
    serializer = NewPostSerializer(posts)
    return JsonResponse(serializer)


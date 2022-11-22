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
    detail_post = Post.objects.filter(id=pk)
    serializer = PostSerializer(detail_post)
    return JsonResponse(serializer)

def makepost(request):
    if request.method == 'POST':

        id = request.POST.get('id')
        user = request.POST.get('user')
        image = request.POST.get('image')
        description = request.POST.get('description')
        time = request.POST.get('time')

        post = Post.objects.create_post(id=id, user=user, image=image, description=description, time=time)
        post.save()
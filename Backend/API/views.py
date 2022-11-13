#from audioop import reverse
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.models import User, auth

from django.contrib.auth import authenticate
#from django.contrib import messages
from django.contrib.auth.decorators import login_required
from rest_framework import status
from rest_framework.response import Response
from API.serializers import ProfileSerializer, PostSerializer
from .models import Profile, Post
from itertools import chain

from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework.decorators import api_view
#------------------------------------
'''
from datetime import datetime
from urllib import urlencode
from django.conf import settings
'''
from django.contrib import messages
from API.models import User
# Create your views here.
CLIENT_ID ='549033196869-f3m6urgh42k5rd7kqsdeapc2n1bpdk8p.apps.googleusercontent.com'

@login_required(login_url='login')
@api_view(['GET'])
def profile(request, pk):
    if request.method == 'GET':
        user = User.objects.get(username=pk)
        profile = Profile.objects.get(user=user)
        posts = Post.objects.filter(user=pk)
    

        profile_serializer = ProfileSerializer(profile, many=False)
        posts_serializer = PostSerializer(posts, many=True)
        if profile_serializer.is_valid() and posts_serializer.is_valid():

            profile_serializer.save()
            posts_serializer.save()
            return Response(profile_serializer.data + posts_serializer.data)
        else:
            return HttpResponse('<h1>Serializer data is invalid</h1>')

@login_required(login_url='login/')
def settings(request):
    print(request.user)
    user_profile = Profile.objects.get(user=request.user)

    if request.method == 'POST':
        if request.FILES.get('image') == None:
            profileImg = user_profile.profileImg
            description = request.POST.get('description')

            user_profile.profileImg = profileImg
            user_profile.description = description
            user_profile.save()

        if request.FILES.get('image') != None:
            profileImg = request.FILES['image']
            description = request.POST.get('description')

            user_profile.profileImg = profileImg
            user_profile.description = description
            user_profile.save()
        
        return HttpResponse('<h1>Profile completed!</h1>')
    
    elif request.method == 'PUT':

        if request.FILES.get('image') == None:
            profileImg = user_profile.profileImg
        else: 
            profileImg = request.FILES['image']

        description = request.POST.get('description')

        print(description)

        user_profile.profileImg = profileImg
        user_profile.description = description
        user_profile.save()

    return HttpResponse(status=status.HTTP_201_CREATED, data={'message':'Profile updated successfully!'})

def register(request):

    if request.method == 'POST':
        username = request.POST.get('username')

        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')
 
        #email_split = email.split('@')
        if password1 == password2:

            if User.objects.filter(username=username).exists():

                return HttpResponse('<h1>Username already taken</h1>')
                '''
            elif email_split[1] == 'jeknowledge.com':
                messages.info(request, 'Email domain must be @jenowledge.com')
                return redirect('register')
                '''
            elif User.objects.filter(email=email).exists():

                return HttpResponse('<h1>Email Taken</h1>')
            else:
                user = User.objects.create_user(username=username, password=password1, email=email)
                user.save()

                #log user in and create profile
                user_login = authenticate(username=username, password=password1)
                auth.login(request, user)

                user_model = User.objects.get(username=username)
                new_profile = Profile.objects.create(user=user_model, id_user=user_model.id)
                new_profile.save()

                return HttpResponse('<h1>User and Profile created</h1>')
        else:
            messages.info(request, 'Password not matching..')
            return HttpResponse('<h1>Passwords not matching</h1>')
    else:
        return HttpResponse('<h1>Method not allowed</h1>')

def login(request):

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(username)
        print(password)
        user = authenticate(username=username, password=password)
        print(user)
        if user is not None:
            auth.login(request, user)
            return HttpResponse('<h1>Logged in!!!</h1>')
        else:
            messages.info(request, 'Invalid credentials')
            return HttpResponse('<h1>Invalid credentials</h1>')
    else:
        return HttpResponse('<h1>Method not allowed</h1>')


# body -> username, password, email
# -------Login and Register view with Google-----~
@api_view(['POST'])
def login_register(request):

    #validate the header Authorization and if it´s not valid throw an error
    if 'Authorization' not in request.headers:
        return Response(status=status.HTTP_401_UNAUTHORIZED, data={'message':'No Authorization token given in Headers!'})
    
    token = request.headers['Authorization']

    try:
        # verify the token inside google
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        userID = idinfo['sub']

        # check if the user already exists, if it does, log him in
        user = User.objects.get(username=userID) 
        if user is not None:
            auth.authenticate(username=userID, email=user.email, password=user.password) 
            return Response(status=status.HTTP_200_OK, data={'message':'User logged in successfully!'})
        else:
            # register and login the user
            username = request.data['username']
            email = request.data['email']
            password = request.data['password']

            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()

            user_login = auth.authenticate(username=username, password=password)
            auth.login(request, user_login)

            user_model = User.objects.get(username=username)
            new_profile = Profile.objects.create(user=user_model, id_user=user_model.id)
            new_profile.save()
            return

    except ValueError:
        return Response(status=status.HTTP_401_UNAUTHORIZED, data={'message': 'Invalid Authorization token given in Headers!'})


                

    
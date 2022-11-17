#from audioop import reverse
import datetime
import json

import jwt
from django.contrib import messages
from django.contrib.auth import authenticate
#from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, auth
from django.http import HttpResponse, JsonResponse
from google.auth.transport import requests
from google.oauth2 import id_token
from rest_framework import status
from rest_framework.decorators import api_view

from .models import Post, Profile, User, NewUser
from .serializers import PostSerializer, ProfileSerializer, NewUserSerializer

# Create your views here.
CLIENT_ID ='549033196869-f3m6urgh42k5rd7kqsdeapc2n1bpdk8p.apps.googleusercontent.com'

@login_required(login_url='login')
@api_view(['GET'])
def profile(request, pk):
    if request.method == 'GET':
        user = NewUser.objects.get(username=pk)
        profile = Profile.objects.get(user=user)
        posts = Post.objects.filter(user=pk)
    

        profile_serializer = ProfileSerializer(profile, many=False)
        posts_serializer = PostSerializer(posts, many=True)
        if profile_serializer.is_valid() and posts_serializer.is_valid():

            profile_serializer.save()
            posts_serializer.save()
            return JsonResponse(profile_serializer.data + posts_serializer.data)
        else:
            return JsonResponse({'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

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
def login_register_google(request):

    body = json.loads(request.body)

    token = str(body['token'])

    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        print(idinfo)

        userid = idinfo['email']
        
        if userid is None:
            return JsonResponse({'message': 'Invalid Google Token'}, status=status.HTTP_400_BAD_REQUEST)

        userid = userid.lower().strip()

        if NewUser.objects.filter(email=userid).exists():
            user = NewUser.objects.get(email=userid)
            serializer = NewUserSerializer(user)
            print(serializer.data)

            # create token for user to login
            token = jwt.encode({
                'id': serializer.data['username'] + serializer.data['email'],
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=365)
            }, 'secret', algorithm='HS256')
            return JsonResponse({"key": str(token), "user": serializer.data}, status=status.HTTP_200_OK)
        else:
            body['email'] = body['email'].lower().strip()

            domain = body['email'].split('@')[1]
            if domain != 'jeknowledge.com':
                return JsonResponse({'message': 'Invalid email domain'}, status=status.HTTP_400_BAD_REQUEST)
            
             # check if the email already exists
            if User.objects.filter(email=body['email']).exists():
                return JsonResponse({'message': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

            serializer = NewUserSerializer(data=body)
            if serializer.is_valid():
                serializer.save()
                token = jwt.encode({
                    'id': serializer.data['username'] + serializer.data['email'],
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(days=365)
                }, 'secret', algorithm='HS256')
                return JsonResponse({"key": str(token)}, status=status.HTTP_200_OK)
            return JsonResponse({serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    except ValueError as e:
        print(e)
        return JsonResponse({'message': 'Invalid Google Token'}, status=status.HTTP_400_BAD_REQUEST)
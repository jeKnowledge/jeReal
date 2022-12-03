#from audioop import reverse
import datetime
import json
from rest_framework.response import Response
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

from .models import Post, Profile, NewUser, Comment
from .serializers import PostSerializer, ProfileSerializer, NewUserSerializer, CommentSerializer

# Create your views here.
CLIENT_ID ='549033196869-f3m6urgh42k5rd7kqsdeapc2n1bpdk8p.apps.googleusercontent.com'

# DONE! iT WORKS!
@api_view(['GET'])
def profile(request, pk):
    if request.method == 'GET':
        user_object = NewUser.objects.get(pk=pk)
        profile = Profile.objects.get(user=user_object)
        print('profile name:', profile.user.username)
        print('profile description:', profile.description)
        print('profile image:', profile.profileImg)
        print('profile data joined:', profile.date_joined)
        posts = Post.objects.filter(user=user_object)

        for post in posts:
            print('post author: ', post.user.username)
            print('post image:', post.image.url)
            print('post description:', post.description)
            print('post date posted:', post.creationTime)



        profile_serializer = ProfileSerializer(profile, many=False)
        posts_serializer = PostSerializer(posts, many=True)
        return JsonResponse({'profile': profile_serializer.data, 'posts': posts_serializer.data}, status=status.HTTP_200_OK)
    else:
        return JsonResponse({'error': 'Error'}, status=status.HTTP_400_BAD_REQUEST)


# view to get all info about a post
# DONE! iT WORKS!
@api_view(['GET'])
def get_post(request, pk):
    if request.method == 'GET':
        post = Post.objects.get(id=pk)
        post_serializer = PostSerializer(post, many=False)
        return JsonResponse(post_serializer.data, status=status.HTTP_200_OK)
    else:
        return JsonResponse({'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


# DONE! iT WORKS!
def get_comments(request, pk):
    if request.method == 'GET':
        comments = Comment.objects.filter(postID=pk)
        serializer = CommentSerializer(comments, many=True)

        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

#@login_required(login_url='login/')
# DONE! iT WORKS!
@api_view(['POST'])
def send_comment(request):
    
    body = json.loads(request.body)
    print("Request data: ", body)

    serializer = CommentSerializer(data=body)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return JsonResponse({'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

#@login_required(login_url='login/')
# DONE! iT WORKS!
def settings(request, pk):
    user_profile = Profile.objects.get(user=pk)
    
    if request.method == 'PUT':
        body = json.loads(request.body)
        # add the user to the body
        body['user'] = pk

        serializer = ProfileSerializer(data=body)
        if serializer.is_valid():
            #update the profile with the new data calling the serializer update method
            serializer.update(user_profile, serializer.validated_data)
            #serializer.save()
            response = JsonResponse({'message':'Profile updated successfully!'}, status=status.HTTP_200_OK)
            print(response)
            return JsonResponse({'message':'Profile updated successfully!'}, status=status.HTTP_200_OK)
        else:
           #print serializer error
            print(serializer.errors)
            return JsonResponse({'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

    return JsonResponse({'message':'Deu merda aqui!'}, status=status.HTTP_400_BAD_REQUEST)


'''
{
    'user': "Guilherme",
    'description': 'Olá malta!', 
    'profileImg': 'file:///var/mobile/Containers/Data/Application/29959E75-44D3-4102-B1AB-ED7588796D08/Library/Caches/ExponentExperienceData/%2540guiffaria%252FFrontend/ImagePicker/B5D73644-6C50-4631-B8A7-2488529FDFE1.jpg'
}
'''

# DONE! iT WORKS!
# -------Login and Register view with Google-----~
@api_view(['POST'])
def login_register_google(request):


    body = json.loads(request.body)

    token = str(body['token'])

    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        print(idinfo)

        userid = idinfo['name']

        print(userid)
        
        if userid is None:
            return JsonResponse({'message': 'Invalid Google Token'}, status=status.HTTP_400_BAD_REQUEST)

        userid = userid.lower().strip()

        # if user already exists

        user1 = NewUser.objects.filter(email=idinfo['email']).exists()
        print(user1)
        if user1:

            print('picture: ', idinfo['picture'])

            user = NewUser.objects.get(email=idinfo['email'])
            user_serializer = NewUserSerializer(user)
            profile = Profile.objects.get(user=user)

            # verify if the current profile picture stored is diferent from the one in the google account
            if profile.profileImg != idinfo['picture']:
                profile.profileImg = idinfo['picture']
                profile.save()
                

            profile_serializer = ProfileSerializer(profile)
            #print(serializer.data)
            user_pk = user.pk
            print('primary key:', user_pk)

            # create token for user to login
            token = jwt.encode({
                'id': user_serializer.data['username'] + user_serializer.data['email'],
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=365)
            }, 'secret', algorithm='HS256')

            return JsonResponse({"key":str(token), "user":{'pk': user_pk,
                                                            'username' : user_serializer.data['username'],
                                                            'email' : user_serializer.data['email'], 
                                                            'profileImg': profile_serializer.data['profileImg'],
                                                            }
                                }, status=status.HTTP_200_OK)

        # if user doesn't exist yet
        else:
            
            #domain = userid.split('@')[1]
            '''
            if domain != 'jeknowledge.com':
                return JsonResponse({'message': 'Invalid email domain'}, status=status.HTTP_400_BAD_REQUEST)
            '''
             # check if the email already exists
            if NewUser.objects.filter(email=userid).exists():
                return JsonResponse({'message': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

            user = NewUser.objects.create(username=idinfo['given_name'], email=idinfo['email'])
            user.save()

            print('picture: ', idinfo['picture'])

            user_model = NewUser.objects.get(username=idinfo['given_name'])
            new_profile = Profile.objects.create(user=user_model,profileImg=idinfo['picture'])
            new_profile.save()
            #get user´s pk
            

            userSerializer = NewUserSerializer(user_model)
            profileSerializer = ProfileSerializer(new_profile)

            token = jwt.encode({
                'id': userSerializer.data['username'] + userSerializer.data['email'],
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=365)
            }, 'secret', algorithm='HS256')

            return JsonResponse({"key": str(token), "user": {'pk': user_model.pk,
                                                            "username": userSerializer.data['username'],
                                                            "email": userSerializer.data['email'],
                                                            "profileImg": profileSerializer.data['profileImg'],     
                                                            }
                                }, status=status.HTTP_200_OK)

    except ValueError as e:
        print(e)
        return JsonResponse({'message': 'Invalid Google Token'}, status=status.HTTP_400_BAD_REQUEST)
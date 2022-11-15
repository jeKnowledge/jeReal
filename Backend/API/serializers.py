from rest_framework import serializers
from .models import User, Profile, Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

        def create(self, validated_data):
            user = User(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password']
            )
            user.save()
            return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('user', 'description', 'profileImg', 'joined')

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('user', 'image', 'description')
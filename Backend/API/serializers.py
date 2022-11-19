from rest_framework import serializers
from .models import NewUser, Profile, Post, Comment

class NewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ('id_token', 'username', 'email', 'password')

        def create(self, validated_data):
            user = NewUser(
                id_token = validated_data['id_token'],
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

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('userID', 'postID', 'comment')
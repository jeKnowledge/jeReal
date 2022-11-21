from rest_framework import serializers
from .models import NewUser, Profile, Post, Comment
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views.generic import DeleteView, CreateView

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

class NewPostSerializer(CreateView, serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('user', 'image', 'description')

        def form_valid(self, form):
            form.instance.user = self.request.user
            return super().form_valid(form)


class DeletePostSerializer(LoginRequiredMixin, UserPassesTestMixin, DeleteView,  serializers.ModelSerializer):
    class Meta:
        model = Post

        def test_func(self):
            post = self.get_object()
            if self.request.user == post.author:
                return True
            return False


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('userID', 'postID', 'comment')
from django.shortcuts import render
from .models import Post

posts = [
    {
        'autor': 'João Santos',
        'foto': 'Teste de foto',
        'comentário': 'Grande paisagem',
        'data': '2d ago'
    },
    {
        'autor': 'Carlos Alberto',
        'foto': 'Teste de foto 2',
        'comentário': 'Bonita flor',
        'data': '3d ago'
    }
]

def home(request):
    feed = {
        'feed': posts
    }
    return render(request, 'API/home.html', feed)

def makepost(request):
    return render(request, 'API/post.html', {'title': 'Post'} )


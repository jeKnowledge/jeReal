#from django.conf.urls import url
from django.urls import path, include
from . import views

urlpatterns = [
    # escrever os paths para as pages aqui

    #Test views
    path( 'signup/', views.register, name='register'),
    path( 'login/', views.login, name='login'),

    #App views
    path( 'profile/<str:pk>/', views.profile, name='profile'),
    path( 'settings/', views.settings, name='settings'),
]
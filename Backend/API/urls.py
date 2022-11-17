#from django.conf.urls import url
from django.urls import path, include
from . import views

urlpatterns = [
    # escrever os paths para as pages aqui

    #Test views
    path( 'signup/', views.register, name='register'),
    path( 'login/', views.login, name='login'),

    #App views
    path( 'login_register_google/', views.login_register_google, name='login_register_google'),
    path( 'profile/<str:pk>/', views.profile, name='profile'),
    path( 'get_comments/<int:pk>/', views.get_comments, name='get_comments'),
    path( 'settings/', views.settings, name='settings'),
]
#from django.conf.urls import url
from django.urls import path, include
from . import views

urlpatterns = [
    # escrever os paths para as pages aqui

    #Test views


    #App views
    path( 'login_register_google/', views.login_register_google, name='login_register_google'),
    path( 'profile/<int:pk>/', views.profile, name='profile'),
    path( 'get_post/<int:pk>/', views.get_post, name='get_post'),
    path( 'get_comments/<int:pk>/', views.get_comments, name='get_comments'),
    path( 'settings/<str:pk>/', views.settings, name='settings'),
    path( 'send_comment/', views.send_comment, name='send_comment'),
]
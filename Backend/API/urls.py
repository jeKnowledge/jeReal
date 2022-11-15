from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='jeReal-Home'),
    path('makepost/', views.makepost, name='jeReal-MakePost'),

]
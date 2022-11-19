from django.urls import path
from . import views

# test views
urlpatterns = [
    path('', views.home, name='API-Home'),
    path('makepost/', views.makepost, name='API-MakePost'),

]
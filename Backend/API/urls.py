from django.urls import path
from . import views
from .views import PostDetailView

# test views
urlpatterns = [
    path('', views.home, name='home-page'),
    path('post/<int:pk>/', views.post, name='post-detail'),
    path('post/<int:pk>/delete/', views.delete, name='post-delete'),
    path('makepost/', views.makepost, name='make-post'),

]
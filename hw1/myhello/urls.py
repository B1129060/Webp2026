from django.urls import path
from . import views


urlpatterns = [
    path('addcourse', views.addcourse, name='addcourse'),
    path('courselist', views.courselist, name='courselist'),
]
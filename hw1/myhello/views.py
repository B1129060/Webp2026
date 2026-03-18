from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.core.serializers.json import DjangoJSONEncoder
import json
import logging

from .models import Post

logger = logging.getLogger('django')

# Create your views here.
def myIndex(request):
    my_name = request.GET.get('name', "CGU")
    return HttpResponse("Hello " + my_name)



@api_view(['GET'])
def myhello_api(request): 
    my_name = request.GET.get('name', None)
    logger.debug(" ************** myhello_api: %s", my_name)
    if my_name: 
        return Response({"data": "Hello" + my_name}, status = status.HTTP_200_OK)
    else: 
        return Response(
            {"res": "parameter: name is None"},
            status=status.HTTP_400_BAD_REQUEST
        )
        
@api_view(['GET'])
def addcourse(request):
    Department = request.GET.get('Department', '')
    CourseTitle = request.GET.get('CourseTitle', '')
    Instructor = request.GET.get('Instructor', '')
    
    
    new_post = Post()
    new_post.Department = Department
    new_post.CourseTitle = CourseTitle
    new_post.Instructor = Instructor
    
    new_post.save()
    logger.debug(" ************** add_post: %s", CourseTitle)
    if CourseTitle:
        return Response({"data": CourseTitle + " insert!"}, status = status.HTTP_200_OK)
    else:
        return Response(
            {"res": "parameter: name is None"},
            status = status.HTTP_400_BAD_REQUEST
        )
    

@api_view(['GET'])
def courselist(request):
    posts = Post.objects.all().values()
    return JsonResponse(list(posts), safe = False)
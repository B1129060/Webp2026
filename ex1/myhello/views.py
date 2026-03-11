from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
import logging


# Create your views here.
def myIndex(request):
    my_name = request.GET.get('name', "CGU")
    return HttpResponse("Hello " + my_name)

logger = logging.getLogger('django')

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
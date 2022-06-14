from django.urls import path, include
from .views import *

app_name = 'Stock'


urlpatterns = [
    path('home/', home, name='home'),
    path('<name>/quote/', quote_by_name, name='quote_by_name')
]

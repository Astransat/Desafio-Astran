from django.urls import path, include
from .views import *

app_name = 'Stock'


urlpatterns = [
    path('home/', home, name='home'),
    path('<name>/quote/', form_price, name="form_price"),
    path('form/', form_price, name='form_price'),
    path('formH/', form_history, name='form_history'),
    path('formC/', form_compare, name='form_compare')
]

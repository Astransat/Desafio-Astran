from django.shortcuts import render
from django.http import JsonResponse
from Stock.models import StockService


def home(request):
    result = StockService.get_prices_by_history("PETR4.SA", "2008-03-04", "2008-03-06")
    return render(request, 'index.html', result)


def quote_by_name(request, name):
    response = StockService.get_stock_by_name(name)
    return print(JsonResponse(response))

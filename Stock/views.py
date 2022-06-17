from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from Stock.models import StockService
from Stock.forms import *


def home(request):
    return render(request, 'index.html')


def form_price(request):
    form = FormPrice(request.POST or None)
    if form.is_valid():
        result = StockService.get_stock_by_name(form.cleaned_data['name'])
        print(result)
        return render(request, 'formPrice.html', result)
    context = {'form': form}
    return render(request, 'formPrice.html', context)


def form_history(request):
    form = FormHistory(request.POST or None)
    if form.is_valid():
        data = form.cleaned_data
        result = StockService.get_prices_by_history(data['name'], data['start'], data['end'])
        print(result)
        return render(request, 'formHistory.html', result)
    context = {'form': form}
    return render(request, 'formHistory.html', context)


def form_compare(request):
    form = FormCompare(request.POST or None)
    if form.is_valid():
        data = form.cleaned_data
        result = StockService.get_stocks_compared(data['name'], data['names'].split(' '))
        print(result)
        return render(request, 'formCompare.html', {'prices': result})
    context = {'form': form}
    return render(request, 'formCompare.html', context)


def form_gains(request):
    pass


def quote_by_name(request, name):
    response = StockService.get_stock_by_name(name)
    return JsonResponse(response)

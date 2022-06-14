from django.db import models
from django.conf import settings
from datetime import datetime
import requests

API_KEY = '9YYCHLACTZ9A6CGK'


class StockService:

    @staticmethod
    def get_stock_by_name(name):
        url = f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey={API_KEY}' % name
        response = requests.get(url)
        body = response.json()["Global Quote"]
        if response.status_code != 200 or body == {}:
            return None
        return {'name': body["01. symbol"], 'lastPrice': body["05. price"], "priceAt": body["07. latest trading day"]}

    @staticmethod
    def get_prices_by_history(name, start, end):
        url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=%s&outputsize=full&apikey=9YYCHLACTZ9A6CGK' % name
        response = requests.get(url)
        body = response.json()

        if response.status_code != 200 or body == {}:
            return None

        startDate = to_date_time(start)
        endDate = to_date_time(end)

        prices = []
        for k, v in body["Time Series (Daily)"].items():
            currentDate = to_date_time(k)
            if currentDate >= startDate and currentDate <= endDate:
                prices.append(v)

        return {"name": name, "prices": prices}


def to_date_time(str_date):
    return datetime.strptime(str_date, "%Y-%m-%d")

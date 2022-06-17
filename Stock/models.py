from django.db import models
from django.conf import settings
from project.settings import API_KEY
from datetime import datetime
import requests


class StockService:

    @staticmethod
    def get_stock_by_name(name):
        url = f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey={API_KEY}' % name
        response = requests.get(url)
        body = response.json()["Global Quote"]

        if not response_is_valid(response): return None

        try:
            result = {'name': body["01. symbol"], 'lastPrice': body["05. price"],
                      "priceAt": body["07. latest trading day"]}
        except KeyError:
            result = {'message': f'Não conseguimos encontrar uma cotação com este nome {name}.'}

        return result

    @staticmethod
    def get_prices_by_history(name, start, end):
        url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=%s&outputsize=full&apikey={API_KEY}' % name
        response = requests.get(url)

        if not response_is_valid(response): return None

        try:
            startDate = to_datetime(start)
            endDate = to_datetime(end)

            prices = []
            for k, v in response.json()["Time Series (Daily)"].items():
                currentDate = to_datetime(k)
                if currentDate >= startDate and currentDate <= endDate:
                    prices.append(
                        {
                            "opening": to_number(v["1. open"]),
                            "low": to_number(v["3. low"]),
                            "high": to_number(v["2. high"]),
                            "closing": to_number(v["4. close"]),
                            "priceAt": k
                        }
                    )

            result = {"name": name, "prices": prices}
        except Exception:
            result = {'message': "Não foi possível realizar esta ação. Verifique o valor de entrada."}

        return result

    @staticmethod
    def get_stocks_compared(main_stock, stocks):
        stocksName = [main_stock, *stocks]
        result = []

        for name in stocksName:
            url = f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey={API_KEY}' % name
            response = requests.get(url)

            if not response_is_valid(response): return None

            body = response.json()["Global Quote"]
            result.append(
                {
                    "name": body["01. symbol"],
                    "price": to_number(body["05. price"]),
                    "pricedAt": body["07. latest trading day"]
                }
            )

        return result

    @staticmethod
    def get_stock_by_gains():
        pass


def response_is_valid(response):
    return False if response.status_code != 200 or response.json() == {} else True


def to_datetime(str_date):
    return datetime.strptime(str_date, "%Y-%m-%d")


def clean_price(price):
    return price.replace(".", "")


def to_number(str):
    return int(clean_price(str))

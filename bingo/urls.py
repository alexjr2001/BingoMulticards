from django.urls import path
from .views import bingo_view, marcar_numero, quitar_numero

urlpatterns = [
    path("", bingo_view, name="bingo"),
    path("marcar-numero/", marcar_numero, name="marcar_numero"),
    path("quitar-numero/", quitar_numero, name="quitar_numero"),
]

import csv
import os
from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse

cartillas=[]


def leer_cartillas():
    ruta_csv = os.path.join(settings.BASE_DIR, "bingo/static/cartillas.csv")
    cartillas = []
    
    with open(ruta_csv, newline='', encoding='utf-8') as archivo:
        lector_csv = csv.reader(archivo)
        cartilla_actual = []
        numero_cartilla = None
        nombre = None

        for fila in lector_csv:
            if not fila:  # Si la fila está vacía, termina una cartilla
                if cartilla_actual:
                    cartillas.append({
                        "numero": numero_cartilla,
                        "nombre": nombre,
                        "cartilla": cartilla_actual
                    })
                    cartilla_actual = []
            elif fila[0] == "B":  # Encabezado de la cartilla (se ignora)
                continue
            elif len(fila) == 2:  # Si la fila tiene dos elementos, es número y nombre
                numero_cartilla, nombre = fila
            else:  # Es una fila de la cartilla
                cartilla_actual.append(fila)

        # Agregar la última cartilla si no se agregó
        if cartilla_actual:
            cartillas.append({
                "numero": numero_cartilla,
                "nombre": nombre,
                "cartilla": cartilla_actual
            })

    return cartillas


def bingo_view(request):
    global cartillas
    if not cartillas:  # Si aún no se ha cargado, leer el CSV
        cartillas = leer_cartillas()
    return render(request, "bingo/bingo.html", {"cartillas": cartillas})

# Marcar número en las cartillas
def marcar_numero(request):
    global cartillas
    numero = request.GET.get("numero")

    if not numero:
        return JsonResponse({"error": "Número no proporcionado"})

    for cartilla in cartillas:
        for fila in range(5):
            for col in range(5):
                if str(cartilla["cartilla"][fila][col]) == numero:
                    cartilla["cartilla"][fila][col] = f"✅{numero}"

    return JsonResponse({"cartillas": cartillas})  # Enviar cartillas actualizadas


def quitar_numero(request):
    global cartillas
    numero = request.GET.get("numero")

    if not numero:
        return JsonResponse({"error": "Número no proporcionado"})

    for cartilla in cartillas:
        for fila in cartilla["cartilla"]:
            for i in range(len(fila)):
                if isinstance(fila[i], str) and fila[i].startswith("✅") and fila[i].endswith(str(numero)):
                    fila[i] = fila[i].replace("✅", "").strip()

    return JsonResponse({"cartillas": cartillas})

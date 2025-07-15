document.getElementById("numero").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("marcarBtn").click();
    }
});



let numerosMarcados = new Set();


function marcarNumero() {
    let numero = document.getElementById("numero").value;

    $.ajax({
        url: "/marcar-numero/",
        type: "GET",
        data: { numero: numero },
        success: function(response) {
            let cartillasHTML = "";
            response.cartillas.forEach(cartilla => {
                cartillasHTML += `<table>
                    <tr><th class="infoCartilla" colspan="5">Cartilla ${cartilla.numero} - ${cartilla.nombre}</th></tr>
                    <tr><th>B</th><th>I</th><th>N</th><th>G</th><th>O</th></tr>`;

                cartilla.cartilla.forEach(fila => {
                    cartillasHTML += "<tr>";
                    fila.forEach(num => {
                        let clase = num.includes("✅") ? "marcada" : "";
                        cartillasHTML += `<td class="casilla ${clase}">${num}</td>`;
                    });
                    cartillasHTML += "</tr>";
                });

                cartillasHTML += "</table>";
            });
            numerosMarcados.add(numero);
            actualizarListaNumeros();
            document.getElementById("cartillas").innerHTML = cartillasHTML;
        }
    });
}

function quitarNumero() {
    let numero = document.getElementById("numero").value;

    $.ajax({
        url: "/quitar-numero/",
        type: "GET",
        data: { numero: numero },
        success: function(response) {
            let cartillasHTML = "";
            response.cartillas.forEach(cartilla => {
                cartillasHTML += `<table>
                    <tr><th colspan="5">Cartilla ${cartilla.numero} - ${cartilla.nombre}</th></tr>
                    <tr><th>B</th><th>I</th><th>N</th><th>G</th><th>O</th></tr>`;

                cartilla.cartilla.forEach(fila => {
                    cartillasHTML += "<tr>";
                    fila.forEach(num => {
                        let clase = num.includes("✅") ? "marcada" : "";
                        cartillasHTML += `<td class="casilla ${clase}">${num}</td>`;
                    });
                    cartillasHTML += "</tr>";
                });

                cartillasHTML += "</table>";
            });
            numerosMarcados.delete(numero);
            actualizarListaNumeros();
            document.getElementById("cartillas").innerHTML = cartillasHTML;
        }
    });
}

function actualizarListaNumeros() {
    let listaHTML = "";
    numerosMarcados.forEach(num => {
        listaHTML += `<div>${num},</div>`;
    });
    document.getElementById("numerosMarcados").innerHTML = listaHTML;
}
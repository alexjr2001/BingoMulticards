function marcarNumero() {
    let numero = document.getElementById("numero").value;

    $.ajax({
        url: "/marcar-numero/",
        type: "GET",
        data: { numero: numero },
        success: function(response) {
            // Reemplaza el contenido de las cartillas con el nuevo HTML
            let cartillasHTML = "";
            response.cartillas.forEach(cartilla => {
                cartillasHTML += "<table><tr><th>B</th><th>I</th><th>N</th><th>G</th><th>O</th></tr>";
                cartilla.forEach(fila => {
                    cartillasHTML += "<tr>";
                    fila.forEach(num => {
                        // Agrega clase 'marcada' si el número contiene "✅"
                        let clase = num.includes("✅") ? "marcada" : "";
                        cartillasHTML += `<td class="casilla ${clase}">${num}</td>`;
                    });
                    cartillasHTML += "</tr>";
                });
                cartillasHTML += "</table>";
            });

            document.getElementById("cartillas").innerHTML = cartillasHTML;
        }
    });
}
function quitarNumero(){
    let numero = document.getElementById("numero").value;
    $.ajax({
        url: "/quitar-numero/",
        type: "GET",
        data: { numero: numero },
        success: function(response) {
            let cartillasHTML = "";
            response.cartillas.forEach(cartilla => {
                cartillasHTML += "<table><tr><th>B</th><th>I</th><th>N</th><th>G</th><th>O</th></tr>";
                cartilla.forEach(fila => {
                    cartillasHTML += "<tr>";
                    fila.forEach(num => {
                        let clase = num.includes("✅") ? "marcada" : "";
                        cartillasHTML += `<td class="casilla ${clase}">${num}</td>`;
                    });
                    cartillasHTML += "</tr>";
                });
                cartillasHTML += "</table>";
            });

            document.getElementById("cartillas").innerHTML = cartillasHTML;
        }
    });
}
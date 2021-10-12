let tbody = document.getElementById("tbody");
//Se añade la tabla entera a la etiqueta body
let equipoLocal;
let resultado;
let resultadoProvisional;
let equipoVisitante;
let fecha;
let finalizado;

function crearTabla() {

    for (let i = 0; i < data.matches.length; i++) {
        let row = document.createElement("tr"); //Creo la fila
        tbody.appendChild(row); // Decimos que la fila es hija del tbody.
        equipoLocal = document.createElement("td");
        equipoLocal.innerHTML = data.matches[i].homeTeam.name;

        resultado = document.createElement("td");
        resultadoProvisional = eliminarNull(`${data.matches[i].score.fullTime.homeTeam} - ${data.matches[i].score.fullTime.awayTeam}`);
        resultado.innerHTML = resultadoProvisional;
        equipoVisitante = document.createElement("td");
        equipoVisitante.innerHTML = data.matches[i].awayTeam.name;
        fecha = document.createElement("td");
        let fechaCompleta = data.matches[i].utcDate;
        fecha.innerHTML = fechaCompleta.substring(0, 10);
        finalizado = document.createElement("td");
        finalizado.innerHTML = cambiarFinalizado(data.matches[i].status);

        row.appendChild(equipoLocal);
        row.appendChild(resultado);
        row.appendChild(equipoVisitante);
        row.appendChild(fecha);
        row.appendChild(finalizado);
    }
}

crearTabla();

//Esto funciona, no borrar
function mostrarEquipoLocal() {
    for (let i = 0; i < data.matches.length; i++) {
        let row = document.createElement("tr"); //Creo la fila
        let equipoLocal = document.createElement("td");
        tbody.appendChild(row);
        equipoLocal.innerHTML = data.matches[i].homeTeam.name;
        row.appendChild(equipoLocal);
    }
}

function cambiarFinalizado(valor) {
    let aplazado = "aplazado";
    let finalizado = "finalizado";
    let programado = "programado";

    switch (valor) {
        case "FINISHED":
            return "finalizado";
        case "POSTPONED":
            return "aplazado";
        case "SCHEDULED":
            return "programado";
    }
}

function eliminarNull(cadena) {
    if (cadena == "null - null") {
        return "Por Jugar";
    } else {
        return cadena;
    }
}
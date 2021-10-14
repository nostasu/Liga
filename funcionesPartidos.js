let tbody = document.getElementById("tbody");
//Se añade la tabla entera a la etiqueta body
//quitar las variables globales.

console.log(data);


function crearTabla(data) {
    let equipoLocal, resultado, resultadoProvisional, equipoVisitante, fecha, finalizado, row, fechaCompleta, imgLocal, imgVisitante;

    for (let i = 0; i < data.matches.length; i++) {
        row = document.createElement("tr"); //Creo la fila
        tbody.appendChild(row); // Decimos que la fila es hija del tbody.
        equipoLocal = document.createElement("td");
        equipoLocal.textContent = data.matches[i].homeTeam.name;
        resultado = document.createElement("td");
        resultadoProvisional = eliminarNull(`${data.matches[i].score.fullTime.homeTeam} - ${data.matches[i].score.fullTime.awayTeam}`);
        //hemos eliminado el null- pero a pesar de todo queremos agregar la imagen del equipo igual.
        //Equipo + resultado prov + equipo (necesitamos sacar la id)
        //resultado.innerHTML = `<img src="https://crests.football-data.org/${data.matches[i].homeTeam.id}.svg"/> ${resultadoProvisional} <img src="https://crests.football-data.org/${data.matches[i].awayTeam.id}.svg"/>`;
        imgLocal = document.createElement("td");
        imgVisitante = document.createElement("td");
        imgLocal.innerHTML = `<img src="https://crests.football-data.org/${data.matches[i].homeTeam.id}.svg"/>`
        resultado.innerHTML = resultadoProvisional;
        imgVisitante.innerHTML = `<img src="https://crests.football-data.org/${data.matches[i].awayTeam.id}.svg"/>`
        equipoVisitante = document.createElement("td");
        equipoVisitante.innerHTML = data.matches[i].awayTeam.name;
        fecha = document.createElement("td");
        fechaCompleta = data.matches[i].utcDate;
        fecha.innerHTML = fechaCompleta.substring(0, 10);
        finalizado = document.createElement("td");
        finalizado.innerHTML = cambiarFinalizado(data.matches[i].status);

        row.append(equipoLocal, imgLocal, resultado, imgVisitante, equipoVisitante, fecha, finalizado);
    }
}

crearTabla(data);

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
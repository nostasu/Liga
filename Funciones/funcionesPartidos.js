let tbody = document.getElementById("tbodyP");

// Con submit, llamamos a eta funcion para seleccionar por equipo y modalidad (ganados, perdidos..).
function activarBoton(data) {
    let elementosSelect = document.getElementById("elegirEquipo");
    let indiceSeleccionado = elementosSelect.selectedIndex;
    let equipoSeleccionado = elementosSelect[indiceSeleccionado].text;
    let opcion;
    var opciones = document.getElementsByName("exampleRadios");

    for (var i = 0; i < opciones.length; i++) {
        if (opciones[i].checked == true) {
            opcion = opciones[i].id;
        }
    }
    crearArrayPorEquipo(equipoSeleccionado, opcion, data);
}

/*
Funcion para crear la tabla dependiendo del array que le pasemos.
Le pasamos el array de todos los partidos o bien el array filtrado.
*/
function crearTabla(data) {
    let equipoLocal, resultado, resultadoProvisional, equipoVisitante, fecha, finalizado, fechaCompleta, imgLocal, imgVisitante;
    for (let i = 0; i < data.length; i++) {
        let row1 = document.createElement("tr");
        tbody.appendChild(row1);
        if (i == 0) {
            let celdaJornada = document.createElement("td");
            celdaJornada.setAttribute("colspan", "7");
            celdaJornada.innerHTML = `Jornada ${data[i].matchday}`
            row1.append(celdaJornada);
        } else if (data[i].matchday != data[i - 1].matchday) {
            let celdaJornada = document.createElement("td");
            celdaJornada.setAttribute("colspan", "7");
            celdaJornada.innerHTML = `Jornada ${data[i].matchday}`
            row1.append(celdaJornada);
        }

        let row2 = document.createElement("tr");
        tbody.appendChild(row2);
        equipoLocal = document.createElement("td");
        equipoLocal.textContent = data[i].homeTeam.name;
        resultado = document.createElement("td");
        resultadoProvisional = eliminarNull(`${data[i].score.fullTime.homeTeam} - ${data[i].score.fullTime.awayTeam}`);
        imgLocal = document.createElement("td");
        imgVisitante = document.createElement("td");
        imgLocal.innerHTML = `<img src="https://crests.football-data.org/${data[i].homeTeam.id}.svg"/>`
        resultado.innerHTML = resultadoProvisional;
        imgVisitante.innerHTML = `<img src="https://crests.football-data.org/${data[i].awayTeam.id}.svg"/>`
        equipoVisitante = document.createElement("td");
        equipoVisitante.innerHTML = data[i].awayTeam.name;
        fecha = document.createElement("td");
        fechaCompleta = data[i].utcDate;
        fecha.innerHTML = fechaCompleta.substring(0, 10);
        finalizado = document.createElement("td");
        finalizado.innerHTML = cambiarFinalizado(data[i].status);

        if (data[i].score.fullTime.homeTeam > data[i].score.fullTime.awayTeam) {
            equipoLocal.setAttribute("style", "font-weight:bold");
        }
        else if (data[i].score.fullTime.awayTeam > data[i].score.fullTime.homeTeam) {
            equipoVisitante.setAttribute("style", "font-weight:bold");
        }
        row2.append(equipoLocal, imgLocal, resultado, imgVisitante, equipoVisitante, fecha, finalizado);
    }
}

//Funcion para modificar el finished, SCHEDULED, paused, etc
function cambiarFinalizado(valor) {

    switch (valor) {
        case "FINISHED":
            return "finalizado";
        case "POSTPONED":
            return "aplazado";
        case "SCHEDULED":
            return "programado";
        case "PAUSED":
            return "descanso";
        case "IN_PLAY":
            return "en juego";
    }
}

function eliminarNull(cadena) {
    if (cadena == "null - null") {
        return "Por Jugar";
    } else {
        return cadena;
    }
}

//Se crea un array solo con los nommbres de los equipos para imprimirlos.
function crearArrayPequeño(data) {

    let nombres = data.map(partido => {
        return partido.homeTeam.name;
    });

    let nombresEquipos = new Set(nombres);
    nombresEquipos = Array.from(nombresEquipos);
    nombresEquipos.sort();
    crearOpcionesSelect(nombresEquipos);
}

/* funcion que rellena el select para darle la opcion al usuario de seleccionar el equipo */
function crearOpcionesSelect(nombresEquipos) {
    let select = document.getElementById("elegirEquipo");

    for (let i = 0; i < nombresEquipos.length; i++) {
        let option = document.createElement("option");
        let nombreEquipo = nombresEquipos[i];
        option.setAttribute("value", "nombreEquipo");
        let optionTexto = document.createTextNode(nombreEquipo);
        option.appendChild(optionTexto);
        select.appendChild(option);
    }
}

//esta funcion llama a la funcion filtros, a mostrarAlerta y a creartabla y se elabora la tabla de acuerdo al filtro escogido.
function crearArrayPorEquipo(equipoSeleccionado, opcion, partidos) {
    let filtrado = [];
    let arrayEquipoSeleccionado = partidos.filter(partido => {
        if (partido.awayTeam.name == equipoSeleccionado) {
            return partido;
        } else if (partido.homeTeam.name == equipoSeleccionado) {
            return partido;
        }
    });

    filtrado = filtros(arrayEquipoSeleccionado, opcion, filtrado, equipoSeleccionado);
    //Añadimos filtrado al objeto.
    document.getElementById("tbodyP").innerHTML = '';
    crearTabla(filtrado);
    mostrarAlerta(filtrado, opcion, equipoSeleccionado, arrayEquipoSeleccionado);

}

/*
* Esta funcion nos devuelve un array filtrado por Un equipo con la opcion seleccionada, pj, perdidos.
* @param arrayEquipoSeleccionado es el array ya filtrado con el equipo seleccionado.
*/
function filtros(arrayEquipoSeleccionado, opcion, filtrado, equipoSeleccionado) {
    if (opcion == "proximos") {
        filtrado = arrayEquipoSeleccionado.filter(partido => partido.status != "FINISHED");
    } else {
        let finalizados = arrayEquipoSeleccionado.filter(partido => partido.status == "FINISHED");

        switch (opcion) {
            case "empatado":
                filtrado = finalizados.filter(partido => partido.score.winner == "DRAW");
                break;
            case "ganado":
                filtrado = finalizados.filter(partido => {
                    if ((equipoSeleccionado == partido.homeTeam.name && partido.score.winner == "HOME_TEAM") ||
                        (equipoSeleccionado == partido.awayTeam.name && partido.score.winner == "AWAY_TEAM")) {
                        return true;
                    } return false;
                });
                break;
            case "perdido":
                filtrado = finalizados.filter(partido => {
                    if ((equipoSeleccionado == partido.homeTeam.name && partido.score.winner == "AWAY_TEAM") ||
                        (equipoSeleccionado == partido.awayTeam.name && partido.score.winner == "HOME_TEAM")) {
                        return true;
                    } return false;
                });
                break;
            default:
                break;
        }
    }
    return filtrado;
}

/*
* En caso de que el usuario marque alguna opcion incorrecta, muestra un mensaje para informar de su error.
*/
function mostrarAlerta(array, opcion, equipoSeleccionado, arrayEquipoSeleccionado) {
    let alerta = document.getElementById("alerta");
    document.getElementById("alerta").classList.remove("d-none");

    if (equipoSeleccionado == "Selecciona el equipo") {
        alerta.innerHTML = `¡Debe seleccionar un equipo!`;
        if (opcion != undefined) {
            var opciones = document.getElementsByName("exampleRadios");
            for (var i = 0; i < opciones.length; i++) {
                if (opciones[i].checked == true) {
                    opciones[i].checked = false;
                    alerta.innerHTML = "El filtro no funciona sin equipo seleccionado";
                    return 0;
                }
            }
        }
    } else if (equipoSeleccionado != undefined) {
        if (opcion == undefined) {
            document.getElementById("alerta").classList.add("d-none");
            crearTabla(arrayEquipoSeleccionado);
        }
        if (array.length == 0) {
            alerta.innerHTML = `No se han encontrado partidos para el equipo ${equipoSeleccionado} con el filtro ${opcion}`;
        } else {
            document.getElementById("alerta").classList.add("d-none");
        }
    }
}

let tbody = document.getElementById("tbodyP");
let boton = document.getElementById("buton");
let reiniciar = document.getElementById("reiniciar");
let cambioEquipo = document.getElementById("elegirEquipo");
//Se añade la tabla entera a la etiqueta body

console.log(data);
crearTabla(data);
crearArrayPequeño(data);

boton.addEventListener("click", function () {

    let elementosSelect = document.getElementById("elegirEquipo");
    let indiceSeleccionado = elementosSelect.selectedIndex;  //seleccionamos el index
    let equipoSeleccionado = elementosSelect[indiceSeleccionado].text; //obtenemos el texto.

    let opcion;
    var opciones = document.getElementsByName("exampleRadios");
    //obtiene los elementos, los devuelve en un "array"

    for (var i = 0; i < opciones.length; i++) {
        if (opciones[i].checked == true) {
            opcion = opciones[i].id;  //el que este marcado, sera la opcion escogida.
        }
    }

    crearArrayPorEquipo(equipoSeleccionado, opcion);
});

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

//Aqui empiezan los filtros

//Se crea un array solo con los nommbres de los equipos para imprimirlos.
function crearArrayPequeño(data) {
    let nombresEquipos = [];
    for (let i = 0; i < data.matches.length; i++) {
        let name = data.matches[i].awayTeam.name;
        if (!nombresEquipos.includes(name)) {
            nombresEquipos.push(name);
        }
    }

    //Tambien quiero que se ordenen por nombre.
    nombresEquipos.sort();
    console.log(nombresEquipos);
    crearOpcionesSelect(nombresEquipos);
}

function crearOpcionesSelect(nombresEquipos) {
    let select = document.getElementById("elegirEquipo");

    for (let i = 0; i < nombresEquipos.length; i++) {
        let option = document.createElement("option");
        let nombreEquipo = nombresEquipos[i];
        option.setAttribute("value", "nombreEquipo");

        let optionTexto = document.createTextNode(nombreEquipo); //Aqui tengo que meter el id de la tabla
        option.appendChild(optionTexto);

        select.appendChild(option);
    }
}

function crearArrayPorEquipo(equipoSeleccionado, opcion) {
    //opcion = ganado, perdido, empatado.
    let filtrado = [];

    //Lo meto en un objeto para que asi pueda reutilizar el código de crearTabla.
    let equipo = {
        matches: filtrado
    }

    //Recorremos el array para sacar TODOS los partidos del equipo.
    let arrayEquipoSeleccionado = data.matches.filter(partido => {
        if (partido.awayTeam.name == equipoSeleccionado) {
            return partido;
        } else if (partido.homeTeam.name == equipoSeleccionado) {
            return partido;
        }
    });

    //ya tenemos el array solo del equipo. Ahora la opcion que haya indicado: 
    //finalizados [ganado, perdido, empatado] o bien proximos.
    console.log(arrayEquipoSeleccionado);
    filtrado = filtrarPorOpcion(arrayEquipoSeleccionado, opcion, filtrado, equipoSeleccionado);
    //Añadimos filtado al objeto.
    console.log(filtrado);
    equipo.matches = filtrado;
    document.getElementById("tbodyP").innerHTML = ''; //Borramos todo lo que esta en la pagina web4    
    crearTabla(equipo);
    mostrarAlerta(filtrado, opcion, equipoSeleccionado, arrayEquipoSeleccionado);

}


function filtrarPorOpcion(arrayEquipoSeleccionado, opcion, filtrado, equipoSeleccionado) {
    if (opcion == "proximos") {
        filtrado = arrayEquipoSeleccionado.filter(partido => partido.status != "FINISHED");
    } else {
        let finalizados = arrayEquipoSeleccionado.filter(partido => partido.status == "FINISHED");
        //El array finalizados solo tiene los partidos del equipo que ya se han acabado, 
        //preparado para seleccionar los empatados, ganados, perdidos. 
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
        //Tengo un equipo 
        if (opcion == undefined) {
            //Mostramos todos los partidos del equipo y return 0 para que salga.
            let equipo = {
                matches: arrayEquipoSeleccionado
            }
            document.getElementById("alerta").classList.add("d-none");
            equipo.matches = arrayEquipoSeleccionado;
            crearTabla(equipo);
        }
        if (array.length == 0) {
            alerta.innerHTML = `No se han encontrado partidos para el equipo ${equipoSeleccionado} con el filtro ${opcion}`;
        } else {
            document.getElementById("alerta").classList.add("d-none");
        }
    }
}

function funcion_reiniciar() {
    document.getElementById("tbodyP").innerHTML = '';
    crearTabla(data);
}
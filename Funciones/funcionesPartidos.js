let tbody = document.getElementById("tbodyP");
let boton = document.getElementById("buton");
let reiniciar = document.getElementById("reiniciar");
let cambioEquipo = document.getElementById("elegirEquipo");
//Se añade la tabla entera a la etiqueta body

crearTabla(data.matches); //Crea el array de todos los partidos sin filtrar.
crearArrayPequeño(data.matches);

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

//Funcion para crear la tabla dependiendo del array que le pasemos.
function crearTabla(data) {
    let equipoLocal, resultado, resultadoProvisional, equipoVisitante, fecha, finalizado, fechaCompleta, imgLocal, imgVisitante;
    for (let i = 0; i < data.length; i++) {
        let row1 = document.createElement("tr"); //Creo la fila
        tbody.appendChild(row1); // Decimos que la fila es hija del tbody.
        //Para escribir el tr de jornadas.
        if (i == 0) {  //con i = 0 imprimimos jornada 1
            // jornada = 1;
            let celdaJornada = document.createElement("td");
            celdaJornada.setAttribute("colspan", "7");
            celdaJornada.innerHTML = `Jornada ${data[i].matchday}`
            row1.append(celdaJornada);
        } else if (data[i].matchday != data[i - 1].matchday) { //Si la jornada es distinta de 1... comprobamos cuando cambia
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
        //hemos eliminado el null- pero a pesar de todo queremos agregar la imagen del equipo igual.
        //Equipo + resultado prov + equipo (necesitamos sacar la id)
        //resultado.innerHTML = `<img src="https://crests.football-data.org/${data.matches[i].homeTeam.id}.svg"/> ${resultadoProvisional} <img src="https://crests.football-data.org/${data.matches[i].awayTeam.id}.svg"/>`;
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

//para modificar el finished, SCHEDULED, etc
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

    // let nombresEquipos = [];
    // for (let i = 0; i < data.length; i++) {
    //     let name = data[i].awayTeam.name;
    //     if (!nombresEquipos.includes(name)) {
    //         nombresEquipos.push(name);
    //     }
    // }

    let nombres = data.map(partido => {
        return partido.homeTeam.name;
    });
    //Asi me devuelve los 380 nombres del awayTeam.

    let nombresEquipos = new Set(nombres);
    nombresEquipos = Array.from(nombresEquipos); //convertimos el set en Array
    //Tambien quiero que se ordenen por nombre.
    nombresEquipos.sort();
    crearOpcionesSelect(nombresEquipos);
}

//Nos crea los select para los equipos.
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

//ESTA ES LA FUNCION PPAL DE LOS FILTROS.
//esta funcion llama a la funcion filtros, a mostrar alerta y a creartabla y conjuntamente 
//con todas esas, se elabora la tabla de acuerdo al filtro escogido.
function crearArrayPorEquipo(equipoSeleccionado, opcion) {
    //opcion = ganado, perdido, empatado.
    let filtrado = [];

    //Recorremos el array para sacar TODOS los partidos del equipo.
    let arrayEquipoSeleccionado = data.matches.filter(partido => {
        if (partido.awayTeam.name == equipoSeleccionado) {
            return partido;
        } else if (partido.homeTeam.name == equipoSeleccionado) {
            return partido;
        }
    });
    console.log(arrayEquipoSeleccionado);
    //ya tenemos el array solo del equipo. Ahora la opcion que haya indicado: 
    //finalizados [ganado, perdido, empatado] o bien proximos.
    filtrado = filtros(arrayEquipoSeleccionado, opcion, filtrado, equipoSeleccionado);
    //Añadimos filtrado al objeto.
    document.getElementById("tbodyP").innerHTML = ''; //Borramos todo lo que esta en la pagina web4    
    crearTabla(filtrado);
    mostrarAlerta(filtrado, opcion, equipoSeleccionado, arrayEquipoSeleccionado);

}

//Esta funcion es llamada por la funcion anterior y filtra el arrayEquipo seleccionado con la opcion escogida.
//Vuelve a devolver el array.
function filtros(arrayEquipoSeleccionado, opcion, filtrado, equipoSeleccionado) {
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
    } else if (equipoSeleccionado != undefined) { //barcelona seleccionado
        //Tengo un equipo 
        if (opcion == undefined) { // no tenemos ninguna opcion escogida (ganado, perdido)
            //Mostramos todos los partidos del equipo y return 0 para que salga.
            document.getElementById("alerta").classList.add("d-none"); //elimino mensaje
            crearTabla(arrayEquipoSeleccionado);
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
    crearTabla(data.matches);
}
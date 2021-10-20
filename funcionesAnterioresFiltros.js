console.log(data);
let boton = document.getElementById("buton");
let reiniciar = document.getElementById("reiniciar");
let cambioEquipo = document.getElementById("elegirEquipo");


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

crearArrayPequeño(data);

function crearOpcionesSelect(nombresEquipos) {
    let select = document.getElementById("elegirEquipo");

    for (let i = 0; i < nombresEquipos.length; i++) {
        let option = document.createElement("option");
        option.setAttribute("value", "value1");

        let optionTexto = document.createTextNode(`${nombresEquipos[i]}`); //Aqui tengo que meter el id de la tabla
        option.appendChild(optionTexto);

        select.appendChild(option);
    }
}



boton.addEventListener("click", function () {
    let marcado = document.getElementById("checked");

    let opcion;

    let elementosSelect = document.getElementById("elegirEquipo");

    let indiceSeleccionado = elementosSelect.selectedIndex;
    let equipoSeleccionado = elementosSelect[indiceSeleccionado].text;

    mostrarAlerta(data, opcion, equipoSeleccionado);

    if (equipoSeleccionado == undefined) {
        let alerta = document.getElementById("alerta");
        document.getElementById("alerta").classList.remove("d-none");
        alerta.innerHTML = `¡Debe seleccionar un equipo!`;
    } else {
        let op = document.getElementById("consultarOpcion").classList.remove("d-none");

    }

    var opciones = document.getElementsByName("exampleRadios");

    for (var i = 0; i < opciones.length; i++) {
        if (opciones[i].checked == true) {
            opcion = opciones[i].id;
        }
    }


    crearArrayPorEquipo(equipoSeleccionado, opcion);
    //console.log(equipoSeleccionado);  //Funciona!
});



function crearArrayPorEquipo(equipoSeleccionado, opcion) {
    //opcion = ganado, perdido, empatado.
    let arrayEquipoSeleccionado = [];
    let filtrado = [];

    let equipo = {
        matches: filtrado
    }

    for (let i = 0; i < data.matches.length; i++) {
        if ((data.matches[i].awayTeam.name) == equipoSeleccionado) {
            arrayEquipoSeleccionado.push(data.matches[i]);
        } else if ((data.matches[i].homeTeam.name) == equipoSeleccionado) {
            arrayEquipoSeleccionado.push(data.matches[i]);
        }
    }

    //ya tenemos el array solo del equipo. Ahora la opcion que haya indicado: 
    //finalizados [ganado, perdido, empatado] o bien proximos.
    console.log(arrayEquipoSeleccionado);
    filtrarPorOpcion(arrayEquipoSeleccionado, opcion, filtrado, equipoSeleccionado);

    console.log(filtrado);
    document.getElementById("tbodyP").innerHTML = ''; //Borramos todo lo que esta en la pagina web4    
    mostrarAlerta(filtrado, opcion, equipoSeleccionado);
    crearTabla(equipo);
}

function filtrarPorOpcion(arrayEquipoSeleccionado, opcion, filtrado, equipoSeleccionado) {
    if (opcion == "proximos") {
        for (let i = 0; i < arrayEquipoSeleccionado.length; i++) {
            if (arrayEquipoSeleccionado[i].status !== "FINISHED") {
                filtrado.push(arrayEquipoSeleccionado[i]);
            }
        }
    } else {
        for (let i = 0; i < arrayEquipoSeleccionado.length; i++) {
            if (arrayEquipoSeleccionado[i].status == "FINISHED") {
                if (opcion == "empatado") {
                    if (arrayEquipoSeleccionado[i].score.winner == "DRAW") {
                        filtrado.push(arrayEquipoSeleccionado[i]);

                    }
                } else if (opcion == "ganado") {
                    if (equipoSeleccionado == arrayEquipoSeleccionado[i].homeTeam.name) {
                        if (arrayEquipoSeleccionado[i].score.winner == "HOME_TEAM") {
                            filtrado.push(arrayEquipoSeleccionado[i]);
                        }
                    } if (equipoSeleccionado == arrayEquipoSeleccionado[i].awayTeam.name) {
                        if (arrayEquipoSeleccionado[i].score.winner == "AWAY_TEAM") {
                            filtrado.push(arrayEquipoSeleccionado[i]);
                        }
                    }
                } else if (opcion == "perdido") {
                    if (equipoSeleccionado == arrayEquipoSeleccionado[i].homeTeam.name) {
                        if (arrayEquipoSeleccionado[i].score.winner == "AWAY_TEAM") {
                            filtrado.push(arrayEquipoSeleccionado[i]);
                        }
                    } if (equipoSeleccionado == arrayEquipoSeleccionado[i].awayTeam.name) {
                        if (arrayEquipoSeleccionado[i].score.winner == "HOME_TEAM") {
                            filtrado.push(arrayEquipoSeleccionado[i]);
                        }
                    }
                }
            }
        }
    }
}


function mostrarAlerta(array, opcion, equipoSeleccionado) {

    if (array.length == 0) {
        let alerta = document.getElementById("alerta");
        document.getElementById("alerta").classList.remove("d-none");
        alerta.innerHTML = `No se han encontrado partidos para el equipo ${equipoSeleccionado} con el filtro ${opcion}`;
    }

    else {
        let alerta = document.getElementById("alerta");
        document.getElementById("alerta").classList.add("d-none");

    }

}





function funcion_reiniciar() {
    document.getElementById("tbodyP").innerHTML = '';
    crearTabla(data);
}
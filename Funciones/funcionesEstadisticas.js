//cogemos los datos de partidos. En partidos se llama data.
//Tenemos que conseguir hacer un array de estadisticas:
// est = [0]{ id, name, goals, matches, avg}

//Tenemos que recorrer matches que es donde esta toda la info.

function crearArray(datosPartidos) {
    let arrayEquipos = [];

    for (let i = 0; i < datosPartidos.length; i++) {
        let idLocal = datosPartidos[i].homeTeam.id;
        let idVisitante = datosPartidos[i].awayTeam.id;
        let status = datosPartidos[i].status;

        //Encontramos el primer equipo
        let equipo = comprobarSiExiste(arrayEquipos, idLocal, status);
        if (equipo === undefined) {
            let equipoLocal = {
                id: idLocal,
                name: datosPartidos[i].homeTeam.name,
                goals: datosPartidos[i].score.fullTime.homeTeam,
                golesContraVisitante: 0,
                matches: 1,
                avg: 0
            };
            arrayEquipos.push(equipoLocal);
        } else {
            //Lo ha encontrado, tenemos que buscar su posicion en el Array para modificarlo.
            // en comprobar si existe sacamos la posicion, por tanto:

            if (equipo !== null) {
                equipo.matches += 1;
                equipo.goals += datosPartidos[i].score.fullTime.homeTeam;
            }
        }

        let equipoV = comprobarSiExiste(arrayEquipos, idVisitante, status);
        if (equipoV === undefined) {
            let equipoVisitante = {
                id: idVisitante,
                name: datosPartidos[i].awayTeam.name,
                goals: datosPartidos[i].score.fullTime.awayTeam,
                golesContraVisitante: datosPartidos[i].score.fullTime.homeTeam,
                matches: 1,
                avg: 0,
            };
            arrayEquipos.push(equipoVisitante);
        } else {
            //Lo ha encontrado, tenemos que buscar su posicion en el Array para modificarlo.
            // en comprobar si existe sacamos la posicion, por tanto:

            if (equipoV !== null) {
                equipoV.matches += 1;
                equipoV.golesContraVisitante += datosPartidos[i].score.fullTime.homeTeam;
                equipoV.goals += datosPartidos[i].score.fullTime.awayTeam;
            }
        }
    }

    modificarGolesAvg(arrayEquipos);
    crearTablaAvg(arrayEquipos);
    crearTablaGolesContra(arrayEquipos);
    console.log(arrayEquipos);
}

function modificarGolesAvg(arrayEquipos) {
    for (let equipo of arrayEquipos) {
        equipo.avg = (equipo.goals / equipo.matches).toFixed(2);
    }
}


//Find. Si existe, pasar el objeto.
// Si no existe, devolver para crearlo.
function comprobarSiExiste(array, id, status) {

    let equipo = array.find(equipo => equipo.id === id);

    if (equipo !== undefined) {
        if (status == "FINISHED") {
            return equipo;
        } else {
            return null;
        }
    }
    return equipo;
}

//Ordenar arrayPorAvg. b siempre es el primer elemento que queremos comparar
//primero Valencia, luego Getafe...
function ordenar(array, param) {

    array.sort((a, b) => {
        if (a[param] < b[param]) {
            return 1;  //Es cuando lo queremos cambiar.
        }

        if (a[param] > b[param]) {
            return -1;  //Lo dejamos igual.
        }

        return 0;
    });
}

function crearTablaAvg(array) {
    let arrayAvg = Array.from(array);
    let param = "avg";

    ordenar(arrayAvg, param);
    //Los imprime ya ordenados por avg.
    //Primero, probamos con un equipo a ver si funciona.
    let card = document.getElementsByClassName("card-header");
    let cards = [5];
    let logo = document.getElementsByClassName("card-text");
    let logos = [5];
    let avgTotal = document.getElementsByClassName("card-title");
    let textos = [5];

    //Recorremos el array para sacar los datos que queremos

    for (let i = 0; i < 5; i++) {
        cards[i] = arrayAvg[i].name;
        card[i].innerHTML = `${i + 1}. ${cards[i]}`;
        let img = `<img src="https://crests.football-data.org/${arrayAvg[i].id}.svg">`
        logo[i].innerHTML = img;
        textos[i] = `Con un AVG de ${arrayAvg[i].avg} goles`;
        avgTotal[i].innerHTML = textos[i];
    }
}

function crearTablaGolesContra(array) {
    let arrayGoles = Array.from(array);
    let param = "golesContraVisitante";

    ordenar(arrayGoles, param);
    arrayGoles.reverse();
    //Los imprime ya ordenados por avg.
    //Primero, probamos con un equipo a ver si funciona.
    let card = document.getElementsByClassName("goles-header");
    let cards = [5];
    let logo = document.getElementsByClassName("body-text");
    let logos = [5];
    let avgTotal = document.getElementsByClassName("body-title");
    let textos = [5];



    //Recorremos el array para sacar los datos que queremos

    for (let i = 0; i < 5; i++) {
        cards[i] = arrayGoles[i].name;
        card[i].innerHTML = `${i + 1}. ${cards[i]}`;
        let img = `<img src="https://crests.football-data.org/${arrayGoles[i].id}.svg">`
        logo[i].innerHTML = img;
        textos[i] = `Con un total de ${arrayGoles[i].golesContraVisitante} goles en contra fuera de casa`;
        avgTotal[i].innerHTML = textos[i];
    }
}

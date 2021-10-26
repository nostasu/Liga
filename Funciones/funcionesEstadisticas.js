//est = [0]{id, name, goals, matches, avg, golesContra}

function crearArray(datosPartidos) {
    let arrayEquipos = [];

    for (let i = 0; i < datosPartidos.length; i++) {
        let idLocal = datosPartidos[i].homeTeam.id;
        let idVisitante = datosPartidos[i].awayTeam.id;
        let status = datosPartidos[i].status;

        let equipo = comprobarSiExiste(arrayEquipos, idLocal, status);
        //El equipo todavia no esta en el array, lo creamos.
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
            //Lo ha encontrado, y nos devuelve el equipo.
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
            //Lo ha encontrado, por tanto modificamos sus valores.
            if (equipoV !== null) {
                equipoV.matches += 1;
                equipoV.golesContraVisitante += datosPartidos[i].score.fullTime.homeTeam;
                equipoV.goals += datosPartidos[i].score.fullTime.awayTeam;
            }
        }
    }
    modificarGolesAvg(arrayEquipos);
    crearCards(arrayEquipos, "avg");
    crearCards(arrayEquipos, "golesContra");
}

//Lo único que hace es sacar la media del avg
function modificarGolesAvg(arrayEquipos) {
    for (let equipo of arrayEquipos) {
        equipo.avg = (equipo.goals / equipo.matches).toFixed(2);
    }
}

//Find. Si el partido no esta finalizado, ni lo miramos (no hay que actualizar
//ni el valor de matches, ni el de goles).
//Si existe y esta finalizado., pasar el objeto.
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

//funcion para crear las cards, hacemos copia del array, lo ordenamos,
//y creamos las tarjetas dinamicamente.
function crearCards(array, param) {
    let arrayParam = Array.from(array);
    ordenar(arrayParam, param);

    if (param == "golesContra") {
        arrayParam.reverse();
    }

    let array5 = arrayParam.slice(0, 5);
    let contenedorCards = document.getElementById("containerEstadisticas");
    let titulo = document.createElement("h1");
    contenedorCards.appendChild(titulo);

    if (param == "avg") {
        titulo.innerHTML = "Equipos con mejor media de goles por partido";
    } else if (param == "golesContra") {
        titulo.innerHTML = "Equipos con menos goles en contra fuera de casa";
    }

    let fila = document.createElement("div");
    fila.classList.add("row");
    contenedorCards.appendChild(fila);
    let cards = document.createElement("div");
    cards.classList.add("cards");
    fila.appendChild(cards);

    for (let i = 0; i < array5.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("col-lg");
        cards.appendChild(card);
        let header = document.createElement("div");
        header.classList.add("card-header");
        header.innerHTML = `${i + 1}. ${array5[i].name}`;
        let body = document.createElement("div");
        body.classList.add("card-body");
        let logo = document.createElement("img");
        logo.classList.add("card-title");
        logo.src = `https://crests.football-data.org/${array5[i].id}.svg`;
        let texto = document.createElement("p");
        texto.classList.add("card-text");
        if (param == "avg") {
            texto.innerHTML = `Con un AVG de ${array5[i].avg} goles`;
        } else if (param == "golesContra") {
            texto.innerHTML = `Con un total de ${array5[i].golesContraVisitante} goles en contra fuera de casa`;
        }

        card.append(header, body);
        body.append(logo, texto);
    }
}

//Ordenar segun parametro (o bien avg, o bien goles/Contra).
function ordenar(array, param) {

    array.sort((a, b) => {
        if (a[param] < b[param]) {
            return 1;
        }
        if (a[param] > b[param]) {
            return -1;
        }
        return 0;
    });
}
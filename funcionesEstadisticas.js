//cogemos los datos de partidos. En partidos se llama data.
//Tenemos que conseguir hacer un array de estadisticas:
// est = [0]{ id, name, goals, matches, avg}

console.log(data.matches);
//Tenemos que recorrer matches que es donde esta toda la info.
let idLocal, idVisitante, nameLocal, nameVisitante, matches, avg;
let arrayEquipos = [];
let encontrado, posicion;

function crearArray() {

    for (let i = 0; i < data.matches.length; i++) {
        idLocal = data.matches[i].homeTeam.id;
        idVisitante = data.matches[i].awayTeam.id;
        //Encontramos el primer equipo
        if (arrayEquipos.length == 0) { //El array esta vacio. Incluir primer equipo
            let equipoLocal = {
                id: idLocal,
                name: data.matches[i].homeTeam.name,
                goalsLocal: data.matches[i].score.fullTime.homeTeam,
                goalsVisitante: 0,
                totalGoals: 0,
                golesContraVisitante: 0,
                matches: 1,
                avg: 0,

            };

            let equipoVisitante = {
                id: data.matches[i].awayTeam.id,
                name: data.matches[i].awayTeam.name,
                goalsLocal: 0,
                goalsVisitante: data.matches[i].score.fullTime.awayTeam,
                totalGoals: 0,
                golesContraVisitante: data.matches[i].score.fullTime.homeTeam,
                matches: 1,
                avg: 0,

            };

            arrayEquipos.push(equipoLocal);
            arrayEquipos.push(equipoVisitante);
            //goalsLocal = data.matches[i].score.fullTime.homeTeam;
        } else {  //El array no esta vacio, comprobar si el equipo ya esta
            encontrado = comprobarSiExiste(idLocal);
            if (encontrado == false) {
                let equipoLocal = {
                    id: idLocal,
                    name: data.matches[i].homeTeam.name,
                    goalsLocal: data.matches[i].score.fullTime.homeTeam,
                    goalsVisitante: 0,
                    totalGoals: 0,
                    golesContraVisitante: 0,
                    matches: 1,
                    avg: ""
                };
                arrayEquipos.push(equipoLocal);
            } else {
                //Lo ha encontrado, tenemos que buscar su posicion en el Array para modificarlo.
                // en comprobar si existe sacamos la posicion, por tanto:

                arrayEquipos[posicion].goalsLocal = arrayEquipos[posicion].goalsLocal + data.matches[i].score.fullTime.homeTeam;
                //ahora actualizamos los matches solo si finished.
                if (data.matches[i].status == "FINISHED") {
                    arrayEquipos[posicion].matches = arrayEquipos[posicion].matches + 1;

                }

            }

            encontrado = comprobarSiExiste(idVisitante);
            if (encontrado == false) {
                let equipoVisitante = {
                    id: idVisitante,
                    name: data.matches[i].awayTeam.name,
                    goalsLocal: 0,
                    goalsVisitante: data.matches[i].score.fullTime.awayTeam,
                    totalGoals: 0,
                    golesContraVisitante: data.matches[i].score.fullTime.homeTeam,
                    matches: 1,
                    avg: 0,
                };
                arrayEquipos.push(equipoVisitante);
            } else {
                //Lo ha encontrado, tenemos que buscar su posicion en el Array para modificarlo.
                // en comprobar si existe sacamos la posicion, por tanto:
                arrayEquipos[posicion].goalsVisitante = arrayEquipos[posicion].goalsVisitante + data.matches[i].score.fullTime.awayTeam;
                if (data.matches[i].status == "FINISHED") {
                    arrayEquipos[posicion].matches = arrayEquipos[posicion].matches + 1;
                    arrayEquipos[posicion].golesContraVisitante += + data.matches[i].score.fullTime.homeTeam;
                }
            }


        }

    }
    modificarGolesAvg();
}





crearArray();
console.log(arrayEquipos);



function comprobarSiExiste(idB) {
    for (let j = 0; j < arrayEquipos.length; j++) {
        let id = arrayEquipos[j].id;
        if (id == idB) {
            encontrado = true;
            posicion = j;
            return encontrado;
        } else {
            encontrado = false;
        }
    }

    return encontrado;
}

function modificarGolesAvg() {

    for (let equipo of arrayEquipos) {
        equipo.totalGoals = equipo.goalsLocal + equipo.goalsVisitante;
        equipo.avg = equipo.totalGoals / equipo.matches;
    }
}


function ordenarAvg() {
    ordenar();
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
        cards[i] = arrayEquipos[i].name;
        card[i].innerHTML = cards[i];
        let img = `<img src="https://crests.football-data.org/${arrayEquipos[i].id}.svg">`
        logo[i].innerHTML = img;
        textos[i] = `Con un total de ${arrayEquipos[i].totalGoals} goles en ${arrayEquipos[i].matches} partidos`;
        avgTotal[i].innerHTML = textos[i];
    }
}

ordenarAvg();
//Ordenar arrayPorAvg. b siempre es el primer elemento que queremos comparar
//primero Valencia, luego Getafe...
function ordenar() {
    arrayEquipos.sort((a, b) => {
        if (a.avg < b.avg) {
            return 1;
        }

        if (a.avg > b.avg) {
            return -1;
        }

        return 0;
    });
}

ordenarAvg();

//Ordenar por menos goles en contra como visitante.
function ordenarPorGolesContra() {
    for (let i = 0; i < arrayEquipos.length - 1; i++) {
        for (let j = 1; j < arrayEquipos.length; j++) {
            //todavia no tengo goles en contra// if(arrayEquipos[i].)

        }

    }
}



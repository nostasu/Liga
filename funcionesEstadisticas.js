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
                matches: 1,
                avg: 0
            };

            let equipoVisitante = {
                id: data.matches[i].awayTeam.id,
                name: data.matches[i].awayTeam.name,
                goalsLocal: 0,
                goalsVisitante: data.matches[i].score.fullTime.awayTeam,
                totalGoals: 0,
                matches: 1,
                avg: 0
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
                    matches: 1,
                    matches: 1,
                    avg: 0
                };
                arrayEquipos.push(equipoVisitante);
            } else {
                //Lo ha encontrado, tenemos que buscar su posicion en el Array para modificarlo.
                // en comprobar si existe sacamos la posicion, por tanto:
                arrayEquipos[posicion].goalsVisitante = arrayEquipos[posicion].goalsVisitante + data.matches[i].score.fullTime.awayTeam;
                if (data.matches[i].status == "FINISHED") {
                    arrayEquipos[posicion].matches = arrayEquipos[posicion].matches + 1;
                }
            }


        }


        // idVisitante = data.matches[i].awayTeam.id;
        // nameLocal = data.matches[i].homeTeam.name;
        // nameVisitante = data.matches[i].awayTeam.name;
        // goalsLocal = data.matches[i].score.fullTime.homeTeam;
        // goalsVisitante = data.matches[i].score.fullTime.awayTeam;
        // //Sumar uno a los matches de cada equipo
    }
    modificarGolesAvg();
}





crearArray();



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

console.log(arrayEquipos);
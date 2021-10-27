let tbody = document.getElementById("tbodyC");

/*
Crea la tabla. Conseguimos los datos para cada indice del arrayCol (posición, equipo…). 
Luego recorremos el arrayCol para crear las td e introducir en cada td el contenido.
*/

function crearTablaClasificacion(datosClasificacion) {
    let row, posicion, equipo, PJ, V, E, D, GF, GC, DG, pts;
    let arrayCol;

    for (let i = 0; i < datosClasificacion.length; i++) {

        row = document.createElement("tr");
        tbody.appendChild(row);
        posicion = datosClasificacion[i].position;
        equipo = `<img src="${datosClasificacion[i].team.crestUrl}"width="18px"/> ${datosClasificacion[i].team.name}`;
        PJ = datosClasificacion[i].playedGames;
        V = datosClasificacion[i].won;
        E = datosClasificacion[i].draw;
        D = datosClasificacion[i].lost;
        GF = datosClasificacion[i].goalsFor;
        GC = datosClasificacion[i].goalsAgainst;
        DG = datosClasificacion[i].goalDifference;
        pts = datosClasificacion[i].points;
        arrayCol = [posicion, equipo, PJ, V, E, D, GF, GC, DG, pts];

        for (let j = 0; j < arrayCol.length; j++) {
            let pos = document.createElement("td");
            pos.innerHTML = arrayCol[j];
            row.appendChild(pos);
        }
    }
}


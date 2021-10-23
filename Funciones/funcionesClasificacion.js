let tbody = document.getElementById("tbodyC");

function crearTablaClasificacion(datosClasificacion) {
    let row, posicion, equipo, PJ, V, E, D, GF, GC, DG, pts;
    let arrayCol;

    for (let i = 0; i < datosClasificacion.length; i++) {

        row = document.createElement("tr");
        tbody.appendChild(row); // Decimos que la fila es hija del tbody.

        //definimos variables.
        posicion = datosClasificacion[i].position;

        //Equipo va a ser la suma de la imagen + el nombre.
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

        //Iteramos sobre el arrayCol para obtener todas las celdas necesarias.
        // Por cada posicion del vector, este genera una celda.
        for (let j = 0; j < arrayCol.length; j++) {
            let pos = document.createElement("td");
            pos.innerHTML = arrayCol[j];
            row.appendChild(pos);
        }
    }
}


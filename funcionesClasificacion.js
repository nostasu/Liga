
let tbody = document.getElementById("tbodyC");

function crearTablaClasificacion() {
    let row, posicion, equipo, PJ, V, E, D, GF, GC, DG, pts;
    let arrayCol;
    let tablaC = dataClasificacion.standings[0].table;


    for (let i = 0; i < tablaC.length; i++) {

        row = document.createElement("tr");
        tbody.appendChild(row); // Decimos que la fila es hija del tbody.


        //definimos variables.
        posicion = tablaC[i].position;

        //Equipo va a ser la suma de la imagen + el nombre.
        equipo = `<img src="${tablaC[i].team.crestUrl}"width="18px"/> ${tablaC[i].team.name}`;
        PJ = tablaC[i].playedGames;
        V = tablaC[i].won;
        E = tablaC[i].draw;
        D = tablaC[i].lost;
        GF = tablaC[i].goalsFor;
        GC = tablaC[i].goalsAgainst;
        DG = tablaC[i].goalDifference;
        pts = tablaC[i].points;
        arrayCol = [posicion, equipo, PJ, V, E, D, GF, GC, DG, pts];

        for (let j = 0; j < arrayCol.length; j++) {
            let pos = document.createElement("td");
            pos.innerHTML = arrayCol[j];
            row.appendChild(pos);
        }
    }
}


crearTablaClasificacion();
console.log(dataClasificacion);
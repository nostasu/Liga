let api = "cfba544d51b440e59acb0d0eb9572159";
let urlPartidos = "https://api.football-data.org/v2/competitions/2014/matches";


//El fetch necesita un input que es la informacion (url) + init que es 
//un objeto de opciones, donde vamos a poner nuestro header (API KEY)
fetch(urlPartidos, {
    method: "GET",
    headers: {
        "X-Auth-Token": api
    }
})
    .then(function (response) {
        if (response.ok) { //si es true se mete.
            return response.json();  //esto nos devuelve otra promesa, hay que hacer otro then
        }

    })

    .then(function (dataPartidos) {
        console.log(dataPartidos); //Aqui ya nos da los partidos!!
        init(dataPartidos);

    })

function init(dataPartidos) {
    document.getElementById('containerSpinner').style.display = 'none';
    document.getElementById("containerPartidos").classList.remove("d-none");
    crearArrayPequeño(dataPartidos.matches);
    crearTabla(dataPartidos.matches); //Crea el array de todos los partidos sin filtrar.
    document.getElementById("buton").addEventListener("click", function () {
        activarBoton(dataPartidos.matches);
    });

    document.getElementById("reiniciar").addEventListener("click", function () {
        document.getElementById("tbodyP").innerHTML = '';
        crearTabla(dataPartidos.matches);
    });
}

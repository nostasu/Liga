let api = "cfba544d51b440e59acb0d0eb9572159";
let urlPartidos = "https://api.football-data.org/v2/competitions/2014/matches";

fetch(urlPartidos, {
    method: "GET",
    headers: {
        "X-Auth-Token": api
    }
})
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }

    })

    .then(function (dataPartidos) {
        console.log(dataPartidos);
        init(dataPartidos);

    })

function init(dataPartidos) {
    document.getElementById('containerSpinner').style.display = 'none';
    document.getElementById("containerPartidos").classList.remove("d-none");
    crearArrayPequeño(dataPartidos.matches);
    crearTabla(dataPartidos.matches);
    document.getElementById("buton").addEventListener("click", function () {
        activarBoton(dataPartidos.matches);
    });

    document.getElementById("reiniciar").addEventListener("click", function () {
        document.getElementById("tbodyP").innerHTML = '';
        document.getElementById("alerta").classList.add("d-none");

        crearTabla(dataPartidos.matches);
    });
}

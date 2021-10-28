
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

        throw newError("Fallo");
    })

    .then(function (dataPartidos) {
        init(dataPartidos);
    })
    .catch(function (error) {
        console.error(error);
    });

function init(dataPartidos) {
    document.getElementById('containerSpinner').style.display = 'none';
    document.getElementById("containerEstadisticas").classList.remove("d-none");
    crearArray(dataPartidos.matches);
}





let api = "cfba544d51b440e59acb0d0eb9572159";
let urlTeams = "https://api.football-data.org/v2/competitions/2014/teams";

fetch(urlTeams, {
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

    .then(function (dataImagenes) {
        console.log(dataImagenes);
        init(dataImagenes);
    })
    .catch(function (error) {
        console.error(error);
    });

function init(dataImagenes) {
    document.getElementById('containerSpinner').style.display = 'none';
    document.getElementById("containerHome").classList.remove("d-none");
    crearSlider(dataImagenes.teams);
}


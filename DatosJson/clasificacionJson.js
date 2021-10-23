let api = "cfba544d51b440e59acb0d0eb9572159";
let urlClasificacion = "https://api.football-data.org/v2/competitions/2014/standings";

//El fetch necesita un input que es la informacion (url) + init que es 
//un objeto de opciones, donde vamos a poner nuestro header (API KEY)
fetch(urlClasificacion, {
    method: "GET",
    headers: {
        "X-Auth-Token": api
    }
})
    .then(function (response) {
        if (response.ok) { //si es true se mete.
            return response.json();  //esto nos devuelve otra promesa, hay que hacer otro then
        }

        throw newError("Fallo");
    })

    .then(function (dataClasificacion) {

        init(dataClasificacion);
    })
    .catch(function (error) {
        console.error(error);
        //AQui podemos poner codigo bootstrap para errores.
    });

function init(dataClasificacion) {
    document.getElementById('containerSpinner').style.display = 'none';
    document.getElementById("containerClasficacion").classList.remove("d-none");
    crearTablaClasificacion(dataClasificacion.standings[0].table);
}



function crearSlider(data) {

    //Primero, probamos con un equipo a ver si funciona.
    let nombre = document.getElementsByClassName("accordion-button");
    let nombres = [20];
    let logo = document.getElementsByClassName("accordion-body");
    let logos = [20];

    //Recorremos el array para sacar los datos que queremos
    for (let i = 0; i < data.teams.length; i++) {
        console.log(data.teams[i].name);
        nombres[i] = data.teams[i].name;
        nombre[i].innerHTML = nombres[i];
        let a = `<a href="${data.teams[i].website}"> <img src="${data.teams[i].crestUrl}"/></a>`;
        logo[i].innerHTML = a;
    }
}


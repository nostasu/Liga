
let array = dataClasificacion.standings[0].table;

console.log(array);

let name;


//Primero, probamos con un equipo a ver si funciona.
let nombre = document.getElementsByClassName("accordion-button");
let nombres = [20];
let logo = document.getElementsByClassName("accordion-body");
let logos = [20];



//Recorremos el array para sacar los datos que queremos

for (let i = 0; i < nombre.length; i++) {
    nombres[i] = array[i].team.name;
    nombre[i].innerHTML = nombres[i];
    let img = `<img src="${array[i].team.crestUrl}"/>`;
    logo[i].innerHTML = img;
}



let array = dataClasificacion.standings[0].table;
console.log(array);
console.log(image);

let name;


//Primero, probamos con un equipo a ver si funciona.
let nombre = document.getElementsByClassName("accordion-button");
let nombres = [20];
let logo = document.getElementsByClassName("accordion-body");
let logos = [20];



//Recorremos el array para sacar los datos que queremos

for (let i = 0; i < nombre.length; i++) {
    nombres[i] = image.teams[i].name;
    nombre[i].innerHTML = nombres[i];
    let a = `<a href="${image.teams[i].website}"> <img src="${image.teams[i].crestUrl}"/></a>`;
    logo[i].innerHTML = a;
}


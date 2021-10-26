function crearSlider(teams) {

    let acordeon = document.getElementById("accordionExample");
    for (let i = 0; i < teams.length; i++) {
        let itemAcordeon = document.createElement("div");  //Así creamos los 20 divs
        itemAcordeon.classList.add("accordion-item");

        let titulo = document.createElement("h2");
        titulo.classList.add("accordion-header");
        titulo.setAttribute("id", `heading${[i]}`);
        let boton = document.createElement("button");
        boton.classList.add("accordion-button");
        boton.setAttribute("type", "button");
        boton.setAttribute("data-bs-toggle", "collapse");
        boton.setAttribute("data-bs-target", `#collapse${[i]}`);
        if (i == 0) {
            boton.setAttribute("aria-expanded", "true");
        } else {
            boton.setAttribute("aria-expanded", "false");
        }
        boton.setAttribute("aria-controls", `collapse${[i]}`);
        boton.innerHTML = teams[i].name;

        let cuerpo = document.createElement("div");
        cuerpo.setAttribute("id", `collapse${[i]}`);
        cuerpo.classList.add("accordion-collapse");
        cuerpo.classList.add("collapse");
        if (i == 0) {
            cuerpo.classList.add("show");
        }
        cuerpo.setAttribute("aria-labelledby", `heading${[i]}`);
        cuerpo.setAttribute("data-bs-parent", "#accordionExample");
        let imagen = document.createElement("div");
        imagen.classList.add("accordion-body");
        let a = `<a href="${teams[i].website}"> <img src="${teams[i].crestUrl}"/></a>`;
        imagen.innerHTML = a;

        acordeon.appendChild(itemAcordeon);
        itemAcordeon.appendChild(titulo);
        titulo.appendChild(boton);
        itemAcordeon.appendChild(cuerpo);
        cuerpo.appendChild(imagen);
    }
}


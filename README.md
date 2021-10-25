# Página de la Liga 
## Proyecto 2 Let's Coder

En este proyecto se intenta recrear la página web de la liga de futbol, con su clasificacion, sus partidos, algunas estadísticas de interés y añadiendo además filtros por partidos para poder ver de un determinado equipo los partidos que ha ganado, perdido, empatado o sus próximos partidos.  Se utiliza bootstrap, html, javascript y un poquito de css para los detalles de estilo propios. 

El proyecto se divide en 4 páginas html que se describen a continuación. Todas ellas tienen una navbar creada con Bootstrap.

# Página Home
Es la página inicial en la que aparecen los 20 equipos de primera división. Todo está incluido en un contenedor con márgenes. Las "cards" están hechas con accordion-collapse en funcionesHomeSlider.
Dentro del accordion body se encuentra la imagen del equipo y pinchando en ella nos redirige a la página web.

# Página Partidos
Nada mas abrir la página web, se muestran todos los partidos de la temporada, jugados o no.  El equipo ganador se muestra en negrita. La tabla y los filtros se crean en la carpeta funciones  funcionesPartidos. Se explican las funciones del js. Nada mas iniciar se llama a crear tabla y a crear array pequeño (desde el partidosJSON).
## Crear Tabla
Recibe por parámetro un array (o bien el de todos los partidos, o los partidos filtrados por equipo y opción) esta función va creando dinámicamente la tabla. Llama también a las funciones cambiarFinalizado y eliminarNull para ayudar a mostrar la tabla correctamente en pantalla con valores perfectamente entendibles por cualquier usuario.

##CrearArrayPequeño.
Esta función crea un array ayudándose de map y set que contiene los valores únicos de los 20 equipos. Cuando lo tiene creado, llama a crearOpcionesSelect() que nos rellena dinámicamente el select de los 20 equipos.

##ActivarBoton.
Si se produce el evento, significa que le queremos pasar filtros a la tabla de partidos.  Primero de todo, obtenemos el nombre del equipo que el usuario ha marcado con el select, y también obtenemos la opción marcada de los radios. Con estos datos, llamamos a crearArrayPorEquipo con el equipo seleccionado y la opción. 

##Crear array por equipo.
Esta es la función que crea el array con los filtros y el equipo seleccionados. Esta funcion llama a filtros, mostrar alerta, y a crear tabla con los datos ya filtrados.
La función inicia creando un array de los partidos del equipoSeleccionado, y este array se pasa a la función filtros que vuelve a filtrar el array según la opción que el usuario haya escogido. También llama a  mostrar alerta para informar al usuario de posibles “errores” como que no haya partidos empatados para algún equipo determinado o por ejemplo el error de que no se seleccione el equipo.
# Página Clasificación.
Esta crea dinámicamente la tabla, recorriendo los datos obtenidos con JSon.
Tenemos un for que itera sobre un vector que contiene los datos de la tabla, creando así celdas para cada apartado (posición, equipo, partidos jugados…) las cuales se almacenan en arrayCol. 
Luego recorremos el arrayCol para crear las td e introducir en cada td el contenido.

# Página Estadísticas.
Esta hecho con cards que muestran los equipos, en funcion del mayor AVG y los equipos menos goleados fuera de casa.
En funcionesEstadisticas.js, tenemos las funciones:
##CrearArray();
Recorremos los datos que obtenemos a través del fetch, en este caso los de partidos.
Primero, declaramos un array vacio arrayEquipos que iremos llenando con los 20 equipos, por cada partido, miramos el equipo local y el equipo visitante. Si no existe en el array, lo metemos, si existe, aumentamos el numero de partidos jugados, los goles en contra (solo si es el equipo Visitante), y los goles totales. Esta funcion llama a modificar goles una vez que esta el array completo para modificar el AVG de cada equipo, y a crearCards una con el avg y otra con los goles en contra.
## Modificar Goles Avg();
Usamos un for each para modificar el avg de TODOS los equipos.
## Comprobar Si Existe();
Se usa el método find para ver si un equipo ya existe en el array. Si el partido ni tan siquiera esta finalizado, no lo devuelve puesto que no hay datos de goles. Si esta finalizado y no existe, nos devuelve null para crearlo. Si no, devuelve el equipo para actualizarlo.
## CrearCards
A esta función le pasamos dos parámetros, el array del cual queremos mostrar las estadísticas, y el parámetro. En función de si el parámetro es avg o goles en contra algunas cosas cambian levemente, pero lo que se hace es utilizar las clases de Bootstrap para mostrar por pantalla los 5 equipos con mas o avg o con menos goles en contra. Se ayuda de la funcion ordenar y de slice para crear un nuevo array con los 5 primeros
## Ordenar. 
Nos aprovechamos de la método sort para ordenar el array. O bien por avg o por goles en contra.

# Ejemplo de uso:
https://laughing-spence-cb459b.netlify.app/clasificacion.html

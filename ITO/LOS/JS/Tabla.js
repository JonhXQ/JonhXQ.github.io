let nombreColumnas = {
    "ID": "ID",
    "Longitude": "Longitud",
    "Latitude": "Latitud",
    "Elevation": "Altitud",
    "Distance (Total)": "D1"
}

function generarTabla(jsonData){
    /* Obtener la tabla del HTML */
    let tabla = document.getElementById("tabla");
    /* Imprimir el objeto tabla en la consola */
    console.log(tabla);
    /* Crear la fila del encabezado */
    let encabezado = tabla.createTHead().insertRow();
    /* Crear un array de nombres de columnas que se desean incluir */
    let columnasDeseadas = ["ID","Longitude","Latitude","Elevation","Distance (Total)"];
    /* Obtener los nombres de las columnas del objeto jsonData */
    let columnas = Object.keys(jsonData[0]);
    /* Filtrar solo las columnas que se desean incluir */
    columnas = columnas.filter(function(columna){
        return columnasDeseadas.indexOf(columna) > -1;
    });
    /* Agregar las celdas del encabezado */
    columnas.forEach(function(columna){
        let celda = document.createElement("th");
        celda.textContent = nombreColumnas[columna];
        encabezado.appendChild(celda);
    });
    /* Agregar las filas de datos */
    jsonData.forEach(function(fila){
        /* Crear una una fila en la tabla */
        let nuevaFila = tabla.insertRow();
        /* Agregar las celdas a la fila */
        columnas.forEach(function(columna){
            let celda = nuevaFila.insertCell();
            if (columna === "Elevation" || columna === "Distance (Total)"){
                celda.textContent = parseFloat(fila[columna]).toFixed(3);
            } else{
                celda.textContent = fila[columna];
            }
        });
    });
}
function calcular(jsonData){
    //-------------------------Distancia Total-------------------------// 
    /* Obtener la tabla del HTML */
    let tabla = document.getElementById("tabla");
    /* Almacena todas las filas en de la tabla en la variable "filas" */
    let filas = tabla.rows;
    /* Almacena la última fila en la variable "ultimaFila" */
    let ultimaFila = filas[filas.length - 1];
    /* Obtiene la celda de la columna 4 "Distance (Total)" */
    let celdaDistancia = ultimaFila.cells[4];
    /* Se obtiene el texto de la celda y se almacena en una variable */
    let distanciaTotal = celdaDistancia.textContent;
    /* Imprimir Distancia Total en la consola */
    console.log("Distancia Total: " + distanciaTotal);

    //-------------------------------D2-------------------------------//
    /* Agregar la columna "D2" a la tabla */
    let encabezado = tabla.tHead.rows[0];
    let celdaD2 = document.createElement("th");
    celdaD2.textContent = "D2";
    encabezado.appendChild(celdaD2);
    /* Agregar los datos a la columna "D2" */
    let filasDatos = tabla.rows;
    for (let i = 1; i < filasDatos.length; i++){
        let celdaD1 = filasDatos[i].cells[4];
        let celdaD2 = filasDatos[i].insertCell(5);
        let distanciaD1 = parseFloat(celdaD1.textContent);
        celdaD2.textContent = (distanciaTotal - distanciaD1).toFixed(3);
    }

    //-----------------------------ASNM-----------------------------// 
    /* Obtener los valores de la columna "Elevation" como un array */
    let elevations = jsonData.map(function(row){
        return row["Elevation"];
    });
    /* Calcular el promedio de los valores de la columna "Elevation" */
    let ASNM = elevations.reduce(function(acc, val){
        return acc + val;}, 0) / elevations.length;
    /* Imprimir ASNM en la consola */
    console.log("ASNM: " + ASNM);

    //-----------------------------K-----------------------------// 
    /* Coeficiente de refractividad */
    let n = 315 * Math.exp(-(ASNM / 7350));
    /* Gradiente de refractividad */
    let G = -0.127 * n;
    /* Factor del radio efectivo de la tierra */
    let K = 157 / (157 + G);
    /* Imprimir K en la consola */
    console.log("K: " + K);
}

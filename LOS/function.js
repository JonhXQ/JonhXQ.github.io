function loadFile(){
    /* Obtener el archivo seleccionado */
    let inputFile = document.getElementById("input").files[0];
    /* Crear un nuevo objeto FileReader */
    let reader = new FileReader();
    /* Definir el evento onload para ejecutarse cuando el archivo se cargue */
    reader.onload = function(e){
        /* Obtener el contenido del archivo */
        let data = e.target.result;
        /* Convertir el contenido del archivo a un objeto workbook de SheetJS */
        let workbook = XLSX.read(data, {type:"binary"});
        /* Obtener la primera hoja de cálculo del workbook */
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        /* Convertir la hoja de cálculo a un objeto JSON */
        let jsonData = XLSX.utils.sheet_to_json(worksheet);
        /* Imprimir el objeto jsonData en la consola */
        console.log(jsonData);
        /* Obtener la tabla HTML */
        let tabla = document.getElementById("tabla");
        /* Crear una fila para los encabezados de columna */
        let encabezados = jsonData[0];
        let filaEncabezados = tabla.insertRow();
        for (let encabezado in encabezados){
            let celda = filaEncabezados.insertCell();
            celda.innerHTML = encabezados[encabezado];
        }
        /* Crear filas para los datos de la hoja de cálculo */
        for (let i = 1; i < jsonData.length; i++){
            let filaDatos = tabla.insertRow();
            for (let dato in jsonData[i]){
                let celda = filaDatos.insertCell();
                celda.innerHTML = jsonData[i][dato];
            }
        }
    };
    /* Leer el contenido del archivo como binario */
    reader.readAsBinaryString(inputFile);
}
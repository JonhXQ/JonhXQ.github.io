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
        /* Almacenar los datos del archivo en una variable global */
        window.datosExcel = jsonData;
        generarTabla(jsonData);
        calcular(jsonData);
    };
    /* Leer el contenido del archivo como binario */
    reader.readAsBinaryString(inputFile);
}
/* TABLA DE GRUPOS */

/* Obtiene los datos de grupos almacenados en localStorage */
let grupos = JSON.parse(localStorage.getItem('grupos')) || [];

/* Obtiene el elemento <tbody> de la tabla */
const tBodyGrupos = document.querySelector('#tablaGrupos tbody');

/* Genera las filas de la tabla con los datos de los grupos */
grupos.forEach(grupo => {
    /* Crear una nueva fila en la tabla */
    const nuevaFilaGrupos = document.createElement('tr');

    /* Crear las celdas y asignarles los valores */
    const nombreGrupoCell = document.createElement('td');
    nombreGrupoCell.textContent = grupo.nombreGrupo;

    const carreraCell = document.createElement('td');
    carreraCell.textContent = grupo.carrera;

    const semestreCell = document.createElement('td');
    semestreCell.textContent = grupo.semestre;

    const grupoCell = document.createElement('td');
    grupoCell.textContent = grupo.grupo;

    /* Agregar las celdas a la fila */
    nuevaFilaGrupos.appendChild(nombreGrupoCell);
    nuevaFilaGrupos.appendChild(carreraCell);
    nuevaFilaGrupos.appendChild(semestreCell);
    nuevaFilaGrupos.appendChild(grupoCell);

    /* Agregar la fila a la tabla */
    tBodyGrupos.appendChild(nuevaFilaGrupos);
});

/* TABLA DE ALUMNOS */

/* Obtiene los datos de alumnos almacenados en localStorage */
let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

/* Obtiene el elemento <tbody> de la tabla */
const tBodyAlumnos = document.querySelector('#tablaAlumnos tbody');

/* Genera las filas de la tabla con los datos de los alumnos */
alumnos.forEach(alumno => {
    /* Crear una nueva fila en la tabla */
    const nuevaFilaAlumnos = document.createElement('tr');

    /* Crear las celdas y asignarles los valores */
    const nombreCell = document.createElement('td');
    nombreCell.textContent = alumno.nombre;

    const apellidosCell = document.createElement('td');
    apellidosCell.textContent = alumno.apellidos;

    const edadCell = document.createElement('td');
    edadCell.textContent = alumno.edad;

    /* Agregar las celdas a la fila */
    nuevaFilaAlumnos.appendChild(nombreCell);
    nuevaFilaAlumnos.appendChild(apellidosCell);
    nuevaFilaAlumnos.appendChild(edadCell);

    /* Agregar la fila a la tabla */
    tBodyAlumnos.appendChild(nuevaFilaAlumnos);
});



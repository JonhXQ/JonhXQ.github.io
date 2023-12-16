/* PÁGINA DE ALUMNOS */
class Alumno{
    constructor(alumnoID, nombre, apellidos, edad){
        this.alumnoID = alumnoID;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materias = [];
        this.calificaciones = {};
    }
}

/* Función para el formulario ALUMNOS */
function nuevoAlumno(event){
    /* Evitar que la página se refresque */
    event.preventDefault();

    /* Obtener los valores del formulario */
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = document.getElementById('edad').value;

    /* Obtener el array de alumnos del localStorage (si existe) */
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

    /* Obtener el último ID utilizado */
    let lastID = localStorage.getItem('lastID') || '19160000';

    /* Generar un nuevo ID incrementando el último ID utilizado */
    const newID = (parseInt(lastID) + 1).toString();

    /* Crea una instancia de la clase Alumno */
    const alumno = new Alumno(newID, nombre, apellidos, edad);
    
    /* Agregar el nuevo alumno al array */
    alumnos.push(alumno);

    /* Guardar el nuevo ID en localStorage */
    localStorage.setItem('lastID',newID);

    /* Guardar el array de alumnos actualizado en localStorage*/
    localStorage.setItem('alumnos', JSON.stringify(alumnos));

    /* Vaciar el formulario */
    document.getElementById('alumnoForm').reset();

    /* Refrescar la página ALUMNOS */
    location.reload();
}

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
    const alumnoIDCell = document.createElement('td');
    alumnoIDCell.textContent = alumno.alumnoID;

    const nombreCell = document.createElement('td');
    nombreCell.textContent = alumno.nombre;

    const apellidosCell = document.createElement('td');
    apellidosCell.textContent = alumno.apellidos;

    const edadCell = document.createElement('td');
    edadCell.textContent = alumno.edad;

    /* Agregar las celdas a la fila */
    nuevaFilaAlumnos.appendChild(alumnoIDCell);
    nuevaFilaAlumnos.appendChild(nombreCell);
    nuevaFilaAlumnos.appendChild(apellidosCell);
    nuevaFilaAlumnos.appendChild(edadCell);

    /* Agregar la fila a la tabla */
    tBodyAlumnos.appendChild(nuevaFilaAlumnos);
});

/* Activa la función "nuevoAlumno" al presionar el botón ACEPTAR */
document.getElementById("alumnoForm").addEventListener('submit', nuevoAlumno);
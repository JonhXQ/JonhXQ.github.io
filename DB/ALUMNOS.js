/* Página de Alumnos */
class Alumno{
    constructor(nombre, apellidos, edad){
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

    /* Crea una instancia de la clase Alumno */
    const alumno = new Alumno(nombre, apellidos, edad);

    /* Obtener el array de alumnos del localStorage (si existe) */
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

    /* Agregar el nuevo alumno al array */
    alumnos.push(alumno);

    /* Guardar el array de alumnos actualizado en localStorage*/
    localStorage.setItem('alumnos', JSON.stringify(alumnos));

    /* Vaciar el formulario */
    document.getElementById('alumnoForm').reset();
}

document.getElementById("alumnoForm").addEventListener('submit', nuevoAlumno);
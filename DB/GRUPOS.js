/* Página de Grupos */
class Grupo{
    constructor(nombreGrupo, carrera, semestre, grupo){
        this.nombreGrupo = nombreGrupo;
        this.carrera = carrera;
        this.semestre = semestre;
        this.grupo = grupo;
    }
}

/* Función para el formulario GRUPOS */
function nuevoGrupo(event){
    /* Evitar que la página se refresque */
    event.preventDefault();

    /* Obtener los valores del formulario */
    const carrera = document.getElementById('carrera').value;
    const semestre = document.getElementById('semestre').value;
    const grupo = document.getElementById('grupo').value.toUpperCase();

    /* Definir el identificador del grupo */
    const nombreGrupo = carrera.charAt(0) + semestre + grupo;

    /* Crea una instancia de la clase Grupo */
    const GRUPO = new Grupo(nombreGrupo, carrera, semestre, grupo);

    /* Obtener el array de grupos del localStorage (si existe) */
    let grupos = JSON.parse(localStorage.getItem('grupos')) || [];

    /* Agregar el nuevo grupo al array */
    grupos.push(GRUPO);

    /* Guardar el array de grupos actualizado en localStorage*/
    localStorage.setItem('grupos', JSON.stringify(grupos));

    /* Vaciar el formulario */
    document.getElementById('grupoForm').reset();
}

document.getElementById("grupoForm").addEventListener('submit', nuevoGrupo);
/* PÁGINA DE GRUPOS */
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

    /* Refrescar la página GRUPOS */
    location.reload();
}

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

/* Activa la función "nuevoGrupo" al presionar el botón ACEPTAR */
document.getElementById("grupoForm").addEventListener('submit', nuevoGrupo);
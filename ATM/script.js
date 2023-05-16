const cuentas = [
    {
        nombreCuenta: 'JESÉ LÓPEZ JUÁREZ',
        numeroCuenta: '1',
        saldoCuenta: 200,
        nip: '1234',
    },
    {
        nombreCuenta: 'JOEL LÓPEZ QUIROZ',
        numeroCuenta: '2',
        saldoCuenta: 300,
        nip: '1234',
    },
    {
        nombreCuenta: 'ELIZABETH JUÁREZ HERNANDEZ',
        numeroCuenta: '3',
        saldoCuenta: 400,
        nip: '1234',
    }
]

/* Variables globales del script */
let userInput = '';

function resetLogin() {
    document.getElementById('user').value = '';
    document.getElementById('password').value = '';
    buildMenuCuenta(null);
}

function login() {
    /* Obtiene el número de cuenta y el NIP del formulario */
    userInput = document.getElementById('user').value;
    const passwordInput = document.getElementById('password').value;

    /* Verifica si la cuenta existe y coincide con el NIP */
    const accesoCuenta = cuentas.find(function (acceso) {
        return acceso.numeroCuenta === userInput && acceso.nip === passwordInput;
    });

    if (accesoCuenta) {
        alert("Acceso concedido")
        buildMenuCuenta(cuentas, userInput);
    } else {
        alert("Número de cuenta o NIP incorrectos")
        resetLogin();
    }
    console.log(userInput, passwordInput)
}

const buildMenuCuenta = (cuentas, userInput) => {
    /* Seleccionar el elemento del DOM padre */
    const getParentElement = document.getElementById('menuCuenta')
    /* Limpiar el contenido del elemento padre */
    getParentElement.innerHTML = ''
    cuentas.forEach((line) => {
        if (line.numeroCuenta === userInput) {
            /* Crear la sección solo si el número de cuenta existe */
            const createSection = document.createElement('section');
            createSection.classList.add('cuenta');
            createSection.innerHTML = `
                <h2>Titular de la cuenta: <span>${line.nombreCuenta}</span></h2>
                <input type="button" value="Consultar Saldo" onclick="Saldo(${line.saldoCuenta})">
                <input type="button" value="Ingresar Monto" onclick="Ingresar(${line.saldoCuenta})">
                <input type="button" value="Retirar Monto" onclick="Retirar()">
                <input type="button" value="Salir" onclick="resetLogin()">
                <section id="saldoSection" style="display: none;"></section>
                <section id="saldoSection2" style="display: none;"></section>
                <section id="ingresarSection" style="display: none;"></section>
                <section id="retirarSection" style="display: none;"></section>
            `
            getParentElement.appendChild(createSection)
        }
    })
}

function Saldo(saldoCuenta) {
    const saldoSection = document.getElementById('saldoSection');
    const ingresarSection = document.getElementById('ingresarSection');
    const retirarSection = document.getElementById('retirarSection');

    saldoSection.style.display = 'block';
    ingresarSection.style.display = 'none';
    retirarSection.style.display = 'none';

    saldoSection.innerHTML = `
        <h2>Consultar Saldo</h2>
        <h3>Saldo actual: $ ${saldoCuenta}</h3>
    `;
}

function Ingresar() {
    const saldoSection = document.getElementById('saldoSection');
    const ingresarSection = document.getElementById('ingresarSection');
    const retirarSection = document.getElementById('retirarSection');

    saldoSection.style.display = 'none';
    ingresarSection.style.display = 'block';
    retirarSection.style.display = 'none';

    ingresarSection.innerHTML = `
        <h2>Ingresar Saldo</h2>
        <input type="number" id="montoIngresado" min="0" placeholder="Ingrese un monto">
        <button onclick="realizarIngreso()">Ingresar</button>
    `;
}

function realizarIngreso(saldoCuenta){
    const montoIngresado = document.getElementById('montoIngresado')
    if ((saldoCuenta + montoIngresado) < 990) {
        saldoCuenta += montoIngresado;
    } else {
        alert("El monto máximo permitido en su cuenta es de $990");
    }

    saldoSection2.style.display = 'block';

    ingresarSection2.innerHTML = `
    <h3>Monto ingresado: $ ${montoIngresado}</h3>
    <h3>Saldo actual: $ ${saldoCuenta}</h3>
`;
}

function Retirar() {
    const saldoSection = document.getElementById('saldoSection');
    const ingresarSection = document.getElementById('ingresarSection');
    const retirarSection = document.getElementById('retirarSection');

    saldoSection.style.display = 'none';
    ingresarSection.style.display = 'none';
    retirarSection.style.display = 'block';

    retirarSection.innerHTML = `
        <h2>Retirar Saldo</h2>
    `;
}

window.addEventListener('DOMContentLoaded', () => {
    buildMenuCuenta(cuentas, userInput)
})
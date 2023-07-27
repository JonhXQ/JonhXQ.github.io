/* Función para Traducir los tipos de Pokemons */
const tipoPokemonEsp = {};

const tipoPokemonEspañol = async () => {
    const response = await fetch(`./DB/tipoPokemonsEsp.json`);
    const data = await response.json();
    /* Almacenar las traducciones en el objeto tipoPokemonEsp */
    Object.assign(tipoPokemonEsp, data);
}

tipoPokemonEspañol();

/* Función para determinar la paginación de los Pokemon */
let offset = 1;
let limit = 23;

const anterior = document.querySelector('#anterior');
const siguiente = document.querySelector('#siguiente');

anterior.addEventListener('click', () => {
    if (offset != 1) {
        offset -= (limit + 1);
        removeChildNodes(contenedorPokemons);
        rangoPokemon(offset, limit);
    }
});

siguiente.addEventListener('click', () => {
    offset += (limit + 1);
    removeChildNodes(contenedorPokemons);
    rangoPokemon(offset, limit);
});

/* Función fetch para el JSON de los Pokemon */

const fetchPokemon = async () => {
    const response = await fetch(`./DB/pokemons.json`);
    return await response.json();
};

const rangoPokemon = async (offset, limit) => {
    const data = await fetchPokemon();

    for (let id = offset; id <= offset + limit; id++) {
        const POKEMON = data.find(pokemon => pokemon.id === id);
        tarjetaPokemon(POKEMON);
    }
};

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/* Función para generar las tarjetas de los Pokemon */

const contenedorPokemons = document.querySelector('.contenedor-pokemons')

function tarjetaPokemon(pokemon) {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta-pokemon');

    const contenedorImagen = document.createElement('div');
    contenedorImagen.classList.add('contenedor-imagen');

    const imagenPokemon = document.createElement('img');
    imagenPokemon.src = pokemon.ThumbnailImage;

    contenedorImagen.appendChild(imagenPokemon);

    const numeroPokemon = document.createElement('p');
    numeroPokemon.textContent = `N.° ${pokemon.number}`;

    const nombrePokemon = document.createElement('p');
    nombrePokemon.classList.add('nombre-pokemon');
    nombrePokemon.textContent = pokemon.name;

    /* Definir los tipos del pokemon */
    const tiposPokemon = document.createElement('div')
    tiposPokemon.classList.add('tipos-pokemon');

    pokemon.type.forEach(tipo => {
        /* Obtener la traducción del tipo */
        const tipoEsp = tipoPokemonEsp[tipo.toLowerCase()] || tipo;
        const tipoPokemon = document.createElement('span');
        tipoPokemon.textContent = tipoEsp;
        tipoPokemon.classList.add(`tipo-${tipoEsp.toLowerCase()}`);
        tiposPokemon.appendChild(tipoPokemon);
    });

    tarjeta.appendChild(contenedorImagen);
    tarjeta.appendChild(numeroPokemon);
    tarjeta.appendChild(nombrePokemon);
    tarjeta.appendChild(tiposPokemon);

    tarjeta.addEventListener('click', () => {
        mostrarModal(pokemon);
    });

    contenedorPokemons.appendChild(tarjeta);
}

// Función para mostrar el modal con información detallada del Pokémon
function mostrarModal(pokemon) {
    const modalTitle = document.getElementById('nombrePokemon');
    const modalPeso = document.getElementById('pesoPokemon');
    const modalAltura = document.getElementById('alturaPokemon');

    modalTitle.textContent = `${pokemon.name} (N.° ${pokemon.number})`;
    modalPeso.textContent = `${pokemon.weight} kg`;
    modalAltura.textContent = `${pokemon.height} cm`;

    const modal = new bootstrap.Modal(document.getElementById('modalPokemon'));
    modal.show();
}

rangoPokemon(offset, limit);
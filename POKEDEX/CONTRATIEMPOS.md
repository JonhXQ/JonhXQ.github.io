# CONTRATIEMPOS DURANTE EL PROYECTO *POKEDEX*

## Access to fetch has been blocked by CORS policy: No 'Access-Control-Allow-Origin'
El error `No 'Access-Control-Allow-Origin'` ocurre debido a las restricciones de seguridad CORS que impiden que el código JavaScript en un dominio acceda a recursos de otro dominio sin el permiso explícito del servidor. **CORS** (Cross-Origin Resource Sharing) es una política de seguridad implementada en los navegadores web para proteger a los usuarios contra solicitudes HTTP.

Postman no aplica las mismas restricciones de seguridad de origen cruzado que los navegadores web. Por lo tanto, se pueden realizar solicitudes desde Postman a cualquier servidor sin que CORS sea un problema, incluso si el servidor no tiene configuradas las cabeceras CORS adecuadas.

``` JavaScript
function pokemon(){
fetch(`https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

pokemon();
```

* ### ALTERNATIVA 1
    Implementar dentro de la sintaxis del fetch el parámetro `mode`, seleccionado el modo deseado para la solicitud:

    ``` JavaScript
    function pokemon(){
        fetch(`https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json`,
            {
                mode: 'cors'
            }
        )
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

    pokemon();
    ```
    * ### IMPEDIMENTO
        Los encabezados CORS del servidor no están correctamente configurados, al no tener acceso directo al servidor para corregirlos, el `mode: 'cors'` no es suficiente para resolver el problema del error `No 'Access-Control-Allow-Origin'`

* ### ALTERNATIVA 2
    Implementar una extensión de navegador para agregar encabezados personalizados o realizar solicitudes a través de su propio contexto, evitando así el problema de CORS. Una propuesta proporcionada por el asesor Francisco Campos sería: 

    ```
    https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf
    ```

    * ### IMPEDIMENTO
        Al utilizar una extensión para solucionar el problema de CORS, se está agregando una dependencia externa al sitio web. Esto significa que los futuros usuarios van a requerir de la extensión para el correcto funcionamiento del sitio. La extensión solo debe considerarse como medida temporal y para propósitos de desarrollo y pruebas locales, no para implementación en producción.

* ### SOLUCIÓN
    Si el archivo JSON no se actualiza con frecuencia, se puede descargar y alojar en un servidor propio. De esta manera, se realizarán las solicitudes `fetch` desde el mismo dominio en una ubicación accesible desde el servidor local, evitando problemas con el **CORS**.

    ``` JavaScript
    function pokemon(){
        fetch(`./DB/pokemons.json`)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

    pokemon();
    ```

## SyntaxError: Unexpected non-whitespace character after JSON at position 577470
Este error indica que existe una mala sintaxis en la respuesta JSON. Esto generalmente significa que el JSON es incorrecto o está incompleto después de esa posición.

* ### SOLUCIÓN
    Al verificar el contenido del JSON en la línea 577470 se muestra que existe un conflicto de llaves de cierre, pues todos los elementos del objeto están duplicados. Aprovechando que el JSON esta alojado en un servidor local, se borran los elementos duplicados y desaparece el conflicto de sintaxis en la respuesta JSON.

## Acceso a los pokemon por índice
Una de las formas más sencillas para acceder a un conjunto de pokemons en especifico con la función `fetch`, dentro de la promesa devuelta, es mediante su índice dentro del arreglo. La problemática surge al percatarnos de que el JSON tiene pokemon repetidos, por lo tanto, al mismo pokemon le puede corresponder diferentes indices dentro del arreglo.

``` JavaScript
function pokemon(id){
    fetch(`./DB/pokemons.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data[id]);
        })
        .catch(error => console.log(error));
}

function pokemons(numero){
    for(let i = 1; i <= numero; i++){
        pokemon(i);
    }
}

pokemons(9);
```


* ### SOLUCIÓN
    Dentro de las propiedades que se determinan en el arreglo está el ***"id"***, el cual es único para cada pokemon, y solo será devuelta la primera coincidencia así existan varías, para acceder al ***"id"*** se emplea el método `find`:

    ``` JavaScript
    function pokemon(id){
        fetch(`./DB/pokemons.json`)
            .then(response => response.json())
            .then(data => {
                console.log(data.find(pokemon => pokemon.id === id));
            })
            .catch(error => console.log(error));
    }

    function pokemons(numero){
        for(let i = 1; i <= numero; i++){
            pokemon(i);
        }
    }

    pokemons(9);
    ```

## Solicitudes fetch asíncronas
Al momento de solicitar los primeros nueve pokemon, estos tienen una probabilidad de aparecer desordenados, esto se debe a que las solicitudes `fetch` son asíncronas, lo que significa que no se espera a que una solicitud termine para continuar con la siguiente, por lo tanto, los resultados pueden pueden llegar en cualquier orden, dependiendo de cuál termine primero.

* ### SOLUCIÓN
    Si deseamos que los pokemons se muestren en orden según su ***`id`***, se puede emplear la función `async/await` junto con un bucle `for` para asegurar que las solicitudes `fetch` se realicen de forma ordenada:

    ``` JavaScript
    async function pokemon(id) {
        const response = await fetch('./DB/pokemons.json');
        const data = await response.json();
        return console.log(data.find(pokemon => pokemon.id === id));
    }

    async function pokemons(numero) {
        for (let i = 1; i <= numero; i++) {
            await pokemon(i);
        }
    }

    pokemons(9);
    ```
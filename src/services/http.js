export{obtenerDatosJSON};

// Función para obtener los datos JSON de la API
async function obtenerDatosJSON(url) {
    let response = await fetch(url);
    let json = await response.json();
    return json;
}
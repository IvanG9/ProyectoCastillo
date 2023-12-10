export {signUpSupabase, supaRequest, loginSupabase, getData, getFileRequest, fileRequest, updateData, createData};

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3anBsdGt6cnhnZXJvaG9tcWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjYzMjIsImV4cCI6MjAxNDg0MjMyMn0.ObkdKhGfGVWjsA6BAx24bqBh65ub79ekTH34p5tR3vI';
const urlBase = 'https://pwjpltkzrxgerohomqgf.supabase.co';
const headers = {
    apikey: SUPABASE_KEY,
    'Content-Type': 'application/json',
}

async function supaRequest(url, method, headers, body) {

    const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body), // En cas d'enviar dades per post, put patch...
    });

    if (response.status >= 200 && response.status <= 300) { // En cas d'error en el servidor
        if (response.headers.get('content-type')) { // Si retorna un JSON
            console.log("Todo correcto");
            return await response.json();
        }
        console.log("Objeto vacio");
        return {};
    }

    console.log("Problemas con el servidor");
    return Promise.reject(await response.json());
}

async function signUpSupabase(email, password) {
    const url = `${urlBase}/auth/v1/signup`;
    const data = await supaRequest(url, 'post', headers, {email, password});
    return data;
}


async function loginSupabase(email, password) {
    const url = `${urlBase}/auth/v1/token?grant_type=password`;
    const data = await supaRequest(url, 'post', headers, {email, password});
    return data;
}

async function getData(URI, token) {
    const url = `${urlBase}/rest/v1/${URI}`;
    const headersAux = {...headers, Authorization: `Bearer ${token}`};
    const data = await supaRequest(url, 'get', headersAux);
    return data;
}

async function updateData(URI, token, data) {
    const url = `${urlBase}/rest/v1/${URI}`;
    const headersAux = {
        ...headers,
        Authorization: `Bearer ${token}`,
        Prefer: 'return=representation',
    };
    const response = await supaRequest(url, 'PATCH', headersAux, data);
    return response;
}

async function createData(URI, token, data) {
    const url = `${urlBase}/rest/v1/${URI}`;
    const headersAux = {
        ...headers,
        Authorization: `Bearer ${token}`,
        Prefer: 'return=representation',
    };
    const response = await supaRequest(url, 'post', headersAux, data);
    return response;
}

async function fileRequest(url, body, token) {
    const headersFile = {
        apiKey: SUPABASE_KEY,
        Authorization: `Bearer ${token}`,
        "x-upsert": true, // Necessari per a sobreescriure
    };
    const response = await fetch(`${urlBase}${url}`, {
        method: "POST",
        headers: headersFile,
        body,
    });
    if (response.status >= 200 && response.status <= 300) {
        if (response.headers.get("content-type")) {
            const datos = await response.json(); // Retorna un json amb la ruta relativa.
            datos.urlAvatar = `${urlBase}${url}`; // El que
            return datos;
        }
        return {};
    }

    return Promise.reject(await response.json());
}

async function getFileRequest(url, token) {
    const headersFile = {
        apiKey: SUPABASE_KEY,
        Authorization: `Bearer ${token}`,
    };
    const response = await fetch(`${url}`, {
        method: 'GET',
        headers: headersFile,

    });
    if (response.status >= 200 && response.status <= 300) {
        if (response.headers.get('content-type')) {
            const datos = await response.blob();
            return datos;
        }
        return {};
    }

    return Promise.reject(await response.json());
}
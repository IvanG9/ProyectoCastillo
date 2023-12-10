import {generarContenidoHTMLLogin} from '../components/views/login.js';
import {generarContenidoHTMLRegistro} from '../components/views/registro.js';
import {generarContenidoHTML4EnRaya} from "../components/views/cuatroView.js";
import {profileForm} from "../components/views/profile.js";

export {router};

const router = async (ruta) => {

    let contenedor = document.querySelector("#main");

    switch (ruta) {
        case '#/':
            contenedor.innerHTML = '';
            contenedor.innerHTML = `<h1>Home</h1>`;
            break;
        case '#/login':
            contenedor.innerHTML = '';
            contenedor.append(generarContenidoHTMLLogin());
            break;
        case '#/register':
            contenedor.innerHTML = '';
            contenedor.append(generarContenidoHTMLRegistro());
            break;
        case '#/4enRaya':
            contenedor.innerHTML = '';
            contenedor.append(generarContenidoHTML4EnRaya());
            break;
        case '#/profile':
            contenedor.innerHTML = '';
            contenedor.append(profileForm());
            break;
        default:
            window.location.hash = '#/';
    }
};


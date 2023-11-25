export {router};
import {generarContenidoHTMLLogin} from '../components/views/loginView.js';
import {generarContenidoHTMLRegistro} from '../components/views/registroView.js';
import {generarContenidoHTML4EnRaya} from "../components/views/4enRaya";

const router = async (ruta) => {

    let contenedor = document.querySelector("#main");

    switch (ruta) {
        case '#/':
            contenedor.innerHTML = `<h1>Home</h1>`;
            break;
        case '#/login':
            contenedor.innerHTML = generarContenidoHTMLLogin();
            break;
        case '#/register':
            contenedor.innerHTML = generarContenidoHTMLRegistro();
            break;
        case '#/4enRaya':
            contenedor.innerHTML = generarContenidoHTML4EnRaya(6,7);
            break;
        default:
            window.location.hash = '#/';
    }
};


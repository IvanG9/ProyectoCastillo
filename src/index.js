// Importar un módulo o una biblioteca
import _ from 'lodash';
import './css/style.css';
import './css/styles.scss';
import './css/4EnRaya.css';
import * as bootstrap from 'bootstrap';
import {router} from './routers/router.js';

(() => {
    document.addEventListener("DOMContentLoaded", async () => {

        // Función para manejar el evento hashchange
        function manejarCambioRuta() {
            const ruta = window.location.hash;
            router(ruta);
        }

        // Escuchar el evento hashchange
        window.addEventListener('hashchange', manejarCambioRuta);
        // Llamar a la función router inicialmente para cargar la ruta actual
        manejarCambioRuta();

    });
})();


import {SIUrls, LMUrls, FOLUrls} from './paths';

export class SourceIframeMaker {
    private static subject: string;
    private static unit: string;

    static source(path: string): string {

        this.guard(path);
        this.splitPath(path);

        // El 10 no lo resolvemos.
        return this.resolveSource();

    }

    private static resolveSource() {

        if (this.subject === 'sistemas-informaticos' && SIUrls[this.unit]) {
            return `https://gutifer666.github.io/daw-chat/sistemas-informaticos/${SIUrls[this.unit]}`;
        }

        if (this.subject === 'bases-de-datos' && this.unit === '7') {
            return 'https://gutifer666.github.io/daw-chat/bases-de-datos/ut7/educacionadistancia.juntadeandalucia.es_formacionprofesional_blocks_recopila_recopila.php_id=3997&dopt=1.html';
        }

        if (this.subject === 'despliegue-de-aplicaciones' && this.unit === '5') {
            return 'https://gutifer666.github.io/daw-chat/despliegue-de-aplicaciones/ut5/educacionadistancia.juntadeandalucia.es_formacionprofesional_blocks_recopila_recopila.php_id=4057&dopt=1.html';
        }

        // extraer a PDFRepository (Medium)
        if (this.subject === 'desarrollo-web-en-entorno-cliente' ||
            this.subject === 'desarrollo-web-en-entorno-servidor' ||
            this.subject === 'diseno-de-interfaces-web') {

            return 'DWEC/1_Arquitecturas_y_lenguajes_de_programacion_en_clientes_web_JavaScript.pdf';
        }

        if (this.subject === 'lenguajes-de-marcas' && LMUrls[this.unit]) {
            return `https://gutifer666.github.io/daw-chat/lenguajes-de-marcas/${LMUrls[this.unit]}`;
        }

        if (this.subject === 'formacion-y-orientacion-laboral' && FOLUrls[this.unit]) {
            return `https://gutifer666.github.io/daw-chat/formacion-y-orientacion-laboral/${FOLUrls[this.unit]}`;
        }

        return `https://gutifer666.github.io/daw-chat/${(this.subject)}/ut${this.unit}/recopila.html`;
    }

    private static splitPath(path: string) {

        const parts = path.split('/');

        if (parts.length !== 2) {
            throw new Error('Invalid path format. Expected format: category/init');
        }

        this.subject = parts[0];
        this.unit = parts[1].replace('ut', '');
    }

    private static guard(path: string) {

        if (!path) {
            throw new Error('Path is undefined or empty');
        }

    }
}

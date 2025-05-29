export class SourceIframeMaker {
  private static subject: string;
  private static unit: string;

  static source(path: string | undefined): string {
    if (!path) {
      throw new Error('Path is undefined or empty');
    }
    const parts = path.split('/');
    if (parts.length !== 2) {
      throw new Error('Invalid path format. Expected format: category/init');
    }
    this.subject = parts[0];
    console.log(this.subject);
    this.unit = parts[1].replace('ut', '');
    console.log(this.unit);

    const SIUrls: { [key: string]: string } = {
      '1': 'ut1/SI01.html',
      '2': 'ut2/SI01.html',
      '3': 'ut3/redes-de-ordenadores.html',
      '4': 'ut4/instalacion-y-configuracion-windows.html',
      '5': 'ut5/administracion-basica-del-sistema-windows-II.html',
      '6': 'ut6/administracion-de-redes-windows-III.html',
      '7': 'ut7/instalacion-y-configuracion-linux-I.html',
      '8': 'ut8/administracion-basica-del-sistema-linux-II.html',
      '9': 'ut9/administracion-de-la-red-linux-III.html',
    };

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

    const LMUrls: { [key: string]: string } = {
      '1': 'ut1/LM01.html',
      '2': 'ut2/LM02.html',
      '3': 'ut3/sindicacion-de-contenidos.html',
      '4': 'ut4/definicion-de-esquemas-y-vocabularios-en-xml.html',
      '5': 'ut5/conversion-y-adaptacion-de-documentos-xml.html',
      '6': 'ut6/almacenamiento-de-informacion.html'
    };

    if (this.subject === 'lenguajes-de-marcas' && LMUrls[this.unit]) {
      return `https://gutifer666.github.io/daw-chat/lenguajes-de-marcas/${LMUrls[this.unit]}`;
    }

    const FOLUrls: { [key: string]: string } = {
      '1': 'ut1/la-relacion-laboral-individual.html',
      '2': 'ut2/la-relacion-colectiva-en-el-trabajo.html',
      '3': 'ut3/la-relacion-colectiva-en-el-trabajo.html',
      '4': 'ut4/FOL04.html',
      '5': 'ut5/plan-de-prevencion-de-la-empresa.html',
      '6': 'ut6/medidas-de-prevención-y-proteccion.html',
      '7': 'ut7/recopila.html',
      '8': 'ut8/FOL08.html',
    };

    if (this.subject === 'formacion-y-orientacion-laboral' && FOLUrls[this.unit]) {
      return `https://gutifer666.github.io/daw-chat/formacion-y-orientacion-laboral/${FOLUrls[this.unit]}`;
    }


    return `https://gutifer666.github.io/daw-chat/${(this.subject)}/ut${this.unit}/recopila.html`;

  }

}

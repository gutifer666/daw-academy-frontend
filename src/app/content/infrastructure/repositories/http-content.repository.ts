import { ContentRepository } from '../../domain/content-repository.interface';
import { ContentPath } from '../../domain/content-path';
import { ContentSource } from '../../domain/content-source';
import { SIUrls, LMUrls, FOLUrls } from '../../domain/paths';

/**
 * HTTP-based implementation of ContentRepository
 * This implementation replicates the logic from SourceIframeMaker
 * but follows the repository pattern for better testability and flexibility
 */
export class HttpContentRepository implements ContentRepository {
  private readonly baseUrl = 'https://gutifer666.github.io/daw-chat';

  async resolveContentSource(contentPath: ContentPath): Promise<ContentSource> {
    const url = this.buildUrl(contentPath);
    return new ContentSource(url);
  }

  async isSupported(contentPath: ContentPath): Promise<boolean> {
    try {
      // Check if we can build a URL for this path
      this.buildUrl(contentPath);
      return true;
    } catch {
      return false;
    }
  }

  private buildUrl(contentPath: ContentPath): string {
    const subject = contentPath.subject;
    const unit = contentPath.unit;

    // Handle specific subjects with custom URL mappings
    if (subject === 'sistemas-informaticos' && SIUrls[unit]) {
      return `${this.baseUrl}/sistemas-informaticos/${SIUrls[unit]}`;
    }

    if (subject === 'bases-de-datos' && unit === '7') {
      return `${this.baseUrl}/bases-de-datos/ut7/educacionadistancia.juntadeandalucia.es_formacionprofesional_blocks_recopila_recopila.php_id=3997&dopt=1.html`;
    }

    if (subject === 'despliegue-de-aplicaciones' && unit === '5') {
      return `${this.baseUrl}/despliegue-de-aplicaciones/ut5/educacionadistancia.juntadeandalucia.es_formacionprofesional_blocks_recopila_recopila.php_id=4057&dopt=1.html`;
    }

    if (subject === 'programacion' && unit === '10') {
      return `${this.baseUrl}/programacion/ut10/educacionadistancia.juntadeandalucia.es_formacionprofesional_blocks_recopila_recopila.php_id=4052&dopt=1.html`;
    }

    // Handle PDF subjects
    if (subject === 'desarrollo-web-en-entorno-cliente' ||
        subject === 'desarrollo-web-en-entorno-servidor' ||
        subject === 'diseno-de-interfaces-web') {
      return 'DWEC/1_Arquitecturas_y_lenguajes_de_programacion_en_clientes_web_JavaScript.pdf';
    }

    if (subject === 'lenguajes-de-marcas' && LMUrls[unit]) {
      return `${this.baseUrl}/lenguajes-de-marcas/${LMUrls[unit]}`;
    }

    if (subject === 'formacion-y-orientacion-laboral' && FOLUrls[unit]) {
      return `${this.baseUrl}/formacion-y-orientacion-laboral/${FOLUrls[unit]}`;
    }

    // Default URL pattern
    return `${this.baseUrl}/${subject}/ut${unit}/recopila.html`;
  }
}

import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SourceIframeMaker } from '../../domain/source-iframe-maker';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-iframe-content-view',
  templateUrl: './iframe-content-view.component.html',
  styleUrl: './iframe-content-view.component.css'
})
export class IframeContentViewComponent {
  public source: SafeResourceUrl | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener la ruta completa en lugar de solo el segmento final
    const currentUrl = this.router.url;
    // Eliminar la barra inicial para obtener el formato correcto (ej: "programacion/ut1")
    const path = currentUrl.startsWith('/') ? currentUrl.substring(1) : currentUrl;

    if (path) {
      try {
        const url = SourceIframeMaker.source(path);
        this.source = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      } catch (error) {
        console.error('Error al cargar el contenido:', error);
      }
    }
  }
}

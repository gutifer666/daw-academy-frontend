import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SourceIframeMaker } from '../../domain/source-iframe-maker';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-iframe-content-view',
  templateUrl: './iframe-content-view.component.html',
  styleUrl: './iframe-content-view.component.css'
})
export class IframeContentViewComponent {
  public source: SafeResourceUrl | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Obtiene la ruta completa, por ejemplo: 'programacion/ut1'
    const path = this.route.snapshot.routeConfig?.path;
    if (path) {
      const url = SourceIframeMaker.source(path);
      this.source = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}

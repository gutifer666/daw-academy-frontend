import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    NgIf
  ]
})
export class SideNavComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isProgrammingRoute = false;

  // Definir las lecciones de programación
  programmingLessons = [
    { path: '/programming/ut1', title: 'UT01.- Introducción a la programación.' },
    { path: '/programming/ut2', title: 'UT02.- Uso de estructuras de control.' },
    { path: '/programming/ut3', title: 'UT03.- Utilización de objetos.' },
    { path: '/programming/ut4', title: 'UT04.- Cadenas de caracteres y arrays.' },
    { path: '/programming/ut5', title: 'UT05.- Desarrollo de clases.' },
    { path: '/programming/ut6', title: 'UT06.- Utilización avanzada de clases.' },
    { path: '/programming/ut7', title: 'UT07.- Estructuras de datos internas (memoria).' },
    { path: '/programming/ut8', title: 'UT08.- Estructuras de datos externas (ficheros).' },
    { path: '/programming/ut9', title: 'UT09.- Interfaces gráficas de usuario.' },
    { path: '/programming/ut10', title: 'UT10.- Gestión de bases de datos: relacionales y orientadas a objetos. Persistencias de objetos.' },
  ];

  ngOnInit() {
    // Detectar cambios en la ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isProgrammingRoute = this.router.url.startsWith('/programming');
    });

    // Comprobar la ruta inicial
    this.isProgrammingRoute = this.router.url.startsWith('/programming');
  }
}

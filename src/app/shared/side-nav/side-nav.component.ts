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

  // Variable para almacenar la ruta actual
  currentRoute: string = '';

  // Definir los módulos principales
  mainModules = [
    { path: '', title: 'Inicio' },
    { path: '/computer-systems', title: 'Sistemas Informáticos' },
    { path: '/databases', title: 'Bases de Datos' },
    { path: '/programming', title: 'Programación' },
    { path: '/markup-languages', title: 'Lenguajes de Marcas' },
    { path: '/development-environments', title: 'Entornos de Desarrollo' },
    { path: '/training-and-job-guidance', title: 'Formación y Orientación Laboral' },
    { path: '/client-side-web-development', title: 'Desarrollo Web en Entorno Cliente' },
    { path: '/client-side-web-server', title: 'Desarrollo Web en Entorno Servidor' },
    { path: '/web-application-deployment', title: 'Despliegue de Aplicaciones Web' },
    { path: '/web-interface-design', title: 'Diseño de Interfaces Web' },
    { path: '/company-and-entrepreneurial-initiative', title: 'Empresa e Iniciativa Emprendedora' },
    { path: '/web-application-development-project', title: 'Proyecto de Desarrollo de Aplicaciones Web' },
    { path: '/training-in-workplaces', title: 'Formación en Centros de Trabajo' }
  ];

  // Definir las lecciones para cada módulo
  moduleLessons: { [key: string]: any[] } = {
    'programming': [
      { path: '/programming/ut1', title: 'UT01.- Introducción a la programación.' },
      { path: '/programming/ut2', title: 'UT02.- Uso de estructuras de control.' },
      { path: '/programming/ut3', title: 'UT03.- Utilización de objetos.' },
      { path: '/programming/ut4', title: 'UT04.- Cadenas de caracteres y arrays.' },
      { path: '/programming/ut5', title: 'UT05.- Desarrollo de clases.' },
      { path: '/programming/ut6', title: 'UT06.- Utilización avanzada de clases.' },
      { path: '/programming/ut7', title: 'UT07.- Estructuras de datos internas (memoria).' },
      { path: '/programming/ut8', title: 'UT08.- Estructuras de datos externas (ficheros).' },
      { path: '/programming/ut9', title: 'UT09.- Interfaces gráficas de usuario.' },
      { path: '/programming/ut10', title: 'UT10.- Gestión de bases de datos: relacionales y orientadas a objetos.' },
    ],
    'computer-systems': [
      { path: '/computer-systems/ut1', title: 'UT01.- Explotación de Sistemas Informáticos' },
      { path: '/computer-systems/ut2', title: 'UT02.- Instalación de Sistemas Operativos' },
      { path: '/computer-systems/ut3', title: 'UT03.- Gestión de la Información' },
      { path: '/computer-systems/ut4', title: 'UT04.- Configuración de Sistemas Operativos' },
      { path: '/computer-systems/ut5', title: 'UT05.- Conexión de Sistemas en Red' },
      { path: '/computer-systems/ut6', title: 'UT06.- Gestión de Recursos en una Red' },
      { path: '/computer-systems/ut7', title: 'UT07.- Explotación de Aplicaciones Informáticas' },
    ],
    'databases': [
      { path: '/databases/ut1', title: 'UT01.- Sistemas de Almacenamiento de Información' },
      { path: '/databases/ut2', title: 'UT02.- Diseño Lógico de Bases de Datos' },
      { path: '/databases/ut3', title: 'UT03.- Diseño Físico de Bases de Datos' },
      { path: '/databases/ut4', title: 'UT04.- Realización de Consultas' },
      { path: '/databases/ut5', title: 'UT05.- Tratamiento de Datos' },
      { path: '/databases/ut6', title: 'UT06.- Programación de Bases de Datos' },
    ],
    // Añadir definiciones para los demás módulos siguiendo el mismo patrón
  };

  ngOnInit() {
    // Detectar cambios en la ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateCurrentRoute();
    });

    // Comprobar la ruta inicial
    this.updateCurrentRoute();
  }

  // Método para actualizar la ruta actual
  updateCurrentRoute() {
    const url = this.router.url;

    // Extraer la ruta principal (primer segmento después de /)
    const mainPath = url.split('/')[1];
    this.currentRoute = mainPath;
  }

  // Método para verificar si hay un menú específico para la ruta actual
  hasSpecificMenu(): boolean {
    return this.currentRoute !== '' && this.moduleLessons[this.currentRoute] !== undefined;
  }

  // Método para obtener las lecciones de la ruta actual
  getCurrentLessons(): any[] {
    return this.moduleLessons[this.currentRoute] || [];
  }

  getModuleTitle(): string {
    const module = this.mainModules.find(module => module.path.substring(1) === this.currentRoute);
    return module?.title || this.currentRoute;
  }
}

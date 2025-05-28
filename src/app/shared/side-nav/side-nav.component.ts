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
      { path: '/programming/ut1', title: 'UT01.- Introducción a la programación' },
      { path: '/programming/ut2', title: 'UT02.- Uso de estructuras de control' },
      { path: '/programming/ut3', title: 'UT03.- Utilización de objetos' },
      { path: '/programming/ut4', title: 'UT04.- Cadenas de caracteres y arrays' },
      { path: '/programming/ut5', title: 'UT05.- Desarrollo de clases' },
      { path: '/programming/ut6', title: 'UT06.- Utilización avanzada de clases' },
      { path: '/programming/ut7', title: 'UT07.- Estructuras de datos internas (memoria)' },
      { path: '/programming/ut8', title: 'UT08.- Estructuras de datos externas (ficheros)' },
      { path: '/programming/ut9', title: 'UT09.- Interfaces gráficas de usuario' },
      { path: '/programming/ut10', title: 'UT10.- Gestión de bases de datos: relacionales y orientadas a objetos' },
    ],
    'computer-systems': [
      { path: '/computer-systems/ut1', title: 'UT01.- Hardware de un Sistema Informático' },
      { path: '/computer-systems/ut2', title: 'UT02.- Software de un Sistema Informático' },
      { path: '/computer-systems/ut3', title: 'UT03.- Redes de Ordenadores' },
      { path: '/computer-systems/ut4', title: 'UT04.- Instalación y configuración (Windows I)' },
      { path: '/computer-systems/ut5', title: 'UT05.- Administración básica del sistema (Windows II)' },
      { path: '/computer-systems/ut6', title: 'UT06.- Administración de redes (Windows III)' },
      { path: '/computer-systems/ut7', title: 'UT07.- Instalación y configuración (Linux I)' },
      { path: '/computer-systems/ut8', title: 'UT08.- Administración básica del sistema (Linux II)' },
      { path: '/computer-systems/ut9', title: 'UT09.- Administración de la red (Linux III)' },
    ],
    'databases': [
      { path: '/databases/ut1', title: 'UT01.- Almacenamiento de la información' },
      { path: '/databases/ut2', title: 'UT02.- Interpretación de Diagramas E-R' },
      { path: '/databases/ut3', title: 'UT03.- Bases de datos Relacionales' },
      { path: '/databases/ut4', title: 'UT04.- Realización de Consultas.' },
      { path: '/databases/ut5', title: 'UT05.- Tratamiento de Datos' },
      { path: '/databases/ut6', title: 'UT06.- Programación de Bases de Datos' },
      { path: '/databases/ut7', title: 'UT07.- Uso de Bases de Datos Objeto-Relaciones.' },
    ],
    'markup-languages': [
      { path: '/markup-languages/ut1', title: 'UT01.- Aspectos básicos de los lenguajes de marcas y sistemas de gestión empresarial' },
      { path: '/markup-languages/ut2', title: 'UT02.- Utilización de lenguajes de marcas en entornos web' },
      { path: '/markup-languages/ut3', title: 'UT03.- Sindicación de Contenidos' },
      { path: '/markup-languages/ut4', title: 'UT04.- Definición de esquemas y vocabularios en XML' },
      { path: '/markup-languages/ut5', title: 'UT05.- Conversión y adaptación de documentos XML' },
      { path: '/markup-languages/ut6', title: 'UT06.- Almacenamiento de información' },
    ],
    'development-environments': [
      { path: '/development-environments/ut1', title: 'UT01.- Desarrollo del software' },
      { path: '/development-environments/ut2', title: 'UT02.- Instalación y uso de entornos de desarrollo' },
      { path: '/development-environments/ut3', title: 'UT03.- Diseño y realización de pruebas' },
      { path: '/development-environments/ut4', title: 'UT04.- Optimización y documentación' },
      { path: '/development-environments/ut5', title: 'UT05.- Diseño orientado a objetos. Diagramas estructurales y de comportamiento' },
    ],
    'training-and-job-guidance': [
      { path: '/training-and-job-guidance/ut1', title: 'UT01.- Relación Laboral Individual' },
      { path: '/training-and-job-guidance/ut2', title: 'UT02.- Las relaciones colectivas de trabajo' },
      { path: '/training-and-job-guidance/ut3', title: 'UT03.- Seguridad Social' },
      { path: '/training-and-job-guidance/ut4', title: 'UT04.- Evaluación de riesgos profesionales' },
      { path: '/training-and-job-guidance/ut5', title: 'UT05.- El Plan de Prevención de la Empresa' },
      { path: '/training-and-job-guidance/ut6', title: 'UT06.- Medidas de Prevención y Protección' },
      { path: '/training-and-job-guidance/ut7', title: 'UT07.- Los equipos de trabajo y la gestión del conflicto' },
      { path: '/training-and-job-guidance/ut8', title: 'UT08.- Búsqueda de empleo' },
    ],
    'client-side-web-development': [
      { path: '/client-side-web-development/ut1', title: 'UT01.- Arquitecturas y lenguajes de programación en clientes web - JavaScript' },
      { path: '/client-side-web-development/ut2', title: 'UT02.- Modelo de objetos predefinidos en JavaScript' },
      { path: '/client-side-web-development/ut3', title: 'UT03.- Estructuras definidas por el usuario en JavaScript' },
      { path: '/client-side-web-development/ut4', title: 'UT04.- Gestión de eventos y formularios en JavaScript' },
      { path: '/client-side-web-development/ut5', title: 'UT05.- Modelo de objetos del documento en Javascript' },
      { path: '/client-side-web-development/ut6', title: 'UT06.- Programación AJAX el JavaScript' },
    ],
    'client-side-web-server': [
      { path: '/client-side-web-server/ut1', title: 'UT01.- Plataformas de programación web en entorno_ ervidor. Características del lenguaje_PHP' },
      { path: '/client-side-web-server/ut2', title: 'UT02.- Trabajar con bases de datos en PHP' },
      { path: '/client-side-web-server/ut3', title: 'UT03.- Sesiones y autenticación en PHP' },
      { path: '/client-side-web-server/ut4', title: 'UT04.- Programación orientada a objetos en PHP' },
      { path: '/client-side-web-server/ut5', title: 'UT05.- Desarrollo de aplicaciones web en Laravel' },
      { path: '/client-side-web-server/ut6', title: 'UT06.- Servicios web' },
      { path: '/client-side-web-server/ut7', title: 'UT07.- Aplicaciones web dinámicas e híbridas' },
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

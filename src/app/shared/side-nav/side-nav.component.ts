import {Component, inject, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AsyncPipe} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {Observable} from 'rxjs';
import {filter, map, shareReplay} from 'rxjs/operators';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {MAIN_MODULES, MODULE_LESSONS} from '../../content/domain/paths';

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
    RouterLink
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

  currentRoute: string = '';

  mainModules = MAIN_MODULES;
  moduleLessons = MODULE_LESSONS;

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

  updateCurrentRoute() {
    const url = this.router.url;

    this.currentRoute = url.split('/')[1];
  }

  hasSpecificMenu(): boolean {
    return this.currentRoute !== '' && this.moduleLessons[this.currentRoute] !== undefined;
  }

  getCurrentLessons(): any[] {
    return this.moduleLessons[this.currentRoute] || [];
  }

  getModuleTitle(): string {
    const module = this.mainModules.find(module => module.path.substring(1) === this.currentRoute);
    return module?.title || this.currentRoute;
  }
}

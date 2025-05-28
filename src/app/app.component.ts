import { Component } from '@angular/core';
import {SideNavComponent} from './shared/side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  imports: [SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}

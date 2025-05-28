import { Component } from '@angular/core';
import { StarCallToActionComponent } from '../../shared/start-call-to-action/star-call-to-action.component';

@Component({
  selector: 'app-home',
  imports: [StarCallToActionComponent, StarCallToActionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  repoUrl: string = 'https://github.com/gutifer666/daw-chat';
}

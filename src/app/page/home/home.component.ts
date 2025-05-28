import { Component } from '@angular/core';
import { StarCallToActionComponent } from '../../shared/start-call-to-action/star-call-to-action.component';
import { GetUtComponent } from '../../shared/start-call-to-action/get-ut.start-call-to-action';

@Component({
  selector: 'app-home',
  imports: [StarCallToActionComponent, GetUtComponent, StarCallToActionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  repoUrl: string = 'https://github.com/gutifer666/daw-chat';
}

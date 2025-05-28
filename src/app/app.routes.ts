import { Routes } from '@angular/router';
import { HomeComponent } from './section/home/home.component';
import {ProgrammingComponent} from './section/programming/programming.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'programming', component: ProgrammingComponent}
];

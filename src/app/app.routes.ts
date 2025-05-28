import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import {Ut1Component} from './page/programming/ut1/ut1.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'programming', component: Ut1Component}
];

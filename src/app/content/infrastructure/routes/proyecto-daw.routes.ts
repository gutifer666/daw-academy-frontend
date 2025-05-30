import { Routes } from '@angular/router';
import { HomeComponent } from '../../../section/home/home.component';
import { IframeContentViewComponent } from '../../application/iframe-content-view/iframe-content-view.component';

export const PROYECTO_DAW_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ut1', component: IframeContentViewComponent },
];

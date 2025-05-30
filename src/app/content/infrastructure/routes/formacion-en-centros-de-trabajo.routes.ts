import { Routes } from '@angular/router';
import { HomeComponent } from '../../../section/home/home.component';
import {ContentMakerComponent} from '../../content-maker.component';

export const FORMACION_EN_CENTROS_DE_TRABAJO_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ut1', component: ContentMakerComponent },
];

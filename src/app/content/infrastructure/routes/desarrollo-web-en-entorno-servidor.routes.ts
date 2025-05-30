import { Routes } from '@angular/router';
import { HomeComponent } from '../../../section/home/home.component';
import {ContentMakerComponent} from '../../content-maker.component';

export const DESARROLLO_WEB_EN_ENTORNO_SERVIDOR_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ut1', component: ContentMakerComponent },
  { path: 'ut2', component: ContentMakerComponent },
  { path: 'ut3', component: ContentMakerComponent },
  { path: 'ut4', component: ContentMakerComponent },
  { path: 'ut5', component: ContentMakerComponent },
  { path: 'ut6', component: ContentMakerComponent },
  { path: 'ut7', component: ContentMakerComponent },
];

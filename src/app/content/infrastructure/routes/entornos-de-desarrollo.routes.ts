import { Routes } from '@angular/router';
import { HomeComponent } from '../../../section/home/home.component';
import {ContentMakerComponent} from '../../../section/content/content-maker.component';

export const ENTORNOS_DE_DESARROLLO_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ut1', component: ContentMakerComponent },
  { path: 'ut2', component: ContentMakerComponent },
  { path: 'ut3', component: ContentMakerComponent },
  { path: 'ut4', component: ContentMakerComponent },
  { path: 'ut5', component: ContentMakerComponent },
];

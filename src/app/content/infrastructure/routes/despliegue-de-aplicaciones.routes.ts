import { Routes } from '@angular/router';
import { HomeComponent } from '../../../section/home/home.component';
import { IframeContentViewComponent } from '../../application/iframe-content-view/iframe-content-view.component';

export const DESPLIEGUE_DE_APLICACIONES_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ut1', component: IframeContentViewComponent },
  { path: 'ut2', component: IframeContentViewComponent },
  { path: 'ut3', component: IframeContentViewComponent },
  { path: 'ut4', component: IframeContentViewComponent },
  { path: 'ut5', component: IframeContentViewComponent },
];

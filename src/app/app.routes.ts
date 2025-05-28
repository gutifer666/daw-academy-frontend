import { Routes } from '@angular/router';
import { HomeComponent } from './section/home/home.component';
import {ProgrammingComponent} from './section/programming/programming.component';
import {IFrameComponent} from './shared/iframe/iframe.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'programming', component: ProgrammingComponent},
  { path: 'programming/ut1', component: IFrameComponent },
  { path: 'programming/ut2', component: IFrameComponent },
  { path: 'programming/ut3', component: IFrameComponent },
  { path: 'programming/ut4', component: IFrameComponent },
  { path: 'programming/ut5', component: IFrameComponent },
  { path: 'programming/ut6', component: IFrameComponent },
  { path: 'programming/ut7', component: IFrameComponent },
  { path: 'programming/ut8', component: IFrameComponent },
  { path: 'programming/ut9', component: IFrameComponent },
  { path: 'programming/ut10', component: IFrameComponent }
];

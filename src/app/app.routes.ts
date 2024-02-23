import { Routes } from '@angular/router';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';

export const routes: Routes = [
  { path: 'step-one', component: StepOneComponent },
  { path: 'step-two', component: StepTwoComponent },
  { path: 'step-three', component:  StepThreeComponent},
  { path: '', component: StepOneComponent },
  { path: '**', component: StepOneComponent }
];

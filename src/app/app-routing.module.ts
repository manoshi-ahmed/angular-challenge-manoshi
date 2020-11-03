import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrolleesComponent } from './enrollees/enrollees.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: EnrolleesComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

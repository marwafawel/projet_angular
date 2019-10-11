import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';

import { FicheConducteurComponent } from './fiche-conducteur/fiche-conducteur.component';


const routes: Routes = [
  {
    path: 'list',
    component: ListComponent
},
{
    path: 'add',
    component: FicheConducteurComponent
},
{
    path: 'update/:id',
    component: FicheConducteurComponent
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConducteurRoutingModule { }

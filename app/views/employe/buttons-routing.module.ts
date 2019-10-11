import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee.component';
import { DropdownsComponent } from './liste_employee.component';
import { BrandButtonsComponent } from './brand-buttons.component';
/********** */
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'employé'
    },
    children: [
      {
        path: 'Fiche',
        component: EmployeeComponent,
        //redirectTo: 'buttons'
      },
      {
        path: 'Fiche/:employeeId',
        component: EmployeeComponent,
        data: {
          title: 'Fiche employé'
        }
      },
      {
        path: 'Liste',
        component: DropdownsComponent,
        data: {
          title: 'Liste des employées'
        }
      },
      {
        path: 'Historique/:id',
        component: BrandButtonsComponent,
        data: {
          title: 'Historique'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonsRoutingModule {}

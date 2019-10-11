import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'vehicule',
        loadChildren: './vehicule-site-secondaire/vehicule-site-secondaire.module#VehiculeSiteSecondaireModule'
    },
    {
        path: 'amende',
        loadChildren: './site-secondaire/site-secondaire.module#SiteSecondaireModule'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecondaireRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { VehiculeService } from '../../../core/services/vehicule.service';
import { Vehicule } from '../../../shared/model/vehicule.model';
import { VehiculeConducteur } from '../../../shared/model/vehicule-conducteur';
import { Conducteur } from '../../../shared/model/conducteur';
import { ConducteursService } from '../../../core/services/conducteurs.service';

@Component({
    selector: 'app-edit-vehicule',
    templateUrl: './edit-vehicule.component.html',
    styleUrls: ['./edit-vehicule.component.scss']
})
export class EditVehiculeComponent implements OnInit {
    vehicule: Vehicule = new Vehicule();
    list_employe_site_vehicule: VehiculeConducteur[] = [];
    conducteurs: Conducteur[] = []

    constructor(
        private activatedRoute: ActivatedRoute,
        private vehiculeservice: VehiculeService,
        private conducteursService: ConducteursService
    ) {
        this.activatedRoute.params.subscribe(params => {
            var id = params['id'];
            if (!id)
                return;
            this.vehiculeservice.getvehicule(id).subscribe(
                (response: Vehicule) => {
                    console.log("response==============================", response);
                    //this.post = response;
                    //this.image = response.documents;
                    this.vehicule = Object.assign({}, response);
                    //this.vehiculeservice.selectedVehicule.file = new DocVehicule();



                    this.vehicule.vehicule_employee = new VehiculeConducteur();
                    this.vehiculeservice.getconducteur_vehicule(this.vehicule.vehiculeId).subscribe(
                        (result1: VehiculeConducteur[]) => {
                            console.log("result1==============================", result1);
                            //afficher liste 
                            this.list_employe_site_vehicule.push(...result1);
                        },
                        (error) => { }
                    );
                }
            );
        });
        this.conducteursService.get().subscribe(
            (conducteurs: Conducteur[]) => {
                this.conducteurs = conducteurs;
            },
            (error) => { }
        );
    }

    ngOnInit() {
    }

    getConducteurNom(id) {
        return this.conducteurs.find(item => item.conducteurId == id).nom;
    }
}

import { Component, OnInit } from '@angular/core';
import { Amande } from '../../../shared/model/amande';
import { Site } from '../../../shared/model/site.model';
import { AmandeService } from '../../../core/services/amande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from '../../../core/services/site.service';
import { VehiculeService } from '../../../core/services/vehicule.service';
import { Vehicule } from '../../../shared/model/vehicule.model';
import { Conducteur } from '../../../shared/model/conducteur';
import { ConducteursService } from '../../../core/services/conducteurs.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-fiche-amende',
    templateUrl: './fiche-amende.component.html',
    styleUrls: ['./fiche-amende.component.scss']
})
export class FicheAmendeComponent implements OnInit {
    amende: Amande = new Amande();
    id: string;
    sites: Site[] = [];
    vehicules:Vehicule[] = [];
    conducteurs:Conducteur[] = [];

    constructor(
        private amendeservice: AmandeService,
        private activatedRoute: ActivatedRoute,
        private siteService: SiteService,
        private vehiculeservice: VehiculeService,
        private conducteurService:ConducteursService,
        private router: Router
    ) {
        this.activatedRoute.params.subscribe(params => {
            if (params['id']) {
                this.id = params['id'];
                this.amendeservice.getById(this.id).subscribe(
                    (amende: Amande) => this.amende = amende,
                    error => console.log(error)
                )
            }
            
        });
        this.conducteurService.get().subscribe(
            (rslt: Conducteur[]) => {
                this.conducteurs = rslt;
              //  console.log('this.vehicules', this.vehicules);
            }
        );
  //get vehicule 
  
        this.siteService.refreshList().subscribe(
            (result) => {
                this.sites = result;
                console.log('this.sites', this.sites);
            }
        );
        //get vehicule dropdownliste
       this.vehiculeservice.refreshListVehicule().subscribe(
            (veh) => {
                this.vehicules = veh;
                console.log('this.vehicules', this.vehicules);
            }
        );
      
    }
    ngOnInit() {
    }

    updateRecord(form: NgForm) {
        const amende = Object.assign({}, this.amende);
        delete amende.vehicule;
        delete amende.conducteur;
        delete amende.site;
        this.amendeservice.put(amende).subscribe(
            (res: Amande) => {
                this.router.navigate(['/secondaire/amende/list']);

                // this.resetForm(form);
                //this.toastr.success('Submitted successfully', 'Payment Detail Register');
                //this.employeeservice.refreshListEmployee();

            },
            err => { console.log(err); }
        )
    }

    ChangingCIN(event) {
        console.log(event.target.value);
        const conducteur: Conducteur = this.conducteurs.find(c => c.conducteurId == event.target.value);
        console.log(conducteur);
        if (!this.amende.conducteur) {
            this.amende.conducteur = new Conducteur();
        }
        this.amende.conducteurId = conducteur.conducteurId;
        this.amende.conducteur.conducteurId = conducteur.conducteurId;
        this.amende.conducteur.nom = conducteur.nom;
    }

    // upload signature
    selectFile(event) {
        if (event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                console.log(reader.result);
                this.amende.fiche_Amende = reader.result.toString();
            };
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Amande } from '../../shared/model/amande';
import { AmandeService } from '../../core/services/amande.service';
import { SiteService } from '../../core/services/site.service';
import { Site } from '../../shared/model/site.model';
import { Vehicule } from '../../shared/model/vehicule.model';
import { VehiculeService } from '../../core/services/vehicule.service';
import { Conducteur } from '../../shared/model/conducteur';
import { ConducteursService } from '../../core/services/conducteurs.service';


@Component({
    selector: 'app-fiche',
    templateUrl: './fiche.component.html',
    styleUrls: ['./fiche.component.scss']
})
export class FicheComponent implements OnInit {
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
    ) {
        if (this.amendeservice.isOcr) {
            console.log(this.amendeservice.ocrImageData);
            this.amendeservice.isOcr = false;
            const data = this.amendeservice.ocrImageData;
          //The split() method is used to split a string into an array of substrings
            var lines = data.split('\n');
            for(var i = 0;i < lines.length;i++){
                //code here using lines[i] which will give you each line
            }
            // get num Avis
            //trim :supprimer les espace etdiviser en sous chaine puis  mettre dans un tableau de string
            //The trim() method removes whitespace from both sides of a string. 
           //slice () returns the selected elements in an array,
            var t = lines[3].trim().split(' ');
            this.amende.num_Avis = t[1];
            console.log(new Date(t[2]));
            // get date avis
            this.amende.date_Avis = this.formattedDate(new Date(t[2]));
            // get pays
            const lignePays = lines[12];
            const pays = lignePays.slice(lignePays.indexOf('Pays') + 5).trim();
            this.amende.lieu_Infraction = pays;
            //get n agent 
            const agent=lines[16];
             const Nagent = agent.slice(agent.indexOf('N')+3).trim();
             this.amende.num_Agent = Nagent;
             //get montant 
             const price=lines[35];
             //const montant1 = price.slice(price.indexOf('Sah')+5).trim();
             var montant1 = price.substring(16, 18);
             this.amende.montant = montant1;
             //get date 
             const date_infraction=lines[17];
             var date_inf = date_infraction.substring(16,25);
             this.amende.date_Infraction=this.formattedDate (new Date(date_inf));

        }
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

    onSubmit(form: NgForm) {
        console.log('form', form);
        if (this.amende.amendeId == null)
            this.insertRecord(form);
        else
            this.updateRecord(form);
    }

    insertRecord(form: NgForm) {
        console.log(form.value);
        const a = Object.assign({}, this.amende);
        delete a.vehicule;
        delete a.conducteur;
        delete a.site;
        this.amendeservice.post(a).subscribe(
            (res: Amande) => {

                // this.resetForm(form);
                //this.toastr.success('Submitted successfully', 'Payment Detail Register');
                //this.employeeservice.refreshListEmployee();

            },
            err => { console.log(err); }
        )
    }

    updateRecord(form: NgForm) {
        this.amendeservice.put(this.amende).subscribe(
            (res: Amande) => {

                // this.resetForm(form);
                //this.toastr.success('Submitted successfully', 'Payment Detail Register');
                //this.employeeservice.refreshListEmployee();

            },
            err => { console.log(err); }
        )
    }

    ChangingCIN(event) {
        const conducteur: Conducteur = this.conducteurs.find(c => c.conducteurId == event.target.value);
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

    formattedDate(d) {
        let dd = d.getDate();
        let mm = d.getMonth() + 1;
        let yyyy = d.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        let myDate = yyyy + '-' + mm + '-' + dd;
        return myDate;
    }
}

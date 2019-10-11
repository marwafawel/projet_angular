import { Component, OnInit } from '@angular/core';
import { Conducteur } from '../../shared/model/conducteur';
import { EmployeSite } from '../../shared/model/employe-site';

import { NgForm, FormBuilder } from '@angular/forms';
import { SiteService } from '../../core/services/site.service';
import { Site } from '../../shared/model/site.model';
import { ConducteursService } from '../../core/services/conducteurs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConducteurSite } from '../../shared/model/ConducteurSite';
import { ConducteurSiteService } from '../../core/services/ConducteurSite.service';
import { Employee } from '../../shared/model/employee.model';

@Component({
    selector: 'app-fiche-conducteur',
    templateUrl: './fiche-conducteur.component.html',
    styleUrls: ['./fiche-conducteur.component.scss'],
    providers: [ConducteursService]
})
export class FicheConducteurComponent implements OnInit {
    conducteurSites: ConducteurSite[] = [];
    conducteurSite: ConducteurSite = new ConducteurSite;
    image: any = null;
    sites: Site[];
    driver: Conducteur = new Conducteur();
    id: string;
    employee: Employee[];

    constructor(
        private conducteurService: ConducteursService,
        private siteService: SiteService,
        private router: Router,
        private _fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private route: ActivatedRoute,
        private conducteurSiteService: ConducteurSiteService
    ) {
        this.siteService.refreshList().subscribe(
            (result) => {
                this.sites = result;
                console.log('this.sites', this.sites);
            }
        );

        /*this.activatedRoute.params.subscribe(params => {
            if (params['id']) {
                this.id = params['id'];
                this.conducteurService.getById(this.id).subscribe(
                    (con: Conducteur) => this.driver = con,
                    error => console.log(error)
                )
            }
        });*/
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
    ngOnInit() {
        this.route.params.subscribe(params => {
            var id = params['id'];
            if (!id)
                return;
            this.conducteurService.getById(id).subscribe((response: Conducteur) => {
                console.log("response==============================", response);
                this.driver = response;
                this.image = response.image;
                response.date_Naisance = this.formattedDate(new Date(response.date_Naisance));
                //this.conducteurService.selectedConducteur = Object.assign({}, response);
                //this.employeeservice.selectedEmployee.employe_site = new EmployeSite();

                //push liste 
                this.conducteurSiteService.getByConducteur(response.conducteurId)
                    .subscribe(
                        (result: ConducteurSite[]) => {
                            //afficher liste 
                            this.conducteurSites.push(...result);
                        },
                        (error) => { }
                    );
            });

        });
    }

    resetForm(form?: NgForm) {
        if (form != null)
            form.reset();
        this.driver = {
            conducteurId: null,
            prenom: '',
            nom: '',
            image: '',
            cin: '',
            sexe: '',
            nationalite: '',
            date_Naisance: '',
            adresse: '',
            ville: '',
            province: '',
            codepostal: '',
            cellulaire: '',
            telephone: '',
            contact_Urgence: '',
            tel_Urgence: '',
            courriel: '',
            note: '',
            statut: '',
            userModification: '',
            dateModification: '',


            //employe_site: new EmployeSite()
        }
        this.conducteurSites = [];

    }


    onSubmit(form: NgForm) {
        const user = <Employee>JSON.parse(localStorage.getItem('user'));
        console.log('user:', user);
       
        console.log('this.image:', this.image);
        console.log('form', form);
        form.value['Image'] = this.image;
        console.log('form[Image] ', form['Image']);
        if (this.driver.conducteurId == null)
            this.insertRecord(form);
        else
            this.updateRecord(form);

    }



    insertRecord(form: NgForm) {
        const user = <Employee>JSON.parse(localStorage.getItem('user'));
        form.value.userModification = user.id;
        console.log(form.value);
        this.conducteurService.post(form.value).subscribe(
            (res: Conducteur) => {
                console.log("response==============================", res);
                this.addListeConducteurSite(res);
                this.resetForm(form);
                //this.toastr.success('Submitted successfully', 'Payment Detail Register');
                //   this.conducteurService.get();

            },
            err => { console.log(err); }
        )
    }

    updateRecord(form: NgForm) {

        this.conducteurService.put(this.driver).subscribe(
            (update: Conducteur) => {
                this.addListeConducteurSite(this.driver);

                //this.resetForm(form);
                // this.toastr.info('Submitted successfully', 'Payment Detail Register');
               // this.conducteurService.get();
            },
            err => {
                console.log(err);
            }
        )
    }

    addListeConducteurSite(conducteur: Conducteur) {
        //je vais parcourir la liste et 
        console.log('this.conducteurSites:', this.conducteurSites);
        this.conducteurSites.forEach(conducteurSite => {
            conducteurSite.conducteur = conducteur.conducteurId;
            if (conducteurSite.id) {
                this.conducteurSiteService.put(conducteurSite).subscribe(
                    result => console.log('PostEmployeeSiteAsync success')
                );
            } else {
                this.conducteurSiteService.post(conducteurSite).subscribe(
                    result => console.log('PostEmployeeSiteAsync success')
                );
            }
        })
    }


    getSiteNameById(siteId) {
        const site = this.sites.find(site => site.siteId == siteId);
        if (site)
            return site.nom_Site
        else
            return '';
    }

    addNewRow() {
        const debut: Date = new Date(this.conducteurSite.date_debut);
        const fin: Date = new Date(this.conducteurSite.date_fin);
        if (debut > fin) {
            alert('date debut doit etre inferieur a date fin !!');
            return;
        }
        const copy = Object.assign({}, this.conducteurSite);
        console.log(copy);
        this.conducteurSites.push(copy);
    }

    deleteRow(conducteurSite: ConducteurSite) {
        if (conducteurSite.id) {
            this.conducteurSiteService.delete(conducteurSite.id).subscribe(res => {
                const index = this.conducteurSites.findIndex(item => item.id == conducteurSite.id);
                this.conducteurSites.splice(index, 1);
            }, error => console.log(error)
            )
        } else {
            const index = this.conducteurSites.indexOf(conducteurSite);
            this.conducteurSites.splice(index, 1);
        }
        
    }
}

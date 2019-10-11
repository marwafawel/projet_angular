import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { VehiculeService } from '../../../core/services/vehicule.service';
import { SiteService } from '../../../core/services/site.service';
import { Site } from '../../../shared/model/site.model';
import { Employee } from '../../../shared/model/employee.model';
import { EmployeeService } from '../../../core/services/employee.service';
import { EmployeSite } from '../../../shared/model/employe-site';
import { Vehicule } from '../../../shared/model/vehicule.model';

@Component({
    selector: 'app-liste-vehicule',
    templateUrl: './liste-vehicule.component.html',
    styleUrls: ['./liste-vehicule.component.scss']
})
export class ListeVehiculeComponent implements OnInit {
    public displayedColumns = ['actions', 'matricule', 'Type_vehicule', 'marque', 'modele', 'puissance', 'userModification', 'dateModification'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: any;

    user: Employee = JSON.parse(localStorage.getItem('user'));

    sites: Site[] = [];
    vehicules: Vehicule[] = [];

    constructor(
        private vehiculeservice: VehiculeService,
        private siteService: SiteService,
        private employeeservice: EmployeeService,
        private changeDetectorRefs: ChangeDetectorRef
    ) {
        this.siteService.getByEmployee(this.user.id).subscribe(
            (sites: Site[]) => this.sites = sites,
            error => console.log(error)
        );
    }

    ngOnInit() {
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    //initialement le tableau set vide 
//event.target.value: determine l'elelment a declancher 
    getVehicule(event) {
        console.log(event.target.value);
        if (!event.target.value || event.target.value == 'selectionner') {
            this.dataSource = new MatTableDataSource();
            this.dataSource.data = [];
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.changeDetectorRefs.detectChanges();
            return;
        }
        //le tableau rempli par les véhicule 
        this.vehiculeservice.getBySite(event.target.value).subscribe(
            (vehicules: Vehicule[]) => {
                this.vehicules = vehicules;
                
                this.dataSource = new MatTableDataSource();
                this.dataSource.data = vehicules;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.changeDetectorRefs.detectChanges();
            },
            error => console.log(error)
        );
    }
}

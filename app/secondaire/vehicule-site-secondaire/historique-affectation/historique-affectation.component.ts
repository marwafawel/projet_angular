import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { VehiculeService } from '../../../core/services/vehicule.service';
import { ActivatedRoute } from '@angular/router';
import { Conducteur } from '../../../shared/model/conducteur';
import { ConducteursService } from '../../../core/services/conducteurs.service';
import { Vehicule } from '../../../shared/model/vehicule.model';
import { Employee } from '../../../shared/model/employee.model';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
    selector: 'app-historique-affectation',
    templateUrl: './historique-affectation.component.html',
    styleUrls: ['./historique-affectation.component.scss']
})
export class HistoriqueAffectationComponent implements OnInit {
    public displayedColumns = ['actions', 'vehiculeId', 'conducteurId', 'date_debut', 'date_fin', 'userModification', 'dateModification'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: any;
    id: string;
    conducteurs: Conducteur[];
    vehicules: Vehicule[];
    user: Employee = JSON.parse(localStorage.getItem('user'));
    constructor(
        private vehiculeservice: VehiculeService,
        private route: ActivatedRoute,
        private changeDetectorRefs: ChangeDetectorRef,
        private conducteurService: ConducteursService,
        private employeeservice: EmployeeService,
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'])
                //brand/:id   va prendre id de route 
                this.id = params['id'];
            /* this.employeeservice.getEmployeSiteByEmploye(this.id).subscribe(
              res => {
                this.dataSource = new MatTableDataSource();
                this.dataSource.data = res;
                console.log(this.dataSource.data);
                this.changeDetectorRefs.detectChanges();
              },
             )*/
            this.RenderDataTable();
        });
    }
    RenderDataTable() {
        this.vehiculeservice.getconducteur_vehicule(this.id).subscribe(
            res => {
                this.dataSource = new MatTableDataSource();
                this.dataSource.data = res;
                console.log(this.dataSource.data);
               // this.changeDetectorRefs.detectChanges();
            },
        )
    }
        getconducteurNameById(conducteurId){
        const conducteur = this.conducteurs.find(conducteur => conducteur.conducteurId == conducteurId)
         if(conducteur)
          return conducteur.nom
           else
          return '';
    }
    getvehiculeNameById(vehiculeId){
        const vehicule = this.vehicules.find(vehicule => vehicule.vehiculeId == vehiculeId)
         if(vehicule)
          return vehicule.matricule
           else
          return '';
    }
    
}

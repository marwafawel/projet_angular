import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EmployeeService } from '../../core/services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Site } from '../../shared/model/site.model';
import { EmployeSite } from '../../shared/model/employe-site';
import { SiteService } from '../../core/services/site.service';
import { Employee } from '../../shared/model/employee.model';



@Component({
    templateUrl: 'brand-buttons.component.html',

})
export class BrandButtonsComponent {
    public displayedColumns = ['actions', 'siteId', 'statut', 'date_debut', 'date_fin'];
    id: string;
    sites: Site[];
    post: EmployeSite[];


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: any;
   
    constructor(private employeeservice: EmployeeService,
        private route: ActivatedRoute,
        private changeDetectorRefs: ChangeDetectorRef,
        private siteService: SiteService
    ) {
        this.siteService.refreshList().subscribe(
            (sites: Site[]) => this.sites = sites,
            error => console.log(error)
        );
       
    }

    ngOnInit(): void {
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
        this.employeeservice.getEmployeSiteByEmploye(this.id).subscribe(
            res => {
                this.dataSource = new MatTableDataSource();
                this.dataSource.data = res;
                console.log(this.dataSource.data);
                this.changeDetectorRefs.detectChanges();
            },
        )
    }
    getSiteNameById(siteId) {
        const site = this.sites.find(site => site.siteId == siteId);
        if (site)
            return site.nom_Site
        else
            return '';
    }
    

    onDelete(idEmployee_Site) {
        if (confirm('Are you sure to delete this record ?')) {
            this.employeeservice.deleteemployeesite(idEmployee_Site)
                .subscribe(res => {
                  //  debugger;
                    this.RenderDataTable();
                    //this.employeeservice.getEmployeSiteByEmploye(this.id);
                    // this.toastr.warning('Deleted successfully', 'Payment Detail Register');
                },
                    err => {
                        //debugger;
                        console.log(err);
                    })
        }
    }






}

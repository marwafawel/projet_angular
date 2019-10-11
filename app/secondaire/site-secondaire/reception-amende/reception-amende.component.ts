import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AmandeService } from '../../../core/services/amande.service';
import { SiteService } from '../../../core/services/site.service';
import { Site } from '../../../shared/model/site.model';
import { Employee } from '../../../shared/model/employee.model';
import { Amande } from '../../../shared/model/amande';

@Component({
    selector: 'app-reception-amende',
    templateUrl: './reception-amende.component.html',
    styleUrls: ['./reception-amende.component.scss']
})
export class ReceptionAmendeComponent implements OnInit {
    public displayedColumns = ['actions', 'Réf_Amende', 'Statut', 'dlai_restant', 'userModification', 'dateModification'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: any;
    user: Employee = JSON.parse(localStorage.getItem('user'));
    sites: Site[] = [];
    amandes: Amande[] = [];

    constructor(
        private siteService: SiteService,
        private amendeservice: AmandeService,
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

    onDelete(amendeId) {
        if (confirm('Are you sure to delete this record ?')) {
            this.amendeservice.delete(amendeId)
                .subscribe(res => {


                    // this.toastr.warning('Deleted successfully', 'Payment Detail Register');
                },
                    err => {
                        console.log(err);
                    })
        }
    }

    getAmende(event) {
        console.log(event.target.value);
        if (!event.target.value || event.target.value == 'selectionner') {
            this.dataSource = new MatTableDataSource();
            this.dataSource.data = [];
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.changeDetectorRefs.detectChanges();
            return;
        }
        this.amendeservice.getBySite(event.target.value).subscribe(
            (amandes: Amande[]) => {
                this.amandes = amandes;

                this.dataSource = new MatTableDataSource();
                this.dataSource.data = amandes;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.changeDetectorRefs.detectChanges();
            },
            error => console.log(error)
        );
    }

    getStatut(amende: Amande) {
        if (amende.fiche_Amende) {
            return 'Acceptation envoyée';
        } else if (amende.conducteurId) {
            return 'Conducteur affecté';
        } else if (amende.siteId) {
            return 'Site affecté ';
        } else { // if (!amende.siteId && !amende.conducteurId)
            return 'Amende non affecté';
        } 
    }

    getDelaiRestant(amende: Amande) {
        const now: Date = new Date();
        const t1:number = now.getTime();
        const reception: Date = new Date(amende.creation);
        const t2: number = reception.getTime();
        const hhh: string = ((t1-t2)/(24*3600*1000)).toString();
        const difference: number = parseInt(hhh);
        if (12 - difference <0) {
            return 'Expired';
        }
        return 12 - difference;
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

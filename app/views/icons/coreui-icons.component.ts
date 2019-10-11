import { Component } from '@angular/core';
import { MatPaginator, MatSort ,MatTableDataSource} from '@angular/material';
@Component({
  templateUrl: 'coreui-icons.component.html'
})
export class CoreUIIconsComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  constructor() { }

}

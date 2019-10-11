import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems, NavData } from '../../_nav';
import { Employee } from '../../shared/model/employee.model';
import { Router } from '@angular/router';


@Component({
    selector: 'app-dashboard',
    templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
    user: Employee;
    public navItems: NavData[] = [];
    public sidebarMinimized = true;
    private changes: MutationObserver;
    public element: HTMLElement;
    constructor( private router: Router,@Inject(DOCUMENT) _document?: any) {
        navItems.forEach(item => this.navItems.push(Object.assign({}, item)));
        console.log(this.navItems);
        const user: Employee = JSON.parse(localStorage.getItem('user'));
        this.navItems = this.navItems.filter(item => item.roles && item.roles.includes(user.roleSpecific));

        this.changes = new MutationObserver((mutations) => {
            this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
        });
        this.element = _document.body;
        this.changes.observe(<Element>this.element, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
   
    ngOnDestroy(): void {
        this.changes.disconnect();
    }
    logout() {
        console.log('logout');
        localStorage.removeItem('Token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
}

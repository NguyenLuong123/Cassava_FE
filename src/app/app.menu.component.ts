import {Component, OnInit} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppComponent) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Vườn sắn hòa lạc', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Danh sách cánh đồng', icon: 'pi pi-list ',
                        routerLink: ['/Home'], badgeClass: 'p-badge-success'},
                    {label: 'Dữ liệu thời tiết', icon: 'pi pi-sun',
                        routerLink: ['/Home/WeatherData'], badgeClass: 'p-badge-success'},
                    {label: 'Mô phỏng dữ liệu thời tiết', icon: 'pi pi-sun',
                        routerLink: ['/Home/Simulation'], badgeClass: 'p-badge-success'},

                ]
            }];
    }
}

import * as Raven from 'raven-js';
import {FormsModule} from '@angular/forms';


import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import  {ToastyModule} from 'ng2-toasty';
import {ChartModule} from 'angular2-chartjs';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleService } from "./vehicle.service";
import { AppErrorHandler } from "./app.error-handler";
import { VehicleListComponent } from "./vehicle-list/vehicle-list.component";
import { PaginationComponent } from "./page/pagination.component";
import { ViewVehicleComponent } from "./view-vehicle/view-vehicle.component";
import { PhotoService } from "./photo.service";
import { BrowserXhr } from "@angular/http";
import { BrowserXhrWithProgress, ProgressService } from "./progress.service";
import { AuthService } from "./auth.service";
import { AdminComponent } from "./components/admin/admin.component";





Raven.config('');

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        ViewVehicleComponent,
        VehicleFormComponent,
        VehicleListComponent,
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        PaginationComponent,
        AdminComponent,
    ],
    providers:[
        {provide: ErrorHandler,useClass: AppErrorHandler},
        {provide: BrowserXhr,useClass:BrowserXhrWithProgress},
        VehicleService,PhotoService,ProgressService,AuthService
              ],
    imports: [
        ChartModule,
        FormsModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'admin', component: AdminComponent },
            { path: 'vehicles/new', component:VehicleFormComponent},
            { path: 'vehicles', component:VehicleListComponent},
            { path: 'vehicles/edit/:id', component:VehicleFormComponent},
            { path: 'vehicles/:id', component:ViewVehicleComponent},
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
                            ])
             ]
    
};
export class AppModule
{

}
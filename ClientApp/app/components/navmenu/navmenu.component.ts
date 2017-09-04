
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Component } from '@angular/core';
import { AuthService } from "../../auth.service";



@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css'],
    providers:[AuthService]
})

export class NavMenuComponent {
     /**
      *
      */
    constructor(private router:Router,private auth:AuthService){
        auth.handleAuthentication();
      }

    

      
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ContratObjectifsService } from 'src/app/services/contratObjectifs/contrat-objectifs.service';
import * as _ from 'underscore';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  gestionnaire;
  typeGroupes;
  intitule;
 
 constructor(private authService: AuthenticationService, private contratService: ContratObjectifsService,) {}

  ngOnInit() {

    this.authService.loadToken();
    this.typeGroupes=JSON.parse(localStorage.getItem('unites'));
    this.getGestionnaire();
   
   /*  this.router.events.subscribe(
      (event: Event) => {
             if (event instanceof NavigationEnd) {
              this.authService.loadToken();
              this.typeGroupes=JSON.parse(localStorage.getItem('unites'));
              this.gestionnaire=this.contratService.gestionnaire;
              this.contratService.gestionnaire=undefined;
  
             } });  */
   
  }

  getGestionnaire(){
    this.contratService.getGestionnaire().subscribe(resp=>{
            this.gestionnaire=resp;
    },err=>{
      console.error(err)
    })
  }
  
 

  isAdmin() {
    return this.authService.isAdmin();
  }

  isSimple() {
    return this.authService.isSimple();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onlogOut() {
    this.authService.logOut();
  
  }

}

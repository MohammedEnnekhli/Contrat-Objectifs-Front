import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ContratObjectifsService } from 'src/app/services/contratObjectifs/contrat-objectifs.service';
import { Router } from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentUnite;
  types;
 gestionnaire;
 typeGroupes;
 intitule;
 unitesTarget;
 isClick:boolean=false;

 constructor(private authService: AuthenticationService, private contratService: ContratObjectifsService, private route:Router) {}

  ngOnInit() {
   
      this.authService.loadToken();
      this.getTypes();
     this.getGestionnaire();
   
      
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

  getTypes() {
    this.contratService.getTypes().subscribe((resp:any) => {
      this.types = resp._embedded.types;
      
    },err=>{
      console.error(err);
    });
  }
 
  getGestionnaire(){
    this.contratService.getGestionnaire().subscribe((resp:any)=>{
     this.gestionnaire=resp;
     console.log('gestionnaire : ',this.gestionnaire)
     this.contratService.getChildsUnites(resp.uniteStructurelle.id).subscribe((unites:any)=>{

       this.typeGroupes=_.groupBy(unites._embedded.uniteStructurelles, function(currentObject) {
        return currentObject.type.nom;
    });
    
    this.intitule=Object.values(this.typeGroupes)[0][0].intitule;
    
    console.log('gouped',this.typeGroupes)
   
    

     
     })
    });
  }

  getUnite(unite){
   this.unitesTarget=unite.value;   
   this.isClick=false;  
  }

  onAxes(u){
    this.route.navigateByUrl('/axes');
    this.currentUnite=u;
    this.isClick=true;
  }

}

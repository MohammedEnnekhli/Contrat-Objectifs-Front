import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import { ContratObjectifsService } from 'src/app/services/contratObjectifs/contrat-objectifs.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   message:string;
  gestionnaire: any;
  typeGroupes: any;
  intitule: any;
  constructor(private authService: AuthenticationService, private router:Router,private contratService:ContratObjectifsService) { }

  ngOnInit() {
  }

  onLogin(form){
   this.authService.login(form).subscribe(resp=>{
    let jwt =resp.headers.get('Authorization');
    this.authService.saveToken(jwt);
    this.getGestionnaire(form.username);
    this.router.navigateByUrl('home');
   },err=>{
     this.message='Email ou mot de passe est incorrecte';
      console.error(err);
   })
  }

  getGestionnaire(email:string){

    if(this.authService.isAdmin()){
      this.contratService.getData('http://localhost:8087/uniteStructurelles?projection=PU').subscribe((data:any)=>{
        this.typeGroupes=_.groupBy(data._embedded.uniteStructurelles, function(currentObject) {
          return currentObject.type.nom;
      });
         this.contratService.saveChildsUnites(this.typeGroupes);
      },err=>{
        console.error(err);
      })
    }else{
      this.contratService.getData('http://localhost:8087/gestionnaires/search/findByEmail?email='+email+'&projection=PG').subscribe((resp:any)=>{
    this.contratService.gestionnaire=resp; 
    this.contratService.getChildsUnites(resp.uniteStructurelle.id).subscribe((unites:any)=>{
          this.typeGroupes=_.groupBy(unites._embedded.uniteStructurelles, function(currentObject) {
            
           return currentObject.type.nom; 
       });
       
       this.contratService.saveChildsUnites(this.typeGroupes);
              })
       });
    }
    
  }

 
 
  
  
  

}

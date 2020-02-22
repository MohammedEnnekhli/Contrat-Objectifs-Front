import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ContratObjectifsService } from 'src/app/services/contratObjectifs/contrat-objectifs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  onLogin(form){
   this.authService.login(form).subscribe(resp=>{
    let jwt =resp.headers.get('Authorization');
    this.authService.saveToken(jwt);
    
   },err=>{
      console.error(err);
   })
  }

  
  

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { Axe } from 'src/app/entities/axe';

@Injectable({
  providedIn: 'root'
})
export class ContratObjectifsService {

  host = 'http://localhost:8087';
  host2='http://localhost:8087/uniteStructurelles/search/childsUnites?projection=PU&id=11';
  

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getTypes() {
    const header = new HttpHeaders({Authorization: this.authService.jwt});
    return this.http.get(this.host + '/types', { headers: header });
  }

  getGestionnaire(){
    const header = new HttpHeaders({Authorization: this.authService.jwt});
   return  this.http.get(this.host +'/gestionnaires/search/findByEmail?email=' + this.authService.username +'&projection=PG', { headers: header });
  }

  getChildsUnites(idUnite:Number){
    const header = new HttpHeaders({Authorization: this.authService.jwt});
    return this.http.get(this.host +'/uniteStructurelles/search/childsUnites?projection=PU&id='+idUnite, { headers: header })
  }

  saveAxe(axe:Axe){
    const header = new HttpHeaders({Authorization: this.authService.jwt});
    return this.http.post(this.host+'/axeStrategiques',axe, { headers: header });
  }
}

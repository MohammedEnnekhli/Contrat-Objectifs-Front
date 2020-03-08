import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { Axe } from 'src/app/entities/axe';
import { Objectif } from 'src/app/entities/objectif';

@Injectable({
  providedIn: 'root'
})
export class ContratObjectifsService {

  host = 'http://localhost:8087';
  gestionnaire:any;

  constructor(private http: HttpClient, private authService: AuthenticationService) { }


  getGestionnaire(){
    const header = new HttpHeaders({Authorization: this.authService.jwt});
   return  this.http.get(this.host +'/gestionnaires/search/findByEmail?email=' + this.authService.username +'&projection=PG', { headers: header });
  }

  getChildsUnites(idUnite:Number){
    const header = new HttpHeaders({Authorization: this.authService.jwt});
    return this.http.get(this.host +'/uniteStructurelles/search/childsUnites?projection=PU&id='+idUnite, { headers: header })
  }
  saveChildsUnites(childsUnitesGroupedByType){
     localStorage.setItem('unites',JSON.stringify(childsUnitesGroupedByType) );
  }

  getUnite(uniteId:number){
    const header = new HttpHeaders({Authorization: this.authService.jwt});
    return this.http.get(this.host+'/uniteStructurelles/'+uniteId, { headers: header });
  }


  getData(link:string){
    const header = new HttpHeaders({Authorization: this.authService.jwt});
    return this.http.get(link, { headers: header });
  }

  saveData(link:string,data:any){
    const header = new HttpHeaders({Authorization: this.authService.jwt});
    return this.http.post(link,data, { headers: header });
  }

  editeData(link:string,data:any){
    const header = new HttpHeaders({Authorization: this.authService.jwt});
    return this.http.patch(link,data, { headers: header });
  }

  deleteData(link:string){
    const header = new HttpHeaders({Authorization: this.authService.jwt});
    return this.http.delete(link,{ headers: header });
  }
  saveAxe(axe:Axe){
    const header = new HttpHeaders({Authorization: this.authService.jwt});
    return this.http.post(this.host+'/axeStrategiques',axe, { headers: header });
  }
 saveAxeModification(axeModification:any){
  const header = new HttpHeaders({Authorization: this.authService.jwt});
  return this.http.post(this.host+'/modificationAxeStrategiques',axeModification, { headers: header });
 }

  getAxe(axeId:number){
    const header = new HttpHeaders({Authorization: this.authService.jwt});
    return this.http.get(this.host+'/axeStrategiques/'+axeId, { headers: header });
  }

  saveObjectif(objectif:Objectif){
    const header = new HttpHeaders({Authorization: this.authService.jwt});
    return this.http.post(this.host+'/objectifs',objectif, { headers: header });
  }
 saveObjectifModification(objectifModification:any){
  const header = new HttpHeaders({Authorization: this.authService.jwt});
  return this.http.post(this.host+'/modificationObjectifs',objectifModification, { headers: header });
 }
 saveActionModification(actionModification:any){
  const header = new HttpHeaders({Authorization: this.authService.jwt});
  return this.http.post(this.host+'/modificationActionCoes',actionModification, { headers: header });
 }
  
}

import { Component, OnInit, Input } from '@angular/core';
import { Axe } from 'src/app/entities/axe';
import { ContratObjectifsService } from 'src/app/services/contratObjectifs/contrat-objectifs.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { Gestionnaire } from 'src/app/entities/gestionnaire';
import { Location } from '@angular/common';

@Component({
  selector: 'app-axe',
  templateUrl: './axe.component.html',
  styleUrls: ['./axe.component.scss']
})
export class AxeComponent implements OnInit {
  currentAxe:Axe;
  currentGestionnaire:Gestionnaire;
   unite;
   axesList:Array<Axe>
  axe:Axe=new Axe();
  isAdd:boolean=true;
  axeCreatedBy;
  axeModification;
  axeEvaluation;


  constructor(private contratService: ContratObjectifsService,private activatedRoute:ActivatedRoute,public homeComponent:HomeComponent,
    private _location: Location) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.getUnite(id);
    });

  }

  getUnite(id:number){
  
   this.contratService.getData('http://localhost:8087/uniteStructurelles/'+id+'?projection=PU').subscribe((resp:any)=>{
    this.unite=resp;
    this.contratService.getData(resp._links.axeStrategiques.href.replace("{?projection}", "?projection=PAxe")).subscribe((data:any)=>{
      this.axesList=data._embedded.axeStrategiques;
      this.currentAxe=this.axesList[0];
    });
  });
}

   onAxe(axe:Axe){
     this.currentAxe=axe;
   }
  
  onSaveAxe(){
    this.contratService.getGestionnaire().subscribe((resp:any)=>{
      this.axe.createdByGestionnaire=resp._links.self.href;
      this.axe.uniteStructurelle=this.unite._links.self.href;
      this.contratService.saveAxe(this.axe).subscribe((resp:any)=>{
      this.axesList.push(resp);
      this.currentAxe=resp;
      this.isAdd=true;
      this.axe=new Axe();
   },err=>{
     console.error(err.error.message);
     this.isAdd=false;
     console.log("Failed is: ",this.isAdd)
   });
     },err=>{
       console.error(err);
     });
  
  }

  saveModification(){
    this.contratService.getGestionnaire().subscribe((resp:any)=>{
      let axeModification={
        "dateModification":new Date(),
        "gestionnaire":resp._links.self.href,
        "axeStrategique":this.currentAxe._links.self.href,
      };
      this.contratService.saveAxeModification(axeModification).subscribe(resp=>{
      },err=>{
          console.error(err);
      });
    }
     ,err=>{
       console.error(err);
     });
  }
   
   

  onEditAxe(){
    this.contratService.editeData(this.currentAxe._links.self.href,{
      description:this.currentAxe.description,
      dateDebutPrevisionnel: this.currentAxe.dateFinPrevisionnel,
      dateFinPrevisionnel: this.currentAxe.dateFinPrevisionnel,
      dateDebutReel: this.currentAxe.dateDebutReel,
      dateFinReel: this.currentAxe.dateFinReel,
      tauxAvancement: this.currentAxe.tauxAvancement,
      intitule: this.currentAxe.intitule
    }).subscribe(resp=>{
      this.saveModification();
    },err=>{
      console.error(err);
    })
  }

  onDeleteAxe(){
    this.contratService.deleteData(this.currentAxe._links.self.href).subscribe(resp=>{
      this.axesList=this.axesList.filter(axe=>this.currentAxe.id!=axe.id);
      this.currentAxe=this.axesList[0];
    },err=>{
      console.error(err);
    })
  }

  getAxeInfos(){
    this.axeCreatedBy=this.currentAxe.createdByGestionnaire;

    this.contratService.getData(this.currentAxe._links.evaluationAxeStrategiques.href.replace("{?projection}", "")+'?projection=PAxeEval').subscribe((resp:any)=>{
      this.axeEvaluation=resp._embedded.evaluationAxeStrategiques;
 },err=>{
     console.error(err);
 });
 this.contratService.getData(this.currentAxe._links.modificationAxeStrategiques.href.replace("{?projection}", "")+'?projection=PAxeModi').subscribe((resp:any)=>{
  this.axeModification=resp._embedded.modificationAxeStrategiques;
},err=>{
console.error(err);
});
   

  }
  backClicked() {
    this._location.back();
  }


 
}

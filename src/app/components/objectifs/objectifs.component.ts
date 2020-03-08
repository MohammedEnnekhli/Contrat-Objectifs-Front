import { Component, OnInit, Input } from '@angular/core';
import { Axe } from 'src/app/entities/axe';
import { ContratObjectifsService } from 'src/app/services/contratObjectifs/contrat-objectifs.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { Objectif } from 'src/app/entities/objectif';
import { Action } from 'src/app/entities/action';
import { Location } from '@angular/common';

@Component({
  selector: 'app-objectifs',
  templateUrl: './objectifs.component.html',
  styleUrls: ['./objectifs.component.scss']
})
export class ObjectifsComponent implements OnInit {

  currentObjectif:Objectif;
  currentGestionnaire;
   axe:Axe;
  objectifsList:Array<Objectif>
  objectif:Objectif=new Objectif();
  action:Action=new Action();
  actionDeletedId:any;
  isAdd:boolean=true;
  objectifCreatedBy;
  objectifModification;
  objectifEvaluation;
  actionModification;
  actionEvaluation;
  actionCreatedBy
  editField: string;
  actionList:Array<any>;


  constructor(private contratService: ContratObjectifsService,private activatedRoute:ActivatedRoute,
    public homeComponent:HomeComponent, private _location: Location) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.getAxe(id);
    });

  }

  getAxe(id:number){
   this.contratService.getData('http://localhost:8087/axeStrategiques/'+id+'?projection=PAxe').subscribe((resp:any)=>{
          this.axe=resp;
          this.objectifsList=resp.objectifs;
          this.currentObjectif=this.objectifsList[0];
          this.actionList=this.currentObjectif.actionCOS;

        
   },err=>{
        console.error(err);
   })

  }

   onObjectif(objectif:Objectif){
     this.currentObjectif=objectif;
     this.actionList=this.currentObjectif.actionCOS;

   }
  
  onSaveObjectif(){
    this.contratService.getGestionnaire().subscribe((resp:any)=>{
      this.objectif.createdByGestionnaire=resp._links.self.href;
      this.objectif.axeStrategique=this.axe._links.self.href;
      this.contratService.saveObjectif(this.objectif).subscribe((resp:any)=>{
      this.objectifsList.push(resp);
      this.currentObjectif=resp;
      this.isAdd=true;
      this.objectif=new Objectif();
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
      let objectifModification={
        "dateModification":new Date(),
        "gestionnaire":resp._links.self.href,
        "objectif":this.currentObjectif._links.self.href,
      };
      this.contratService.saveObjectifModification(objectifModification).subscribe(resp=>{
      },err=>{
          console.error(err);
      });
    }
     ,err=>{
       console.error(err);
     });
   
  }

  onEditObjectif(){

    this.contratService.editeData(this.currentObjectif._links.self.href.replace("{?projection}", ""),{
      dateDebutPrevisionnel: this.currentObjectif.dateFinPrevisionnel,
      dateFinPrevisionnel: this.currentObjectif.dateFinPrevisionnel,
      dateDebutReel: this.currentObjectif.dateFinReel,
      tauxAvancement: this.currentObjectif.tauxAvancement,
      intitule: this.currentObjectif.intitule
    }).subscribe(resp=>{
      this.saveModification();
    },err=>{
      console.error(err);
    })
  }

  onDeleteObjectif(){
    this.contratService.deleteData(this.currentObjectif._links.self.href.replace("{?projection}", "")).subscribe(resp=>{
      this.objectifsList=this.objectifsList.filter(objectif=>this.currentObjectif.id!=objectif.id);
      this.currentObjectif=this.objectifsList[0];
    },err=>{
      console.error(err);
    })
  }

  getObjectifInfos(){
    this.contratService.getData(this.currentObjectif._links.evaluationObjectifs.href.replace("{?projection}", "")+'?projection=PObjEval').subscribe((resp:any)=>{
         this.objectifEvaluation=resp._embedded.evaluationObjectifs;
    },err=>{
        console.error(err);
    });
    this.objectifCreatedBy=this.currentObjectif.createdByGestionnaire;

this.contratService.getData(this.currentObjectif._links.modificationObjectifs.href.replace("{?projection}", "")+'?projection=PObjModi').subscribe((resp:any)=>{
   this.objectifModification=resp._embedded.modificationObjectifs;
},err=>{
console.error(err);
});
  }


  onSaveActionModification(link:string){
    this.contratService.getGestionnaire().subscribe((resp:any)=>{
      let actionModification={
        "dateModification":new Date(),
        "gestionnaire":resp._links.self.href,
        "actionCO":link,
      };
      this.contratService.saveActionModification(actionModification).subscribe(resp=>{
      },err=>{
          console.error(err);
      });
    }
     ,err=>{
       console.error(err);
     });
   
  }

    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent.replace("%", "");
      this.actionList[id][property] = editField;
      let editAction=JSON.parse(JSON.stringify({[property]:editField}));
      let editActionID=this.currentObjectif.actionCOS[id].id;
      this.contratService.editeData('http://localhost:8087/actionCoes/'+editActionID,editAction).subscribe(resp=>{
         this.onSaveActionModification('http://localhost:8087/actionCoes/'+editActionID);
    },err=>{
        console.error(err);
      })
     
    }
    getAction(id:any){
      this.actionDeletedId=id;
    }

    removeAction() {
      let editActionID=this.currentObjectif.actionCOS[this.actionDeletedId].id;
      this.contratService.deleteData('http://localhost:8087/actionCoes/'+editActionID).subscribe(resp=>{
        this.actionList.splice(this.actionDeletedId, 1);
      },err=>{
        console.error(err);
      })
    }

    addAction() {

      this.contratService.getGestionnaire().subscribe((resp:any)=>{
        this.action.createdByGestionnaire=resp._links.self.href;
        this.action.objectif=this.currentObjectif._links.self.href.replace("{?projection}", "");
        this.contratService.saveData('http://localhost:8087/actionCoes',this.action).subscribe(resp=>{
        
        this.currentObjectif.actionCOS.push(resp);
        this.action=new Action();
      },err=>{
        console.error(err)
      })
      },err=>{
        console.error(err);
      });
      

    }

    getActionInfos(idAct:any){
      let actionID=this.currentObjectif.actionCOS[idAct].id;
      this.contratService.getData('http://localhost:8087/actionCoes/'+actionID+'/evaluationActionCOS?projection=PActEval').subscribe((resp:any)=>{
           this.actionEvaluation=resp._embedded.evaluationActionCoes;
      },err=>{
          console.error(err);
      });

      this.contratService.getData('http://localhost:8087/actionCoes/'+actionID+'/createdByGestionnaire').subscribe((resp:any)=>{
        this.actionCreatedBy=resp;
   },err=>{
       console.error(err);
   });
  
  this.contratService.getData('http://localhost:8087/actionCoes/'+actionID+'/modificationActionCOs?projection=PActModi').subscribe((resp:any)=>{
     this.actionModification=resp._embedded.modificationActionCoes;
  },err=>{
  console.error(err);
  });
    }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }

    backClicked() {
      this._location.back();
    }

 
}

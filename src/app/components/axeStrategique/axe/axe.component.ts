import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Axe } from 'src/app/entities/axe';
import { ContratObjectifsService } from 'src/app/services/contratObjectifs/contrat-objectifs.service';

@Component({
  selector: 'app-axe',
  templateUrl: './axe.component.html',
  styleUrls: ['./axe.component.scss']
})
export class AxeComponent implements OnInit {
  currentAxe;
  @Input() unite;
  @Input()gestionnaire;
  axe:Axe=new Axe();
  constructor(private contratService: ContratObjectifsService) {}

  ngOnInit() {
    console.log('current Unite',this.unite);
    this.currentAxe=this.unite.axeStrategiques[0];
    this.unite=this.unite;

  }

  getAxe(axe){
   this.currentAxe=axe;
   console.log('current axe',this.currentAxe)

  }
  
  onSaveAxe(){
    this.axe.createdByGestionnaire=this.gestionnaire._links.self.href;
    this.axe.uniteStructurelle=this.unite._links.self.href;
  this.contratService.saveAxe(this.axe).subscribe(resp=>{
       this.unite.axeStrategiques.push(this.axe);
       this.currentAxe=this.axe;
      console.log("axe are: ",this.axe)
      console.log("resp is: ",resp)
    },err=>{
      console.error(err.error.message);
    })

    
  }

 
}

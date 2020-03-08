import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Event, NavigationEnd } from '@angular/router';
import { ContratObjectifsService } from 'src/app/services/contratObjectifs/contrat-objectifs.service';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { Gestionnaire } from 'src/app/entities/gestionnaire';

@Component({
  selector: 'app-gestionnaire',
  templateUrl: './gestionnaire.component.html',
  styleUrls: ['./gestionnaire.component.scss']
})
export class GestionnaireComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Nom', 'Prenom', 'Email','Tel','CIN','Structure','Status','Actions'];

  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 8;
  gestionnairesList:Array<Gestionnaire>;
  currentGestionnaire:Gestionnaire;
  gestionnaire:Gestionnaire =new Gestionnaire();
  listUnites;

  constructor(private router: Router, public contratObjectif:ContratObjectifsService,private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
 
    this. getGestionnairesOfUnite();
  
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  getGestionnairesOfUnite(){
    this.contratObjectif.getData('http://localhost:8087/simpleGestionnaires?projection=PSG&sort=nom').subscribe((resp:any)=>{
        this.gestionnairesList=resp._embedded.simpleGestionnaires;
        this.mdbTable.setDataSource(this.gestionnairesList);
    this.elements = this.mdbTable.getDataSource();
    //console.log('elements of table',this.elements)
    this.previous = this.mdbTable.getDataSource();
    },err=>{
      console.error(err);
    })

  }

  getGestionnaire(gest){
    this.currentGestionnaire=gest;    
    this.getUniteStructurelle();
  }

  getUniteStructurelle(){
    this.contratObjectif.getData('http://localhost:8087/uniteStructurelles').subscribe((resp:any)=>{
      this.listUnites=resp._embedded.uniteStructurelles;
      console.log('u of list 2',this.listUnites);
    },err=>{
      console.error(err);
    })

  }

  onSaveGestionnaire(){
    this.gestionnaire.active=true;
    this.contratObjectif.saveData('http://localhost:8087/simpleGestionnaires',this.gestionnaire).subscribe(resp=>{
      this.getGestionnairesOfUnite();
      this.gestionnaire=new Gestionnaire();

      
    },err=>{
      console.error(err);
    })
  }
  onEditGestionnaire(itemForm){

    this.currentGestionnaire.uniteStructurelle='http://localhost:8087/uniteStructurelles/'+itemForm.uniteStructurelle;
   
    this.contratObjectif.editeData(this.currentGestionnaire._links.self.href,this.currentGestionnaire).subscribe(resp=>{
      this.getGestionnairesOfUnite();
     
    },err=>{
      console.error(err);
    }) 
  }
  onChange(isActive:any,gestId:number){
    this.contratObjectif.editeData('http://localhost:8087/simpleGestionnaires/'+gestId,{active:isActive.target.checked}).subscribe(resp=>{
    this.getGestionnairesOfUnite();     
    },err=>{
      console.error(err);
    }) 
   
  }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  addNewRow() {
    this.mdbTable.addRow({
      id: this.elements.length.toString(),
      first: 'Wpis ' + this.elements.length,
      last: 'Last ' + this.elements.length,
      handle: 'Handle ' + this.elements.length
    });
    this.emitDataSourceChange();
  }


  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log('emit DataSource Change',data);
    });
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }
  

}

import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Event, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-unite',
  templateUrl: './unite.component.html',
  styleUrls: ['./unite.component.scss']
})
export class UniteComponent implements OnInit{
  unites;
  childUnites;
  types;
  
  constructor( private activatedRoute: ActivatedRoute, private router:Router) { }
  

  ngOnInit() {     

this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
  this.childUnites=JSON.parse(localStorage.getItem('unites'));
  this.types=params.get('id');
  this.unites=this.childUnites[params.get('id')];
 


});

     /* this.router.events.subscribe(
      (event: Event) => {
             if (event instanceof NavigationEnd) {
              this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
                this.childUnites=JSON.parse(localStorage.getItem('unites'));
                this.unites=this.childUnites[params.get('id')];
              });
            
             }
      });  */
} 


}

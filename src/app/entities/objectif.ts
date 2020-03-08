import { Axe } from './axe';

export class Objectif {
    public id:number;
    public intitule:string;
    public tauxAvancement:number;
    public  dateDebutPrevisionnel:Date;
    public dateFinPrevisionnel:Date;
    public dateDebutReel:Date;
    public dateFinReel:Date;
    public axeStrategique:Axe;
    public createdByGestionnaire:any;
    public actionCOS:Array<any>
    public _links:any;
    
    constructor(){}
}

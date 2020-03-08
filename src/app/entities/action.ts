import { Objectif } from './objectif';

export class Action {
    public id:number;
    public intitule:string;
    public tauxAvancement:number;
    public  dateDebutPrevisionnel:Date;
    public dateFinPrevisionnel:Date;
    public dateDebutReel:Date;
    public dateFinReel:Date;
    public objectif:Objectif;
    public createdByGestionnaire:any;
    public _links:any;
    
    constructor(){}
}

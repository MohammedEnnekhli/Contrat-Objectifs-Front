import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AxeComponent } from './components/axeStrategique/axe.component';
import { UniteComponent } from './components/uniteStructuree/unite/unite.component';
import { ObjectifsComponent } from './components/objectifs/objectifs.component';
import { GestionnaireComponent } from './components/gestionnaire/gestionnaire.component';
import { AppComponent } from './app.component';
import { EvaluationsComponent } from './components/evaluations/evaluations.component';


const routes: Routes = [
 {path: 'login', component: LoginComponent},
 //{path: 'home', component: HomeComponent},
  {path: 'unite/:id', component: AxeComponent},
  {path: 'types/:id', component: UniteComponent},
  {path: 'objectif/:id', component: ObjectifsComponent},
  {path: 'gestionnaires', component: GestionnaireComponent},
  {path: 'evaluations', component: EvaluationsComponent},
  {path: 'home', component: AppComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

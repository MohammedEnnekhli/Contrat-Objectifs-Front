import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoginComponent } from './components/login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AxeComponent } from './components/axeStrategique/axe.component';
import { UniteComponent } from './components/uniteStructuree/unite/unite.component';
import { ObjectifsComponent } from './components/objectifs/objectifs.component';
import { GestionnaireComponent } from './components/gestionnaire/gestionnaire.component';
import { HomeComponent } from './components/home/home.component';
import { EvaluationsComponent } from './components/evaluations/evaluations.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AxeComponent,
    UniteComponent,
    ObjectifsComponent,
    GestionnaireComponent,
    HomeComponent,
    EvaluationsComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

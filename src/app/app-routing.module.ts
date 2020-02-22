import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { AxeComponent } from './components/axeStrategique/axe/axe.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: AppComponent},
  {path: 'unitesType/:key', component: AppComponent},
  {path: 'axes', component: AxeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

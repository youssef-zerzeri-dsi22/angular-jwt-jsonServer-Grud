import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EditerComponent } from './editer/editer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'editer/:id', component: EditerComponent },

];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './budget-planner/signup/signup.component';
import { ProfileComponent } from './budget-planner/profile/profile.component';
import { DashboardComponent } from './budget-planner/dashboard/dashboard.component';
import { SideNavComponent } from './budget-planner/side-nav/side-nav.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./budget-planner/budget-planner.module').then(
        (m) => m.BudgetPlannerModule
      ),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'home',
    component: SideNavComponent,
    children:[
      { path: '', component: DashboardComponent },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      { path: 'profile', pathMatch: 'full', component: ProfileComponent },
  ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

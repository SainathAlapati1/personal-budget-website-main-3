import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrevHistoryComponent } from './budget-planner/prev-history/prev-history.component';
import { LoginComponent } from './budget-planner/login/login.component';
import { SignupComponent } from './budget-planner/signup/signup.component';
import { ProfileComponent } from './budget-planner/profile/profile.component';
import { DashboardComponent } from './budget-planner/dashboard/dashboard.component';

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
    path: 'sign-up',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

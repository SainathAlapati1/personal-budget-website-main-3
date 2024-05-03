import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutPopupComponent } from './dashboard/logout-popup/logout-popup.component';
import { PrevHistoryComponent } from './prev-history/prev-history.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'side-nav', component: SideNavComponent },
  { path: 'logout-popup', component: LogoutPopupComponent },
  { path: 'prev-history', component: PrevHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetPlannerRoutingModule {}

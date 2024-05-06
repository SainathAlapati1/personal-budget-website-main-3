import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LogoutComponent } from './logout/logout.component';
import { PrevHistoryComponent } from './prev-history/prev-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  { path: 'side-nav', component: SideNavComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'prev-history', component: PrevHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetPlannerRoutingModule {}

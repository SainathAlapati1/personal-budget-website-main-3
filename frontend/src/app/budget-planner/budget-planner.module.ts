import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetPlannerRoutingModule } from './budget-planner-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BarChartComponent } from './dashboard/Charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './dashboard/Charts/pie-chart/pie-chart.component'; // Add this line
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from './side-nav/side-nav.component';
import { EarningsComponent } from './dashboard/earnings/earnings.component';
import { ExpenditureComponent } from './dashboard/expenditure/expenditure.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { PrevHistoryComponent } from './prev-history/prev-history.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutPopupComponent } from './dashboard/logout-popup/logout-popup.component';
import { AllocatedBudgetComponent } from './dashboard/allocated-budget/allocated-budget.component';
import { BrushChartComponent } from './dashboard/Charts/brush-chart/brush-chart.component';

@NgModule({
  declarations: [
    BarChartComponent,
    PieChartComponent,
    DashboardComponent,
    SideNavComponent,
    EarningsComponent,
    ExpenditureComponent,
    PrevHistoryComponent,
    SignupComponent,
    ProfileComponent,
    LogoutPopupComponent,
    AllocatedBudgetComponent,
    BrushChartComponent,
  ],
  imports: [
    CommonModule,
    BudgetPlannerRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [FormBuilder],
})
export class BudgetPlannerModule {}

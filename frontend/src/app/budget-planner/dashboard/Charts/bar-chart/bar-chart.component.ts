import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../../../../data.service';
import { AuthenticationService } from '../../../authentication.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-bar',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, AfterViewInit, OnDestroy {
  totalCurrentMonthIncome: number = 0;
  currentMonthIncome: string = '';
  totalCurrentMonthExpense: number = 0;
  currentMonthExpense: string = '';
  private data = [{}];
  userId!: string;
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  private dataSubscription!: Subscription;
  totalCurrentMonthEarning!: number;
  currentMonthEarning!: string;
  totalCurrentMonthBudget: any;

  constructor(
    private dataService: DataService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getLoggedInUserId();
    if (this.userId !== undefined) {
      this.fetchData();
    }
  }

  // fetchData(): void {
  //   const currentDate = new Date();
  //   const currentMonth = currentDate.getMonth();
  //   const currentYear = currentDate.getFullYear();

  //   this.dataService.getIncomeByMonth(this.userId, this.months[currentMonth], currentYear).subscribe(
  //     income => {
  //       this.totalCurrentMonthIncome = income[0].amount;
  //       this.currentMonthIncome = "$" + this.totalCurrentMonthIncome;
  //       this.data.push({ "Framework": "Income", "Stars": this.totalCurrentMonthIncome });

  //       // Fetch expense data
  //       this.dataService.getCurrentMonthBudget(this.userId).subscribe(
  //         budget => {
  //           this.totalCurrentMonthExpense = budget[0].total_expense;
  //           this.currentMonthExpense = "$" + this.totalCurrentMonthExpense;
  //           this.data.push({ "Framework": "Expense", "Stars": this.totalCurrentMonthExpense });

  //           // After both income and expense data fetched, draw bars
  //           this.updateChart();
  //         },
  //         error => {
  //           console.error("Error fetching expense data:", error);
  //         }
  //       );
  //     },
  //     error => {
  //       console.error("Error fetching income data:", error);
  //     }
  //   );
  // }
  fetchData(): void {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Fetch income data
    this.dataService
      .getEarningsByMonth(this.userId, this.months[currentMonth], currentYear)
      .pipe(
        switchMap((earning) => {
          this.totalCurrentMonthEarning = earning[0].amount;
          this.currentMonthEarning = '$' + this.totalCurrentMonthEarning;
          this.data.push({
            Framework: 'Income',
            Stars: this.totalCurrentMonthIncome,
          });

          // Fetch expense data
          return this.dataService.getCurrentMonthAllocatedBudget(this.userId);
        })
      )
      .subscribe(
        (budget) => {
          this.totalCurrentMonthBudget = budget[0].total_expense;
          this.currentMonthExpense = '$' + this.totalCurrentMonthBudget;
          this.data.push({
            Framework: 'Budget',
            Stars: this.totalCurrentMonthExpense,
          });

          // After both income and expense data fetched, draw bars
          this.createSvg();
          this.drawBars(this.data);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  private svg: any;
  private margin = 50;
  private width = 500 - this.margin * 2;
  private height = 400 - this.margin * 2;

  private createSvg(): void {
    this.svg = d3
      .select('figure#bar')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private updateChart(): void {
    // Clear existing SVG
    d3.select('figure#bar svg').remove();

    // Recreate SVG and redraw bars
    this.createSvg();
    this.drawBars(this.data);
  }

  private drawBars(data: any[]): void {
    // Find the maximum value for adjusting the Y-axis domain dynamically
    const maxStars = d3.max(data, (d: any) => d.Stars) as number;

    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d) => d.Framework))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Create the Y-axis linear scale with dynamic domain
    const y = d3.scaleLinear().domain([0, maxStars]).range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.Framework))
      .attr('y', (d: any) => y(d.Stars))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.Stars))
      .attr('fill', (d: any) =>
        d.Framework === 'Income' ? '#3182bd' : '#d04a35'
      ); // Adjust fill color based on data
  }
}

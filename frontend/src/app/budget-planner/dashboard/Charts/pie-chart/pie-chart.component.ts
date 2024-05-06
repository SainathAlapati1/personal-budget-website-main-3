import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../../../../data.service';
import { AuthenticationService } from '../../../authentication.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, AfterViewInit {
  totalCurrentMonthEarning: number = 0;
  totalCurrentMonthExpenditure: number = 0;
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
  private data = [
    {
      category: '',
      value: 0,
    },
  ];

  constructor(
    private dataService: DataService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getLoggedInUserId();
    this.fetchData();
    this.dataService.currentMessage$.subscribe((value) => {
      if (value) {
        this.fetchData();
      }
    });
  }

  fetchData(): void {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // Fetch amount by expenditure category
    this.dataService.getCurrentMonthAmountByExpenditure(this.userId).subscribe(
      (expenditure) => {
        this.data = [];
        for (let index = 0; index < expenditure.length; index++) {
          const expenditureType = expenditure[index].expenditureType;
          const amount = expenditure[index].total_amount;
          this.data.push({ category: expenditureType, value: amount });
        }
        this.createSvg();
        this.drawPie();
      },
      (error) => {
        console.error('Error fetching expenditure data:', error);
      }
    );

    // Fetch earning data
    this.dataService
      .getEarningsByMonth(this.userId, this.months[currentMonth], year)
      .subscribe((earning) => {
        this.totalCurrentMonthEarning = earning[0].amount;
        this.data.push({
          category: 'Earning',
          value: this.totalCurrentMonthEarning,
        });
      });
  }

  ngAfterViewInit(): void {}

  private svg: any;
  private margin = 50;
  private width = 500;
  private height = 400;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;

  private createSvg(): void {
    this.svg = d3
      .select('figure#pie')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  private drawPie(): void {
    // Create a pie generator
    const pie = d3.pie<any>().value((d: any) => d.value);
    const expenditureTypes = [...new Set(this.data.map((d) => d.category))];
    // Generate the arcs
    const arc = d3.arc().innerRadius(0).outerRadius(this.radius);
    const arcs = this.svg
      .selectAll('arc')
      .data(pie(this.data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    const colorScale = d3
      .scaleOrdinal()
      .domain(expenditureTypes)
      .range(d3.schemeAccent);

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: any) => colorScale(d.data.category));
    arcs
      .append('text')
      .attr('transform', (d: any) => 'translate(' + arc.centroid(d) + ')')
      .attr('text-anchor', 'middle')
      .text((d: any) => d.data.category);
  }
}

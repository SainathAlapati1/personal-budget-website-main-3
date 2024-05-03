// import { Component, OnInit } from '@angular/core';
// import * as d3 from 'd3';

// @Component({
//   selector: 'app-brush-chart',
//   templateUrl: './brush-chart.component.html',
//   styleUrls: ['./brush-chart.component.scss']
// })
// export class BrushChartComponent implements OnInit {
//   private data = [
//     {"Framework": "Income", "Stars": "1000"},
//     {"Framework": "Expense", "Stars": "500"}
//   ];

//   private svg: any;
//   private margin = { top: 20, right: 30, bottom: 30, left: 40 };
//   private width = 400 - this.margin.left - this.margin.right;
//   private height = 400 - this.margin.top - this.margin.bottom;

//   constructor() { }

//   ngOnInit(): void {
//     this.createSvg();
//     this.drawChart();
//   }

//   private createSvg(): void {
//     this.svg = d3.select("figure#brush-chart")
//       .append("svg")
//       .attr("width", this.width + this.margin.left + this.margin.right)
//       .attr("height", this.height + this.margin.top + this.margin.bottom)
//       .append("g")
//       .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
//   }

//   private drawChart(): void {
//     // X scale and axis
//     const x = d3.scaleLinear()
//       .domain([0, this.data.length - 1])
//       .range([0, this.width]);

//     this.svg.append("g")
//       .attr("transform", "translate(0," + this.height + ")")
//       .call(d3.axisBottom(x).ticks(this.data.length));

//     // Y scale and axis
//     const y = d3.scaleLinear()
//       .domain([0, d3.max(this.data, d => parseInt(d.Stars)) || 0]) // Handle undefined case
//       .range([this.height, 0]);

//     this.svg.append("g")
//       .call(d3.axisLeft(y));

//     // Area generator
//     const area = d3.area()
//       .x((d, i) => x(i))
//       .y0(y(0))
//       .y1((d: any) => y(parseInt(d.Stars))); // Update the type of 'd' parameter

//     // Draw the area
//     this.svg.append("path")
//       .datum(this.data)
//       .attr("fill", "#c7d3ec")
//       .attr("d", area);

//     // Add brush
//     const brush = d3.brushX()
//       .extent([[0, 0], [this.width, this.height]])
//       .on("end", this.brushed.bind(this));

//     this.svg.append("g")
//       .attr("class", "brush")
//       .call(brush);
//   }

//   private brushed(event: d3.D3BrushEvent<any>): void {
//     if (!event.selection) return;

//     const [x0, x1] = event.selection;
//     const x = d3.scaleLinear()
//       .domain([0, this.data.length - 1])
//       .range([0, this.width]);
//     const index0 = Math.round(x.invert(x0));
//     const index1 = Math.round(x.invert(x1));
//     console.log("Selected range:", index0, index1);
//   }
// }

import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-brush-chart',
  templateUrl: './brush-chart.component.html',
  styleUrls: ['./brush-chart.component.scss'],
})
export class BrushChartComponent implements OnInit {
  private data = [
    { Framework: 'Income', Stars: '1000' },
    { Framework: 'Expense', Stars: '500' },
  ];

  private svg: any;
  private margin = { top: 20, right: 30, bottom: 30, left: 40 };
  private width = 400 - this.margin.left - this.margin.right;
  private height = 400 - this.margin.top - this.margin.bottom;

  constructor() {}

  ngOnInit(): void {
    this.createSvg();
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = d3
      .select('figure#brush-chart')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  }

  private drawChart(): void {
    // X scale and axis
    const x = d3
      .scaleLinear()
      .domain([0, this.data.length - 1])
      .range([0, this.width]);

    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x).ticks(this.data.length));

    // Y scale and axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (d) => parseInt(d.Stars)) || 0]) // Handle undefined case
      .range([this.height, 0]);

    this.svg.append('g').call(d3.axisLeft(y));

    // Area generator
    const area = d3
      .area()
      .x((d, i) => x(i))
      .y0(y(0))
      .y1((d: any) => y(parseInt(d.Stars))); // Update the type of 'd' parameter

    // Draw the area
    this.svg
      .append('path')
      .datum(this.data)
      .attr('fill', '#c7d3ec')
      .attr('d', area);

    // Add brush
    const brush = d3
      .brushX()
      .extent([
        [0, 0],
        [this.width, this.height],
      ])
      .on('end', this.brushed.bind(this));

    this.svg.append('g').attr('class', 'brush').call(brush);
  }

  private brushed(event: d3.D3BrushEvent<any>): void {
    if (!event.selection) return;

    let x0: number | [number, number] = 0;
    let x1: number | [number, number] = 0;

    if (Array.isArray(event.selection)) {
      // If event.selection is an array, it's a range
      x0 = event.selection[0];
      x1 = event.selection[1];
    } else {
      // If event.selection is a single value, use it for both x0 and x1
      x0 = x1 = event.selection;
    }

    const x = d3
      .scaleLinear()
      .domain([0, this.data.length - 1])
      .range([0, this.width]);

    const index0 = Math.round(x.invert(x0 as d3.NumberValue));
    const index1 = Math.round(x.invert(x1 as d3.NumberValue));

    console.log('Selected range:', index0, index1);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { Hitter } from 'src/app/models/hitter';
import { Pitcher } from 'src/app/models/pitcher';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss']
})
export class ScatterPlotComponent implements OnInit {
  @Input() level: string;
  @Input() playerType: string;
  max: number
  min: number
  $playersSub: Subscription;
  players: any[] = [];
  private svg;
  private margin = 50;
  private width = 600 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.createSvg();
    this.$playersSub = this.store.select("playerStat", "stats", this.playerType).subscribe((players: any) => {
      if (players) {
        this.players = players.filter((player: Hitter | Pitcher) => {
          return player.level === this.level
        })
        this.max = Math.max.apply(Math, this.players.map(player => {
          return player.woba
        }))
        this.min = Math.min.apply(Math, this.players.map(player => {
          return player.woba
        }))
        this.drawPlot();
      }
    } )
    
  }

  private createSvg(): void {
    d3.select("figure#scatter").selectAll("svg").remove();
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

private drawPlot(): void {
  // Add X axis
  const x = d3.scaleLinear()
  .domain([18, 35])
  .range([ 0, this.width ]);
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  // Add Y axis
  const y = d3.scaleLinear()
  .domain([(this.min - (this.min * .1)), (this.max * 1.1)])
  .range([ this.height, 0]);
  this.svg.append("g")
  .call(d3.axisLeft(y));

  // Add dots
  const dots = this.svg.append('g');
  dots.selectAll("dot")
  .data(this.players)
  .enter()
  .append("circle")
  .attr("cx", p => x(p.age))
  .attr("cy", p => y(p.woba))
  .attr("r", 7)
  .style("opacity", .5)
  .style("fill", "#69b3a2");

  // Add labels
  dots.selectAll("text")
  .data(this.players)
  .enter()
  .append("text")
  .text(p => p.name)
  .attr("x", p => x(p.age))
  .attr("y", p => y(p.woba))
}


}

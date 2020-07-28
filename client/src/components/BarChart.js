import React, { Component } from 'react'
import '../App.css'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'

class BarChart extends Component {
   constructor(props){
      super(props)
      // this.chartData = this.props.data
      this.w = this.props.size[0]
      this.h = this.props.size[1]
      this.barpadding = this.props.barpadding
      this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }
   createBarChart() {
      const node = this.node
      const dataMax = max(this.props.data)
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, this.props.size[1]])
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')
   
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()
   
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      // .style('fill', '#fe9922')
      // .attr('x', (d,i) => i * 25)
      // .attr('y', d => this.props.size[1] - yScale(d))
      // .attr('y', d => this.h - yScale(d))
      // .attr('height', d => yScale(d))
      // .attr('width', 25)
      .attr("x", (d, i) => i * (this.w / this.props.data.length))
      .attr("y", d => this.h - d * 4)
      .attr("width", this.w / this.props.data.length - this.barpadding)
      .attr("height", d => d * 4)
      .attr("fill", d => "rgb(0, 0, " + (d * 10) + ")")

   // Labels
   select(node)
      .selectAll("text")
      .data(this.props.data)
      .enter()
      .append("text")
      .text(d => d) 
      .attr("x", (d, i) => i * (this.w / this.props.data.length) + (this.w / this.props.data.length - this.barpadding) / 2)
      .attr("y", d => this.h - (d * 4) + 14)
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "white")
      .attr("text-anchor", "middle");
   }
render() {
      return <svg ref={node => this.node = node}
      width={this.w} height={this.h}>
      </svg>
      // return <svg ref={node => this.node = node}
      // width={500} height={100}>
      // </svg>
   }
}
export default BarChart
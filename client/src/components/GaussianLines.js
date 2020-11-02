import React, { Component } from 'react'
import { scaleLinear, scaleTime } from 'd3-scale'
import { select, event } from 'd3-selection'
import { line } from 'd3-shape'
import { axisBottom, axisLeft } from 'd3-axis'
import * as d3 from 'd3'
import csv_data from '../Data/data.csv'
import processed_data from '../Data/processed_data_4000_30.csv'

class GaussianLines extends Component {
    constructor(){
       super()
     //   this.w = this.props.size[0]
     //   this.h = this.props.size[1]
     //   this.barpadding = this.props.barpadding
       this.createGaussianLines = this.createGaussianLines.bind(this)
    }
    componentDidMount() {
        this.createGaussianLines()
    }
    componentDidUpdate() {
       this.createGaussianLines()
    }
    createGaussianLines() {
       const node = this.node
     //   const dataMax = max(this.props.data)
       var margin = {top: 20, right: 20, bottom: 40, left: 60},
           width = 800 - margin.left - margin.right,
           height = 300 - margin.top - margin.bottom;  
 
       var svg = select(node)
       
        var x, y;
        d3.csv(csv_data).then(function(data) {
            // format the data
            // string to ingeter
            data.forEach(function(d) {
                d.x = new Date(`'${d.x}'`);
                d.y = +d.y;
            });

            // Add X axis --> it is a date format
            x = scaleTime()
                .range([0, width])
                .domain(d3.extent(data, function(d) { return d.x; }));
           
            svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
                .call(axisBottom(x));

            // Add the text label for the x axis
            svg.append("text")
                .attr("transform", "translate(" + (width / 2 + margin.left) + " ," + (height + margin.top + margin.bottom) + ")")
                .style("text-anchor", "middle")
                .text("Date");
        
            // Add Y axis
            y = scaleLinear()
                    .range([height, 0])
                    .domain([d3.min(data, function(d) { return d.CI_left; }), d3.max(data, function(d) { return d.CI_right; })])
            
            svg.append("g")
                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
                .call(axisLeft(y));

            // Add the text label for the Y axis
            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - (margin.left / 2))
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Weekly Deaths");

        })
        setTimeout(() => {
            
        d3.csv(processed_data).then(function(data) {
            let row = [];
            // format the data
            // string to ingeter
            data.forEach(function(d) {
                row = []
                row.push(getXYData(d.p1));
                row.push(getXYData(d.p2));
                row.push(getXYData(d.p3));
                row.push(getXYData(d.p4));

                row.forEach(function(d) {
                    d.x = new Date(d.x);
                    d.y = +d.y;
                })
    
                // Add the line
                svg.append("path")
                    .datum(row)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 1.5)
                    .attr("d", line()
                    .x(function(d) { return x(d.x) })
                        .y(function(d) { return y(d.y) })
                    )
                    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
            });

            // Add title 
            svg.append("text")
                .attr("x", (margin.left + width / 2))             
                .attr("y", margin.top / 2)
                .attr("dy", "1em")
                .attr("text-anchor", "middle")  
                .style("font-size", "16px") 
                .style("text-decoration", "underline")  
                .text("Forecasted weekly COVID-19 deaths in the United States");
        })
        }, 200);
    }

render() {
    //   return <svg ref={node => this.node = node}
    //   width={this.w} height={this.h}>
    //   </svg>
    return <svg ref={node => this.node = node}
    // >
    width={800} height={300}>
    </svg>
    }
}
export default GaussianLines

function getXYData(data) {
    var x = data.substring(1, data.length - 1).split(',')[0]
    var y = data.substring(1, data.length - 1).split(',')[1]
    return { x: new Date(x), y: parseFloat(y) };
}

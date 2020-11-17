import React, { Component } from 'react'
import { scaleLinear, scaleTime } from 'd3-scale'
import { select, event } from 'd3-selection'
import { line } from 'd3-shape'
import { axisBottom, axisLeft } from 'd3-axis'
import * as d3 from 'd3'
import csv_data from '../Data/data.csv'
// import processed_data from '../Data/processed_data_1000_20.csv'
// import processed_data from '../Data/processed_data_Exponential.csv'
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
    async createGaussianLines() {
       const node = this.node
     //   const dataMax = max(this.props.data)
       var margin = {top: 20, right: 20, bottom: 40, left: 80},
           width = 800 - margin.left - margin.right,
           height = 300 - margin.top - margin.bottom;  
 
       var svg = select(node)

       // Add title 
       svg.append("text")
            .attr("x", (margin.left + width / 2))             
            .attr("y", margin.top / 2)
            .attr("dy", "1em")
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")  
            .text("Forecasted weekly COVID-19 deaths in the United States");
       
        var x, y;
        var data_ori = await d3.csv(csv_data);
        // format the data
        // string to ingeter
        data_ori.forEach(function(d) {
            d.x = new Date(`'${d.x}'`);
            d.y = +d.y;
        });

        // Add X axis --> it is a date format
        x = scaleTime()
            .range([0, width])
            .domain(d3.extent(data_ori, function(d) { return d.x; }));
        
        svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
            .call(axisBottom(x));

        // Add the text label for the x axis
        svg.append("text")
            .attr("transform", "translate(" + (width / 2 + margin.left) + " ," + (height + margin.top + margin.bottom) + ")")
            .style("text-anchor", "middle")
            .text("Date");
            
        // Draw y axis and gaussion lines
        var data = await d3.csv(processed_data)
        let rows = []
        let max_ys = []
        let min_ys = []

        for (let d of data) {
            let row = [];
            row.push(getXYData(d.p1));
            row.push(getXYData(d.p2));
            row.push(getXYData(d.p3));
            row.push(getXYData(d.p4));
            rows.push(row)
            var min_max = findMinMax(row)
            min_ys.push(min_max[0])
            max_ys.push(min_max[1])
        }
        var max = Math.max(...max_ys)
        var min = Math.min(...min_ys)

        // Add Y axis
        y = scaleLinear()
        .range([height, 0])
        .domain([min, max])

        svg.append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        .call(axisLeft(y));

        // Add the text label for the Y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Weekly Deaths");

        // Draw gaussion lines  
        for (let row of rows) {
            await exec(() => {
                drawLine(svg, margin, x, y, row)
            });
        }

        // Draw final line
        data_ori.forEach(function(d) {
            d.x = new Date(`'${d.x}'`);
            d.y = +d.y;
        });
        await delay(2000);
        drawLine(svg, margin, x, y, data_ori, "#000066", 3)

        // Add the scatterplot
        svg.selectAll("dot")
            .data(data_ori)
            .enter().append("circle")
                .attr("r", 3.5)
                .attr('fill', "#000066")
                .attr("cx", function(d) { return x(d.x); })
                .attr("cy", function(d) { return y(d.y); })
                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
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

function drawLine(svg, margin, x, y, rowData, lineColor = "steelblue", strokeWidth = 1.5){
    // format the data
    rowData.forEach(function(d) {
        d.x = new Date(d.x); // date
        d.y = +d.y;          // string to ingeter
    })
    var path = svg.append("path")
                    .datum(rowData)
                    .attr("fill", "none")
                    .attr("stroke", lineColor)
                    .attr("stroke-width", strokeWidth)
                    .attr("d", line()
                        .x(function(d) { return x(d.x) })
                        .y(function(d) { return y(d.y) })
                    )
                    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

    const pathLength = path.node().getTotalLength();  
    const transitionPath = d3
                            .transition()
                            .ease(d3.easeSin)
                            .duration(2500)
                            
    path
        .attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength)
        .transition(transitionPath)
        .attr("stroke-dashoffset", 0);
}

function exec(func, time = 1000) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            func();
            resolve();
        }, time);
    })
}

function delay(time = 200) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve();
        }, time);
    })
}

function findMinMax(arr) {
    let min = arr[0].y, max = arr[0].y;
  
    for (let i = 1, len=arr.length; i < len; i++) {
      let v = arr[i].y;
      min = (v < min) ? v : min;
      max = (v > max) ? v : max;
    }
  
    return [min, max];
  }

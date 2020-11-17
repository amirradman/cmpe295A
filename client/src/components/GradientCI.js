import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import '../App.css'
import { scaleLinear, scaleTime } from 'd3-scale'
import { select } from 'd3-selection'
import { area, line } from 'd3-shape'
import { axisBottom, axisLeft } from 'd3-axis'
import * as d3 from 'd3'
// import $ from 'jquery'
import csv_data from '../Data/data.csv'
// import $ from 'jquery'

class GradientCI extends Component {
   constructor(){
      super()
    //   this.w = this.props.size[0]
    //   this.h = this.props.size[1]
    //   this.barpadding = this.props.barpadding
      this.createGradientCI = this.createGradientCI.bind(this)
   }

//    render(){


//    }
   componentDidMount() {
      this.createGradientCI()
   }
   componentDidUpdate() {
      this.createGradientCI()
   }
   createGradientCI() {
      const node = this.node
    //   const dataMax = max(this.props.data)
      var margin = {top: 20, right: 20, bottom: 40, left: 80},
          width = 800 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;  

      var svg = select(node)
                    // .append("svg")
                    //     // .attr("width", width + margin.left + margin.right)
                    //     // .attr("height", height + margin.top + margin.bottom)
                    //     .attr("width", width)
                    //     .attr("height", height)
                    // .append("g")
                    //     .attr("transform", 
                    //             "translate(" + margin.left + "," + margin.top + ")");
                    //             "translate(" + 0 + "," + 0 + ")");
      
      d3.csv(csv_data).then(function(data) {
        // format the data
        // string to ingeter
        data.forEach(function(d) {
            d.x = new Date(`'${d.x}'`);
            d.y = +d.y;
            d.CI_left = +d.CI_left;
            d.CI_right = +d.CI_right;
        });
        
        // Add X axis --> it is a date format
        var x = scaleTime()
                .range([0, width])
                .domain(d3.extent(data, function(d) { return d.x; }));

        // select(node)
        svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
            .call(axisBottom(x));

        // Add the text label for the x axis
        svg.append("text")
            .attr("transform", "translate(" + (width / 2 + margin.left) + " ," + (height + margin.top + margin.bottom) + ")")
            .style("text-anchor", "middle")
            .text("Date");
            
        // Add Y axis
        var y = scaleLinear()
                .range([height, 0])
                .domain([d3.min(data, function(d) { return d.CI_left; }), d3.max(data, function(d) { return d.CI_right; })])
        // select(node)
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

        // Plot confidence interval 
        var dataGroup = svg.append("g");
        dataGroup.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        dataGroup
            .append("path")
            .datum(data)
            .attr("fill", "#f08432")
            .attr("stroke", "none")
            .attr("class", "area")
            .style("opacity", 0.5)
            .attr("d", area()
                .x(function(d) { return x(d.x) })
                .y0(function(d) { return y(d.CI_right) })
                .y1(function(d) { return y(d.CI_left) })
            )
        
        dataGroup
            .append("path")
            .datum(data)
            .attr("fill", "#f56831")
            // .attr("fill", "orange")
            .attr("stroke", "none")
            .attr("class", "area")
            .style("opacity", 0.8)
            .attr("d", area()
                .x(function(d) { return x(d.x) })
                .y0(function(d) { return y(d.CI_right + (d.y - d.CI_right)/3) })
                .y1(function(d) { return y(d.CI_left - (d.CI_left - d.y)/3) })
            )

        dataGroup.append("path")
            .datum(data)
            .attr("fill", "red")
            .attr("stroke", "none")
            .attr("class", "area")
            .style("opacity", 0.8)
            .attr("d", area()
                .x(function(d) { return x(d.x) })
                .y0(function(d) { return y(d.CI_right + 2 * (d.y - d.CI_right)/3) })
                .y1(function(d) { return y(d.CI_left - 2 * (d.CI_left - d.y)/3) })
            )

        // Add the line
        dataGroup.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line()
                .x(function(d) { return x(d.x) })
                .y(function(d) { return y(d.y) })
            )

        // // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
        // // Its opacity is set to 0: we don't see it by default.
        // var tooltip = select(node)
        //                 .append("div")
        //                 .style("opacity", 0)
        //                 .attr("class", "tooltip")
        //                 .style("background-color", "white")
        //                 .style("border", "solid")
        //                 .style("border-width", "1px")
        //                 .style("border-radius", "5px")
        //                 .style("padding", "10px")

    //     var div = select(node).append("div")
    //                 // .attr("class", "tooltip-donut")
    //                 .style("opacity", 0);

    //     // A function that change this tooltip when the user hover a point.
    //     // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    //     var mouseover = function (d, i) {
    //         select(this).transition()
    //              .duration('50')
    //              .attr('opacity', '.85');
    //         div.transition()
    //              .duration(50)
    //              .style("opacity", 1);
    //         div.html(d.x + ":" + d.y)
    //             //  .style("left", (d3.event.pageX + 10) + "px")
    //             //  .style("top", (d3.event.pageY - 15) + "px");
    //    }

        // var mousemove = function(d) {
        //     tooltip
        //         .html(d.x + ":" + d.y)
        //         .style("left", (mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        //         .style("top", (mouse(this)[1]) + "px")
        // }

        // // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
        // var mouseleave = function(d) {
        //     tooltip
        //         .transition()
        //         .duration(200)
        //         .style("opacity", 0)
        // }

        // Add the scatterplot
        dataGroup.selectAll("dot")
            .data(data)
            .enter().append("circle")
                .attr("r", 3.5)
                .attr('fill', "steelblue")
                .attr("cx", function(d) { return x(d.x); })
                .attr("cy", function(d) { return y(d.y); })
                .attr("data-tip", "123")
                .attr("data-for", "tip")
                // .on("mouseover",function(d){console.log(y(d.y))});
                // .on("mouseover", mouseover)
                // .on("mouseover",function(){$(this).attr("fill","blue")})
                // .on("mouseout",function(){$(this).attr("fill","yellow")});

        // Add title 
        svg.append("text")
            .attr("x", (margin.left + width / 2))             
            .attr("y", margin.top / 2)
            .attr("dy", "1em")
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")  
            .text("Forecasted weekly COVID-19 deaths in the United States");
        //     .on("mouseover", mouseover )
        //     .on('mouseout', function (d, i) {
        //         select(this).transition()
        //              .duration('50')
        //              .attr('opacity', '1');
        //         div.transition()
        //              .duration('50')
        //              .style("opacity", 0);
        //    })
      })


    //   select(node)
    //      .selectAll('rect')
    //      .data(this.props.data)
    //      .exit()
    //      .remove()
      
    //   select(node)
    //      .selectAll('rect')
    //      .data(this.props.data)
    //      .attr("x", (d, i) => i * (this.w / this.props.data.length))
    //      .attr("y", d => this.h - d * 4)
    //      .attr("width", this.w / this.props.data.length - this.barpadding)
    //      .attr("height", d => d * 4)
    //      .attr("fill", d => "rgb(0, 0, " + (d * 10) + ")")

    //   // Labels
    //   select(node)
    //      .selectAll("text")
    //      .data(this.props.data)
    //      .enter()
    //      .append("text")
    //      .text(d => d) 
    //      .attr("x", (d, i) => i * (this.w / this.props.data.length) + (this.w / this.props.data.length - this.barpadding) / 2)
    //      .attr("y", d => this.h - (d * 4) + 14)
    //      .attr("font-family", "sans-serif")
    //      .attr("font-size", "11px")
    //      .attr("fill", "white")
    //      .attr("text-anchor", "middle");

    // function PlotConfidenceInterval () {
    //     select(node).append("path")
    //         .datum(data)
    //         .attr("fill", "#f08432")
    //         // .attr("fill", "url('#area-gradient')")
    //         .attr("stroke", "none")
    //         .attr("class", "area")
    //         .style("opacity", 0.5)
    //         .attr("d", area()
    //             .x(function(d) { return x(d.x) })
    //             .y0(function(d) { return y(d.CI_right) })
    //             .y1(function(d) { return y(d.CI_left) })
    //         )
    // }
   }
render() {
    //   return <svg ref={node => this.node = node}
    //   width={this.w} height={this.h}>
    //   </svg>
    return <svg ref={node => this.node = node}
    // >
    width={800} height={400}>
    </svg>
   }
}
export default GradientCI
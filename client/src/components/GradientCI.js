import React, { Component } from 'react'
import '../App.css'
import { scaleLinear, scaleTime } from 'd3-scale'
import { select, event } from 'd3-selection'
import { area, line } from 'd3-shape'
import { axisBottom, axisLeft } from 'd3-axis'
// import { axisLeft } from 'd3-axis'
import * as d3 from 'd3'
import csv_data from '../Data/data.csv';

class GradientCI extends Component {
   constructor(){
      super()
    //   this.w = this.props.size[0]
    //   this.h = this.props.size[1]
    //   this.barpadding = this.props.barpadding
      this.createGradientCI = this.createGradientCI.bind(this)
   }
   componentDidMount() {
      this.createGradientCI()
   }
   componentDidUpdate() {
      this.createGradientCI()
   }
   createGradientCI() {
      const node = this.node
    //   const dataMax = max(this.props.data)
      var margin = {top: 20, right: 20, bottom: 40, left: 60},
          width = 800 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;  

      var svg = select(node)
                    // .append("svg")
                    //     // .attr("width", width + margin.left + margin.right)
                    //     // .attr("height", height + margin.top + margin.bottom)
                    //     .attr("width", width)
                    //     .attr("height", height)
                    .append("g")
                        .attr("transform", 
                                "translate(" + margin.left + "," + margin.top + ")");
                    //             "translate(" + 0 + "," + 0 + ")");
      
      d3.csv(csv_data).then(function(data) {

        // format the data
        // string to ingeter
        data.forEach(function(d) {
            d.x = new Date(d.x);
            d.y = +d.y;
            d.CI_left = +d.CI_left;
            d.CI_right = +d.CI_right;
        });
        
        // Add X axis --> it is a date format
        var x = scaleTime()
                // .range([margin.left, width + margin.left])
                .range([0, width])
                .domain(d3.extent(data, function(d) { return d.x; }));

        var y_translate = margin.top + height
        // select(node)
        svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + y_translate + ")")
            .call(axisBottom(x));
            
        // Add Y axis
        var y = scaleLinear()
                // .range([height + margin.top, margin.top])
                .range([height, 0])
                .domain(d3.extent(data, function(d) { return d.y; }));
        // select(node)
        svg.append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
            .call(axisLeft(y));

        // // set the gradient
        // svg.append("linearGradient")				
        //         .attr("id", "area-gradient")			
        //         .attr("gradientUnits", "userSpaceOnUse")	
        //         // .attr("x1", 0).attr("y1", y(0))			
        //         // .attr("x2", 0).attr("y2", y(1000))
        //         .attr("x1", "0%").attr("y1", "0%")			
        //         .attr("x2", "0%").attr("y2", "100%")		
        //     .selectAll("stop")						
        //         .data([								
        //             {offset: "0%", color: "yellow"},
        //             {offset: "25%", color: "orange"},		
        //             {offset: "50%", color: "red"},
        //             {offset: "75%", color: "orange"},
        //             {offset: "100%", color: "yellow"}	
        //         ])					
        //     .enter().append("stop")			
        //         .attr("offset", function(d) { return d.offset; })	
        //         .attr("stop-color", function(d) { return d.color; });

        // Plot confidence interval 
        svg.append("path")
            .datum(data)
            .attr("fill", "#f08432")
            // .attr("fill", "url('#area-gradient')")
            .attr("stroke", "none")
            .attr("class", "area")
            .style("opacity", 0.5)
            .attr("d", area()
                .x(function(d) { return x(d.x) })
                .y0(function(d) { return y(d.CI_right) })
                .y1(function(d) { return y(d.CI_left) })
            )
            .attr("transform", "translate(" + margin.left + ", 0)")
        
        svg.append("path")
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
            .attr("transform", "translate(" + margin.left + ", 0)")

        svg.append("path")
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
        .attr("transform", "translate(" + margin.left + ", 0)")


        // Add the line
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line()
                .x(function(d) { return x(d.x) })
                .y(function(d) { return y(d.y) })
            )
            .attr("transform", "translate(" + margin.left + ", 0)")
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
        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
                .attr("r", 3.5)
                .attr('fill', "steelblue")
                .attr("cx", function(d) { return x(d.x); })
                .attr("cy", function(d) { return y(d.y); })
                .attr("transform", "translate(" + margin.left + ", 0)");
        //     .on("mouseover", mouseover )
        //     .on('mouseout', function (d, i) {
        //         select(this).transition()
        //              .duration('50')
        //              .attr('opacity', '1');
        //         div.transition()
        //              .duration('50')
        //              .style("opacity", 0);
        //    })
            

        // select(node)
        //     .selectAll("circle")
        //     .data(data).enter()
        //     // .data(data).enter().append("svg:circle")
        //     .append("title")
        //         .text(function(d) { return d.x + ":" + d.y; });

        // // Add the X Axis
        // svg.append("g")
        //     // .attr("transform", "translate(0," + height + ")")
        //     // .attr("transform", `translate(0,${height - margin.bottom})`)
        //     .call(axisBottom(x));

        // // Add the Y Axis
        // svg.append("g")
        //     .attr("transform", `translate(${margin.left},0)`)
        //     .call(d3.axisLeft(y));

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
    width={800} height={300}>
    </svg>
   }
}
export default GradientCI
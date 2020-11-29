import React, { Component } from 'react'
// import '../App.css'
import { scaleLinear, scaleTime } from 'd3-scale'
import { select } from 'd3-selection'
import { area, line } from 'd3-shape'
import { axisBottom, axisLeft } from 'd3-axis'
import * as d3 from 'd3'
import csv_data from '../Data/data.csv'

class GradientCI extends Component {
    constructor() {
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
        var margin = { top: 20, right: 20, bottom: 40, left: 80 },
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

        d3.csv(csv_data).then(function (data) {
            // format the data
            // string to ingeter
            data.forEach(function (d) {
                d.x = new Date(`'${d.x}'`);
                d.y = +d.y;
                d.CI_left = +d.CI_left;
                d.CI_right = +d.CI_right;
            });
        });

        svg = select(node)
      
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
                .domain(d3.extent(data, function (d) { return d.x; }));


        // // Customize ticks 
        // var dates = []
        // dates = ['2020-09-19', '2020-09-26', '2020-10-03', '2020-10-10'];
        // dates = dates.map(d => new Date(`'${d}'`));

        let xAxis = axisBottom(x);
        // let ticks = x.ticks();
        // ticks.push(...dates);
        // xAxis.tickValues(ticks);

        // select(node)
        svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
            .call(xAxis);

            // Add the text label for the x axis
            svg.append("text")
                .attr("transform", "translate(" + (width / 2 + margin.left) + " ," + (height + margin.top + margin.bottom) + ")")
                .style("text-anchor", "middle")
                .text("Date");

            // Add Y axis
            var y = scaleLinear()
                .range([height, 0])
                .domain([d3.min(data, function (d) { return d.CI_left; }), d3.max(data, function (d) { return d.CI_right; })])
            // select(node)
            svg.append("g")
                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
                .call(axisLeft(y));

            // Add the text label for the Y axis
            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 10)
                .attr("x", 0 - (height / 2))
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
                    .x(function (d) { return x(d.x) })
                    .y0(function (d) { return y(d.CI_right) })
                    .y1(function (d) { return y(d.CI_left) })
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
                    .x(function (d) { return x(d.x) })
                    .y0(function (d) { return y(d.CI_right + (d.y - d.CI_right) / 3) })
                    .y1(function (d) { return y(d.CI_left - (d.CI_left - d.y) / 3) })
                )

            dataGroup.append("path")
                .datum(data)
                .attr("fill", "red")
                .attr("stroke", "none")
                .attr("class", "area")
                .style("opacity", 0.8)
                .attr("d", area()
                    .x(function (d) { return x(d.x) })
                    .y0(function (d) { return y(d.CI_right + 2 * (d.y - d.CI_right) / 3) })
                    .y1(function (d) { return y(d.CI_left - 2 * (d.CI_left - d.y) / 3) })
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

        // Add tooltip
        var tooltip = dataGroup.append("text")
                                .style("opacity", 0);

        var tooltip_low = dataGroup.append("text")
                            .style("opacity", 0);

        var tooltip_high = dataGroup.append("text")
                            .style("opacity", 0);

        // Add the scatterplot of bounds
        var bounds = dataGroup.selectAll("dot")
        var bound_dots
        function drawBounds(data) {
            bound_dots = bounds
                            .data(data)
                            .enter().append("circle")
                                .attr("r", 3.5)
                                .attr('fill', "steelblue")
                                .attr("cx", function(d) { return d.x; })
                                .attr("cy", function(d) { return d.y; })
                                .attr("opacity", 1 );
            
        }

        function hide_tip(tooltip){
            tooltip.transition()
                    .duration('50')
                    .style("opacity", 0);
        }

        function show_tip(tooltip, text, x, y){
            tooltip.transition()
                    .duration(50)
                    .style("opacity", 1);
            tooltip.html(text)
                    .attr("x", x - 20)             
                    .attr("y", y - 20)
                    .attr("dy", "1em")
                    .attr("font-size", 12)
        }
        // Add the scatterplot of means
        dataGroup
            .selectAll("dot")
            .data(data)
            .enter().append("circle")
                .attr("r", 3.5)
                .attr('fill', "steelblue")
                .attr("cx", function(d) { return x(d.x); })
                .attr("cy", function(d) { return y(d.y); })
                .attr("y-low", function(d) { return y(d.CI_left); })
                .attr("y-high", function(d) { return y(d.CI_right); })
                .attr("data-y", function(d) { return d.y; })
                .attr("data-low", function(d) { return d.CI_left; })
                .attr("data-high", function(d) { return d.CI_right; })
                .on('mouseover', function (d) {
                    show_tip(tooltip, 
                            d3.select(this).attr("data-y"), 
                            parseInt(d3.select(this).attr("cx")), 
                            parseInt(d3.select(this).attr("cy")))

                    let data_bounds = [{x: d3.select(this).attr("cx"), 
                                        y: d3.select(this).attr("y-low"), 
                                        v: d3.select(this).attr("data-low")},
                                       {x: d3.select(this).attr("cx"), 
                                        y: d3.select(this).attr("y-high"), 
                                        v: d3.select(this).attr("data-high")}]
                    drawBounds(data_bounds)

                    show_tip(tooltip_low, 
                            d3.select(this).attr("data-low"), 
                            parseInt(d3.select(this).attr("cx")), 
                            parseInt(d3.select(this).attr("y-low")))

                    show_tip(tooltip_high, 
                        d3.select(this).attr("data-high"), 
                            parseInt(d3.select(this).attr("cx")), 
                            parseInt(d3.select(this).attr("y-high")))
               })
               .on('mouseout', function () {
                    hide_tip(tooltip)
                    hide_tip(tooltip_low)
                    hide_tip(tooltip_high)
                    bound_dots.attr("opacity", 0);
               });
            
        // Add title 
        svg.append("text")
            .attr("x", (margin.left + width / 2))             
            .attr("y", margin.top / 2)
            .attr("dy", "1em")
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")  
            .text("Forecasted weekly COVID-19 deaths in the United States by Columbia University");
      })
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